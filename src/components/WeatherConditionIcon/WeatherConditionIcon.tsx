
import React from 'react'

import conditions from 'types/weatherConditions'

import styles from './WeatherConditionIcon.module.scss'

interface WeatherConditionIconProps {
  code: string
}

export const WeatherConditionIcon = ({ code }: WeatherConditionIconProps): JSX.Element => {
  const conditionClass = conditions.get(code) ?? 'wi-na'
  return <i
    className={`wi ${conditionClass} ${styles.icon}`}
  />
}
