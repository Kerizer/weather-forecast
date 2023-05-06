import React from 'react'

import styles from './LoaderIndicator.module.scss'

export const LoaderIndicator = (): JSX.Element => {
  return <div className={styles.loaderContainer}>
    <div className={styles.spinner} />
  </div>
}
