
import React from 'react'
import { useDispatch } from 'react-redux'

import { useAppSelector } from 'app/hooks'
import TemperatureMode from 'types/tempModes'

import { setMode } from './temperatureModeSlice'
import styles from './TemperatureModeChangeButton.module.scss'

export const TemperatureModeChangeButton = (): JSX.Element => {
  const temperatureMode = useAppSelector((state) => state.temperatureMode.mode)
  const dispatch = useDispatch()

  const otherOption = temperatureMode === TemperatureMode.Celsius
    ? TemperatureMode.Fahrenheit
    : TemperatureMode.Celsius

  const toggleTemperatureMode = (): void => {
    dispatch(setMode(otherOption))
  }

  const classes = `${styles.temperatureModeToggle} ${temperatureMode !== TemperatureMode.Celsius ? styles.active : ''}`

  return (
    <button
        className={classes}
        aria-label={`Show temperature in °${otherOption}`}
        onClick={toggleTemperatureMode}
    >
        <span className={styles.inner}>
            <span>°C</span>
            <span className={styles.handle}></span>
            <span>°F</span>
        </span>
    </button>
  )
}
