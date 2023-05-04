import React, { useCallback, useState } from 'react'

import { getWeatherForecastForLocationByCoordinates, getWeatherForecastForLocationByName } from './currentWeatherSlice'
import { useAppDispatch } from '../../app/hooks'

export const Search = (): JSX.Element => {
  const [locationName, setLocationName] = useState('')

  const dispatch = useAppDispatch()

  const geolocationSuccess = useCallback((position: any) => {
    const { coords: { latitude, longitude } } = position
    void dispatch(getWeatherForecastForLocationByCoordinates({ lat: latitude, lon: longitude }))
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

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setLocationName(e.currentTarget.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    void dispatch(getWeatherForecastForLocationByName({ name: locationName }))
  }

  return <form onSubmit={handleSubmit} action="">
        <input type="text" value={locationName} onChange={handleChange} />
        <button type="submit">Search</button>
        <button type="button" onClick={gpsButtonClickListener}>use my current position</button>
    </form>
}
