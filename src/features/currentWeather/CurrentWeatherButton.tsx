import React, { useCallback } from 'react'

import { getWeatherForecastForLocation } from './currentWeatherSlice'
import { useAppDispatch } from '../../app/hooks'

export const Search = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const geolocationSuccess = useCallback((position: any) => {
    const { coords: { latitude, longitude } } = position
    void dispatch(getWeatherForecastForLocation({ lat: latitude, lon: longitude }))
  }, [dispatch])

  const geolocationError = useCallback(() => {
    console.error('Geolocation failed')
  }, [])

  const gpsButtonClickListener = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      geolocationSuccess,
      geolocationError
    )

    return null
  }, [geolocationSuccess, geolocationError])

  return <form>
        <button type="button" onClick={gpsButtonClickListener}>use my current position</button>
    </form>
}
