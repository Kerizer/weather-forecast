import React from 'react'

import 'styles/weather-icons/weather-icons.scss'

import styles from './AppContainer.module.scss'
import { CurrentWeatherContainer } from 'features/currentWeather/currentWeatherContainer'

const App = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <CurrentWeatherContainer />
    </main>
  )
}

export default App
