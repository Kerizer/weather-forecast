import React, { useCallback } from 'react'

import { useAppDispatch } from 'app/hooks'
import { type CurrentWeather, type WeatherForecast, type WeatherForecastList } from 'types/weatherForecast'

import { clearWeatherForecast } from 'features/currentWeather/currentWeatherSlice'
import { ForecastResults, type WeatherPerDay } from 'features/currentWeather/components/ForecastResults/ForecastResults'

interface ForecastResultsContainerProps {
  currentWeather: CurrentWeather
  weatherForecast: WeatherForecast
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
