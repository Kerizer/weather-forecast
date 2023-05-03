import React from 'react'

import { Search } from './features/currentWeather/CurrentWeatherButton'
import './styles/App.css'

const App = (): JSX.Element => {
  return (
    <div className="App">
      <Search />
    </div>
  )
}

export default App
