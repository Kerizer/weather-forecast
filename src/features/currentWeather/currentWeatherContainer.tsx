import React from 'react'

import { ForecastResultsContainer } from 'features/currentWeather/containers/ForecastResults'
import { LocationSelectForm } from 'features/currentWeather/containers/LocationSelect/LocationSelectForm'
import { useAppSelector } from 'app/hooks'
import { LoaderIndicator } from 'components/LoaderIndicator/LoaderIndicator'

export const CurrentWeatherContainer = (): JSX.Element => {
  const { loading, currentWeather, weatherForecast } = useAppSelector((state) => state.currentWeather)

  if (loading) {
    return <LoaderIndicator />
  }

  if ((currentWeather == null) || (weatherForecast == null)) {
    return <LocationSelectForm />
  }

  return <ForecastResultsContainer />
}
