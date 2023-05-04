import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import config from './../../config'
import { type CurrentWeather, type WeatherForecast } from '../../types/WeatherForecast'

interface WeatherForecastState {
  currentWeather?: CurrentWeather
  weatherForecast?: WeatherForecast
  loading: boolean
  error: string | null
}

const initialState: WeatherForecastState = {
  currentWeather: undefined,
  weatherForecast: undefined,
  loading: false,
  error: null
}

export const getWeatherForecastForLocationByName = createAsyncThunk(
  'weather/getForecastByName',
  async ({ name }: { name: string }) => {
    const apiKey = (config.OWMApiKey.length > 0) ? config.OWMApiKey : ''
    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${apiKey}`
    const currentUrl = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`

    const [forecastResponse, currentResponse] = await Promise.all([
      fetch(forecastUrl).then(async (response) => await response.json()),
      fetch(currentUrl).then(async (response) => await response.json())
    ])

    return { forecastData: forecastResponse, currentData: currentResponse }
  }
)

export const getWeatherForecastForLocationByCoordinates = createAsyncThunk(
  'weather/getForecast',
  async ({ lat, lon }: { lat: number, lon: number }) => {
    const apiKey = (config.OWMApiKey.length > 0) ? config.OWMApiKey : ''
    const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    const currentUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    const [forecastResponse, currentResponse] = await Promise.all([
      fetch(forecastUrl).then(async (response) => await response.json()),
      fetch(currentUrl).then(async (response) => await response.json())
    ])

    return { forecastData: forecastResponse, currentData: currentResponse }
  }
)

const weatherForecastSlice = createSlice({
  name: 'weatherForecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherForecastForLocationByCoordinates.pending, (state) => {
        state.loading = true
      })
      .addCase(getWeatherForecastForLocationByCoordinates.fulfilled, (state, action) => {
        state.loading = false
        state.currentWeather = action.payload.currentData
        state.weatherForecast = action.payload.forecastData
      })
      .addCase(getWeatherForecastForLocationByCoordinates.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message ?? 'Unable to fetch weather forecast data'
      })
      .addCase(getWeatherForecastForLocationByName.pending, (state) => {
        state.loading = true
      })
      .addCase(getWeatherForecastForLocationByName.fulfilled, (state, action) => {
        state.loading = false
        state.currentWeather = action.payload.currentData
        state.weatherForecast = action.payload.forecastData
      })
      .addCase(getWeatherForecastForLocationByName.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message ?? 'Unable to fetch weather forecast data'
      })
  }
})

export default weatherForecastSlice.reducer
