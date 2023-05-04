import React from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../../app/store'
import { type CurrentWeather, type WeatherForecast } from '../../types/WeatherForecast'
import useTemp from '../../app/hooks'

interface ForecastResultsContainerProps {
  city?: string
}

export const ForecastResults: React.FC<ForecastResultsContainerProps> = ({ city }) => {
  const weatherForecast = useSelector<RootState, WeatherForecast | undefined>((state) => state.currentWeather.weatherForecast)
  const currentWeather = useSelector<RootState, CurrentWeather | undefined>((state) => state.currentWeather.currentWeather)

  const currentTemperature = useTemp(weatherForecast?.list[0].main.temp)

  return (
    <div>
      <h2>Weather in {currentWeather?.name}</h2>
      {(Boolean((weatherForecast?.list))) && (
        <div>
          <p>Temperature: {currentTemperature}</p>
        </div>
      )}
    </div>
  )
}

export default ForecastResults
