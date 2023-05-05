import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { convertFromKelvin } from 'utils/convertTemperature'
import TemperatureMode from 'types/tempModes'

import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useFormattedTemperature = (kelvinTemperature?: number): string => {
  const temperatureMode = useSelector(
    (state: RootState) => state.temperatureMode.mode
  )

  if (kelvinTemperature === undefined) {
    return 'N/A'
  }

  const convertedTemp =
        temperatureMode === TemperatureMode.Celsius
          ? convertFromKelvin(kelvinTemperature, 'C')
          : convertFromKelvin(kelvinTemperature, 'F')

  return `${convertedTemp.toFixed(0)} °${temperatureMode === TemperatureMode.Celsius ? 'C' : 'F'}`
}
