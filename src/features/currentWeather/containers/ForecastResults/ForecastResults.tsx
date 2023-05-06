import React from 'react'
import { useSelector } from 'react-redux'

import { useFormattedTemperature } from 'app/hooks'
import { type RootState } from 'app/store'
import { type CurrentWeather, type WeatherForecast } from 'types/weatherForecast'
import { WeatherConditionIcon } from 'components/WeatherConditionIcon'
import { TemperatureModeChangeButton } from 'features/temperatureModeChange/TemperatureModeChangeButton'

import styles from './ForecastResults.module.scss'

interface ForecastResultsContainerProps {
  city?: string
}

interface ForecastResultsProps {
  currentTemperature: number
  cityName: string
  iconCode?: string
}

const ForecastResults: React.FC<ForecastResultsProps> = (props) => {
  const currentTemperature = useFormattedTemperature(props.currentTemperature)
  const currentWeatherConditionIconCode = props.iconCode ?? '01d'

  return (
    <div>
      <div>
        <button aria-label="Back to search" className={styles.backButton}><span className="material-icons">arrow_back</span>{props.cityName}</button>
        <TemperatureModeChangeButton></TemperatureModeChangeButton>

      </div>

      <h2>Weather in </h2>
        <div>
          <p>Temperature: {currentTemperature}</p>
          <WeatherConditionIcon code={currentWeatherConditionIconCode} type="main" />
        </div>
    </div>
  )
}

export const ForecastResultsContainer: React.FC<ForecastResultsContainerProps> = () => {
  const weatherForecast = useSelector<RootState, WeatherForecast | undefined>((state) => state.currentWeather.weatherForecast)
  const currentWeather = useSelector<RootState, CurrentWeather | undefined>((state) => state.currentWeather.currentWeather)

  if (currentWeather?.cod === '404' || (currentWeather == null) || (weatherForecast == null)) {
    return <div>
        Not found
    </div>
  } else {
    return <ForecastResults
        currentTemperature={currentWeather.main.temp}
        cityName={currentWeather.name}
        iconCode={currentWeather.weather[0].icon}
    />
  }
}