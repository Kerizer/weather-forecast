import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import config from './../../config'
import { type CurrentWeather, type WeatherForecast } from '../../types/WeatherForecast'

interface WeatherForecastData {
  currentWeather?: CurrentWeather
  weatherForecast?: WeatherForecast
}

interface WeatherForecastState extends WeatherForecastData {
  loading: boolean
  error: string | null
}

const initialState: WeatherForecastState = {
  currentWeather: undefined,
  weatherForecast: undefined,
  loading: false,
  error: null
}

const fetchForecastData = async (urlParams: string): Promise<WeatherForecastData> => {
  const apiKey = (config.OWMApiKey.length > 0) ? config.OWMApiKey : ''
  const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?${urlParams}&appid=${apiKey}`
  const currentUrl = `http://api.openweathermap.org/data/2.5/weather?${urlParams}&appid=${apiKey}`
  const [forecastResponse, currentResponse] = await Promise.all([
    fetch(forecastUrl).then(async (response) => await response.json()),
    fetch(currentUrl).then(async (response) => await response.json())
  ])
  return { weatherForecast: forecastResponse, currentWeather: currentResponse }
}

export const getWeatherForecastForLocationByName = createAsyncThunk(
  'weather/getForecastByName',
  async ({ name }: { name: string }) => {
    return await fetchForecastData(`q=${name}`)
  }
)

export const getWeatherForecastForLocationByCoordinates = createAsyncThunk(
  'weather/getForecastByCoordinates',
  async ({ lat, lon }: { lat: number, lon: number }) => {
    return await fetchForecastData(`lat=${lat}&lon=${lon}`)
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
        state.currentWeather = action.payload.currentWeather
        state.weatherForecast = action.payload.weatherForecast
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
        state.currentWeather = action.payload.currentWeather
        state.weatherForecast = action.payload.weatherForecast
      })
      .addCase(getWeatherForecastForLocationByName.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message ?? 'Unable to fetch weather forecast data'
      })
  }
})

export default weatherForecastSlice.reducer
