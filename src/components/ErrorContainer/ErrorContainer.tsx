import React from 'react'

import styles from './ErrorContainer.module.scss'

interface ErrorContainerProps {
  errorMessage?: string | string[]
}

export const ErrorContainer = ({ errorMessage }: ErrorContainerProps): JSX.Element | null => {
  if (typeof errorMessage === 'string') {
    return <div className={styles.errorContainer}>{errorMessage}</div>
  }

  if (Array.isArray(errorMessage) && errorMessage.length !== 0) {
    return (
      <ul className={styles.errorContainer}>
        {errorMessage.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    )
  }

  return null
}
