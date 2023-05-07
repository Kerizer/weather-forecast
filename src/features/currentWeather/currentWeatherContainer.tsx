import React, { useEffect } from 'react'

import { ForecastResultsContainer } from 'features/currentWeather/containers/ForecastResultsContainer'
import { LocationSelectForm } from 'features/currentWeather/containers/LocationSelect/LocationSelectForm'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { LoaderIndicator } from 'components/LoaderIndicator/LoaderIndicator'
import { appCacheKey, restoreForecastFromCache } from './currentWeatherSlice'
import { ErrorContainer } from 'components/ErrorContainer'

export const CurrentWeatherContainer = (): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const cache = window.localStorage.getItem(appCacheKey)
    if (cache !== null) {
      dispatch(restoreForecastFromCache({ cache: JSON.parse(cache) }))
    }
  }, [dispatch])

  const { loading, error, currentWeather, weatherForecast } = useAppSelector((state) => state.currentWeather)

  if (loading) {
    return <LoaderIndicator />
  }

  const errorMessages = []

  if (currentWeather != null && currentWeather?.cod !== 200) {
    errorMessages.push(currentWeather?.message ?? 'Unknown error occurred')
  }

  if (error != null) {
    errorMessages.push(error)
  }

  return <>
    {
      ((currentWeather == null) || (weatherForecast == null) || errorMessages.length !== 0)
        ? <>
            {errorMessages.length > 0 && <ErrorContainer errorMessage={errorMessages} />}
            <LocationSelectForm />
          </>
        : <ForecastResultsContainer currentWeather={currentWeather} weatherForecast={weatherForecast} />
    }
  </>
}
