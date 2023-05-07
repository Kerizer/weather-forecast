import React from 'react'
import { render } from '@testing-library/react'
import { ErrorContainer } from './../ErrorContainer'

describe('ErrorContainer', () => {
  test('renders single error message correctly', () => {
    const errorMessage = 'Something went wrong'
    const { container } = render(<ErrorContainer errorMessage={errorMessage} />)
    const errorContainer = container.querySelector('.errorContainer')
    expect(errorContainer).toBeInTheDocument()
    expect(errorContainer).toHaveTextContent(errorMessage)
  })

  test('renders multiple error messages correctly', () => {
    const errorMessage = ['Error 1', 'Error 2', 'Error 3']
    const { container } = render(<ErrorContainer errorMessage={errorMessage} />)
    const errorContainer = container.querySelector('.errorContainer')
    expect(errorContainer).toBeInTheDocument()

    const errorListItems = container.querySelectorAll('.errorContainer li')
    expect(errorListItems).toHaveLength(errorMessage.length)

    errorMessage.forEach((message, index) => {
      expect(errorListItems[index]).toHaveTextContent(message)
    })
  })

  test('renders null when errorMessage is not provided', () => {
    const { container } = render(<ErrorContainer />)
    const errorContainer = container.querySelector('.errorContainer')
    expect(errorContainer).not.toBeInTheDocument()
  })

  test('renders null when errorMessage is an empty array', () => {
    const errorMessage: string[] = []
    const { container } = render(<ErrorContainer errorMessage={errorMessage} />)
    const errorContainer = container.querySelector('.errorContainer')
    expect(errorContainer).not.toBeInTheDocument()
  })
})
