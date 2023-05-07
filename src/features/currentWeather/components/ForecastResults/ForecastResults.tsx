
import React from 'react'

import { DayBlock } from 'features/currentWeather/components/DayBlock'

import { WeatherConditionIcon } from 'components/WeatherConditionIcon'
import { TemperatureModeChangeButton } from 'features/temperatureModeChange/TemperatureModeChangeButton'
import { useFormattedTemperature } from 'app/hooks'

import styles from './ForecastResults.module.scss'

export interface WeatherPerDay {
  timestamp: number
  name: string
  temp: number
  icon: string
}

export interface ForecastResultsProps {
  currentTemperature: number
  cityName: string
  iconCode?: string
  timestamp: number
  description?: string
  backButtonHandler: () => void
  detailedTemperature: {
    min: number
    max: number
  }
  weatherForecastPerDay: WeatherPerDay[]
}

export const ForecastResults: React.FC<ForecastResultsProps> = (props) => {
  const currentTemperature = useFormattedTemperature(props.currentTemperature)
  const currentWeatherConditionIconCode = props.iconCode ?? '01d'

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }
  const currentDay = new Intl.DateTimeFormat('en-US', options).format(new Date(props.timestamp))

  return (
      <div className={styles.forecastResults}>
        <div className={styles.controls}>
          <button
            onClick={props.backButtonHandler}
            aria-label="Back to search"
            className={styles.backButton}
          >
            <span className="material-icons">arrow_back</span>
            {props.cityName}
          </button>
          <TemperatureModeChangeButton></TemperatureModeChangeButton>

        </div>

        <div>
          <time className={styles.currentDay} dateTime={new Date(props.timestamp).toISOString().split('T')[0]}>{currentDay}</time>
          <p className={styles.currentCondition}>{props.description}</p>
        </div>

        <div className={styles.currentWeatherInfoContainer}>
          <span className={styles.currentTemperature}>{currentTemperature}</span>
          <span className={styles.currentCondition}><WeatherConditionIcon code={currentWeatherConditionIconCode} /></span>
          <div className={styles.currentTemperatureDetails}>
              <p>Lowest: {useFormattedTemperature(props.detailedTemperature.min)}</p>
              <p>Average: {currentTemperature}</p>
              <p>Highest: {useFormattedTemperature(props.detailedTemperature.max)}</p>
            </div>
        </div>

        <div className={styles.dayBlockContainer}>
          {props.weatherForecastPerDay.map((dailyWeather) => <DayBlock
            key={dailyWeather.timestamp}
            icon={dailyWeather.icon}
            title={dailyWeather.name}
            temperature={dailyWeather.temp}
            timestamp={dailyWeather.timestamp}
          />)}
        </div>
      </div>
  )
}
