
import React from 'react'

import conditions from 'types/weatherConditions'

import styles from './WeatherConditionIcon.module.scss'

export const WeatherConditionIcon = ({ code }: { code: string }): JSX.Element => {
  console.log(conditions.get(code))
  const conditionClass = conditions.get(code) ?? 'wi-na'
  return <i
    className={`wi ${conditionClass} ${styles.icon}`}
  />
}
