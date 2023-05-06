
import React from 'react'

import conditions from 'types/weatherConditions'

import styles from './WeatherConditionIcon.module.scss'

interface WeatherConditionIconProps {
  code: string
  type?: 'main' | 'secondary'
}

export const WeatherConditionIcon = ({ code, type }: WeatherConditionIconProps): JSX.Element => {
  const conditionClass = conditions.get(code) ?? 'wi-na'
  return <i
    className={`wi ${conditionClass} ${styles.icon} ${type === 'main' ? styles.main : ''}`}
  />
}
