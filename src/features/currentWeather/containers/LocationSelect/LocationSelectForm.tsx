import React, { useCallback, useState } from 'react'

import { useAppDispatch } from 'app/hooks'

import { getWeatherForecastForLocationByCoordinates, getWeatherForecastForLocationByName } from '../../currentWeatherSlice'
import styles from './LocationSelectForm.module.scss'

export const LocationSelectForm = (): JSX.Element => {
  const [locationName, setLocationName] = useState('')

  const dispatch = useAppDispatch()

  const geolocationSuccess = useCallback((position: any) => {
    const { coords: { latitude, longitude } } = position
    dispatch(getWeatherForecastForLocationByCoordinates({ lat: latitude, lon: longitude }))
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
    dispatch(getWeatherForecastForLocationByName({ name: locationName }))
  }

  return <form onSubmit={handleSubmit} action="" className={styles.locationSelectForm}>
        <div className={styles.searchForm}>
          <input type="text" value={locationName} onChange={handleChange} className={styles.cityInput} placeholder='City' aria-label="Enter name of the city" />
          <button type="submit">Search</button>
        </div>
        <div>
          use my <button type="button" onClick={gpsButtonClickListener}>current position</button>
        </div>
    </form>
}
