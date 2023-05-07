import { useFormattedTemperature } from 'app/hooks'
import { WeatherConditionIcon } from 'components/WeatherConditionIcon'
import styles from './DayBlock.module.scss'
import React from 'react'

interface DayBlockProps {
  icon: string
  title: string
  temperature: number
  timestamp: number
}

export const DayBlock = (props: DayBlockProps): JSX.Element => {
  const { icon, title, temperature, timestamp } = props
  const dateTime = new Date(timestamp).toISOString().split('T')[0]
  return <article className={styles.dayBlock}>
    <time dateTime={dateTime}>{ title }</time>
    <span className={styles.icon}>
        <WeatherConditionIcon code={icon} />
    </span>
    { useFormattedTemperature(temperature) }
    </article>
}
