import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import currentWeather from '../features/currentWeather/currentWeatherSlice'

export const store = configureStore({
  reducer: {
    currentWeather
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
