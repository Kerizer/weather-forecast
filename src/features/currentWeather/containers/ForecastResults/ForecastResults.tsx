import React, { useCallback } from 'react'

import { useAppDispatch, useFormattedTemperature } from 'app/hooks'
import { type CurrentWeather, type WeatherForecast, type WeatherForecastList } from 'types/weatherForecast'
import { WeatherConditionIcon } from 'components/WeatherConditionIcon'
import { TemperatureModeChangeButton } from 'features/temperatureModeChange/TemperatureModeChangeButton'

import styles from './ForecastResults.module.scss'
import { clearWeatherForecast } from 'features/currentWeather/currentWeatherSlice'
import { DayBlock } from 'features/currentWeather/components/DayBlock'

interface ForecastResultsContainerProps {
  currentWeather: CurrentWeather
  weatherForecast: WeatherForecast
}

interface WeatherPerDay {
  timestamp: number
  name: string
  temp: number
  icon: string
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
  weatherForecastPerDay: WeatherPerDay[]
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

export const ForecastResultsContainer: React.FC<ForecastResultsContainerProps> = (props) => {
  const {
    currentWeather,
    weatherForecast,
  } = props
  const dispatch = useAppDispatch()
  const clearForecast = useCallback(() => {
    dispatch(clearWeatherForecast())
  }, [])
  const detailedTemperature = {
    min: currentWeather.main.temp_min,
    max: currentWeather.main.temp_max,
  }

  const getHighestTemperaturePerDay = useCallback((weatherData: WeatherForecastList[]) => {
    const highestTempsPerDay: Record<string, WeatherPerDay> = {}
    const currentDate = new Date() // Get the current date

    for (const weather of weatherData) {
      const date = new Date(weather.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })

      // Skip if the date is the same as the current date
      if (date === currentDate.toLocaleDateString('en-US', { weekday: 'long' })) {
        continue
      }

      if (highestTempsPerDay[date] == null || weather.main.temp > highestTempsPerDay[date].temp) {
        highestTempsPerDay[date] = {
          timestamp: weather.dt * 1000,
          temp: weather.main.temp,
          name: date,
          icon: weather.weather[0].icon
        }
      }
    }

    return Object.values(highestTempsPerDay)
  }, [weatherForecast.list])

  return <ForecastResults
      timestamp={currentWeather.dt * 1000}
      backButtonHandler={clearForecast}
      currentTemperature={currentWeather.main.temp}
      description={currentWeather.weather[0].description}
      cityName={currentWeather.name}
      iconCode={currentWeather.weather[0].icon}
      detailedTemperature={detailedTemperature}
      weatherForecastPerDay={getHighestTemperaturePerDay(weatherForecast.list)}
    />
}
