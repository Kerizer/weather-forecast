import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { convertFromKelvin } from '../utils/convertTemperature'
import TemperatureMode from '../types/TEMP_MODES'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function useTemp (temperature?: number): string {
  const temperatureMode = useSelector(
    (state: RootState) => state.temperatureMode.mode
  )

  if (temperature === undefined) {
    return 'N/A'
  }

  const convertedTemp =
        temperatureMode === TemperatureMode.Celsius
          ? convertFromKelvin(temperature, 'C')
          : convertFromKelvin(temperature, 'F')

  return `${convertedTemp.toFixed(0)} °${temperatureMode === TemperatureMode.Celsius ? 'C' : 'F'}`
}
