import React from 'react'

import { Search } from './features/currentWeather/CurrentWeatherButton'
import './styles/App.css'
import { ForecastResults } from './containers/ForecastResults/ForecustResults'
import { TemperatureModeChangeButton } from './features/temperatureModeChange/TemperatureModeChangeButton'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Search />
      <div>----</div>
      <TemperatureModeChangeButton></TemperatureModeChangeButton>
      <ForecastResults></ForecastResults>
    </div>
  )
}

export default App
