import React from 'react'
import { useSelector } from 'react-redux'

import { useFormattedTemperature } from 'app/hooks'
import { type RootState } from 'app/store'
import { type CurrentWeather, type WeatherForecast } from 'types/weatherForecast'
import { WeatherConditionIcon } from 'components/WeatherConditionIcon'

interface ForecastResultsContainerProps {
  city?: string
}

interface ForecastResultsProps {
  currentTemperature: number
  cityName: string
  iconCode?: string
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

export const ForecastResults: React.FC<ForecastResultsProps> = (props) => {
  const currentTemperature = useFormattedTemperature(props.currentTemperature)
  const currentWeatherConditionIconCode = props.iconCode ?? '01d'

  return (
    <div>
      <h2>Weather in {props.cityName}</h2>
        <div>
          <p>Temperature: {currentTemperature}</p>
          <WeatherConditionIcon code={currentWeatherConditionIconCode} />
        </div>
    </div>
  )
}
