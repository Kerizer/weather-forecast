import React from 'react'

import { LocationSelectForm } from 'features/currentWeather/LocationSelectForm'
import 'styles/weather-icons/weather-icons.scss'

import { ForecastResultsContainer } from 'features/currentWeather/ForecastResults'
import { TemperatureModeChangeButton } from 'features/temperatureModeChange/TemperatureModeChangeButton'

import styles from './AppContainer.module.scss'

const App = (): JSX.Element => {
  return (
    <main className={styles.main}>
      <LocationSelectForm />
      <div>----</div>
      <TemperatureModeChangeButton></TemperatureModeChangeButton>
      <ForecastResultsContainer></ForecastResultsContainer>
    </main>
  )
}

export default App
