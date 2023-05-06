import React, { useEffect } from 'react'

import { ForecastResultsContainer } from 'features/currentWeather/containers/ForecastResults'
import { LocationSelectForm } from 'features/currentWeather/containers/LocationSelect/LocationSelectForm'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { LoaderIndicator } from 'components/LoaderIndicator/LoaderIndicator'
import { appCacheKey, restoreForecastFromCache } from './currentWeatherSlice'

export const CurrentWeatherContainer = (): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const cache = window.localStorage.getItem(appCacheKey)
    if (cache !== null) {
      dispatch(restoreForecastFromCache({ cache: JSON.parse(cache) }))
    }
  }, [dispatch])

  const { loading, currentWeather, weatherForecast } = useAppSelector((state) => state.currentWeather)

  if (loading) {
    return <LoaderIndicator />
  }

  if ((currentWeather == null) || (weatherForecast == null)) {
    return <LocationSelectForm />
  }

  return <ForecastResultsContainer />
}
