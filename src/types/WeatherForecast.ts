interface Coordinates {
  lat: number
  lon: number
}

interface Temperature {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface WeatherBase {
  coord: Coordinates
  weather: Weather[]
  base: string
}

export interface CurrentWeather extends WeatherBase {
  dt: number
  main: Temperature
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export interface WeatherForecast extends WeatherBase {
  dt: number
  main: Temperature
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string
}
