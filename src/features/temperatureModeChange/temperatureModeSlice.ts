import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import TemperatureMode from '../../types/TEMP_MODES'

interface TemperatureModeState {
  mode: TemperatureMode
}

const initialState: TemperatureModeState = {
  mode: TemperatureMode.Celsius
}

export const temperatureModeSlice = createSlice({
  name: 'temperatureMode',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<TemperatureMode>) => {
      state.mode = action.payload
    }
  }
})

export const { setMode } = temperatureModeSlice.actions

export default temperatureModeSlice.reducer
