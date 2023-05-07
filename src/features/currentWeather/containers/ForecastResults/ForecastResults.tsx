import React, { useCallback } from 'react'

import { useAppDispatch, useFormattedTemperature } from 'app/hooks'
import { type CurrentWeather, type WeatherForecast } from 'types/weatherForecast'
import { WeatherConditionIcon } from 'components/WeatherConditionIcon'
import { TemperatureModeChangeButton } from 'features/temperatureModeChange/TemperatureModeChangeButton'

import styles from './ForecastResults.module.scss'
import { clearWeatherForecast } from 'features/currentWeather/currentWeatherSlice'

interface ForecastResultsContainerProps {
  currentWeather: CurrentWeather
  weatherForecast: WeatherForecast
}

interface ForecastResultsProps {
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
}

const ForecastResults: React.FC<ForecastResultsProps> = (props) => {
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
    <div>
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
        <p>{currentDay}</p>
        <p>{props.description}</p>
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
    </div>
  )
}

export const ForecastResultsContainer: React.FC<ForecastResultsContainerProps> = (props) => {
  const {
    currentWeather,
    // weatherForecast,
  } = props
  const dispatch = useAppDispatch()
  const clearForecast = useCallback(() => {
    dispatch(clearWeatherForecast())
  }, [])
  const detailedTemperature = {
    min: currentWeather.main.temp_min,
    max: currentWeather.main.temp_max,
  }

  return <ForecastResults
      timestamp={currentWeather.dt * 1000}
      backButtonHandler={clearForecast}
      currentTemperature={currentWeather.main.temp}
      description={currentWeather.weather[0].description}
      cityName={currentWeather.name}
      iconCode={currentWeather.weather[0].icon}
      detailedTemperature={detailedTemperature}
    />
}
