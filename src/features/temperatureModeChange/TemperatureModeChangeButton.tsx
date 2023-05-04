
import React from 'react'
import { useDispatch } from 'react-redux'
import { setMode } from './temperatureModeSlice'
import TemperatureMode from '../../types/TEMP_MODES'
import { useAppSelector } from '../../app/hooks'

export const TemperatureModeChangeButton = (): JSX.Element => {
  const temperatureMode = useAppSelector((state) => state.temperatureMode.mode)
  const dispatch = useDispatch()

  const toggleTemperatureMode = (): void => {
    const newMode =
      temperatureMode === TemperatureMode.Celsius
        ? TemperatureMode.Fahrenheit
        : TemperatureMode.Celsius
    dispatch(setMode(newMode))
  }

  return (
    <button onClick={toggleTemperatureMode}>
        Switch to {temperatureMode === TemperatureMode.Celsius ? 'Fahrenheit' : 'Celsius'}
    </button>
  )
}
