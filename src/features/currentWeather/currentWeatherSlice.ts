import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import config from './../../config'
import { type CurrentWeather, type WeatherForecast } from '../../types/weatherForecast'

interface WeatherForecastData {
  currentWeather: CurrentWeather
  weatherForecast: WeatherForecast
}

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

export const appCacheKey = 'weatherForecast'

const fetchForecastData = async (urlParams: string): Promise<WeatherForecastData> => {
  const apiKey = (config.OWMApiKey.length > 0) ? config.OWMApiKey : ''
  const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?${urlParams}&appid=${apiKey}`
  const currentUrl = `http://api.openweathermap.org/data/2.5/weather?${urlParams}&appid=${apiKey}`
  const [forecastResponse, currentResponse] = await Promise.all([
    fetch(forecastUrl).then(async (response) => await response.json()),
    fetch(currentUrl).then(async (response) => await response.json())
  ])
  const forecastResult = { weatherForecast: forecastResponse, currentWeather: currentResponse }
  window.localStorage.setItem(appCacheKey, JSON.stringify(forecastResult))
  return forecastResult
}

export const getWeatherForecastForLocationByName = createAsyncThunk(
  'weather/getForecastByName',
  async ({ name }: { name: string }) => {
    return await fetchForecastData(`q=${name}`)
  }
)

export const getWeatherForecastForLocationByCoordinates = createAsyncThunk(
  'weather/getForecastByCoordinates',
  async ({ lat, lon }: { lat: number, lon: number, cache?: WeatherForecastData }) => {
    return await fetchForecastData(`lat=${lat}&lon=${lon}`)
  }
)

export const restoreForecastFromCache = createAsyncThunk(
  'weather/restoreForecast',
  async ({ cache }: { cache: WeatherForecastData }, { dispatch }) => {
    const { lat, lon } = cache.currentWeather.coord

    dispatch(getWeatherForecastForLocationByCoordinates({ lat, lon, cache }))

    return cache
  }
)

export const clearWeatherForecast = createAction(
  'weather/clearWeatherForecast'
)

const weatherForecastSlice = createSlice({
  name: 'weatherForecast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherForecastForLocationByCoordinates.pending, (state, { meta }) => {
        const cache = meta.arg.cache

        // We need to restore the cache if it exists, otherwise show loader indicator
        if (cache != null) {
          state.loading = false
          // We want to show the cached data before new data is fetched
          state.currentWeather = cache.currentWeather
          state.weatherForecast = cache.weatherForecast
        } else {
          state.loading = true
        }
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
      .addCase(clearWeatherForecast, (state) => {
        state.currentWeather = undefined
        state.weatherForecast = undefined
      })
  }
})

export default weatherForecastSlice.reducer
