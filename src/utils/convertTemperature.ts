export function convertFromKelvin (temp: number, to: string): number {
  let result: number

  if (to === 'celsius') {
    result = temp - 273.15
  } else if (to === 'fahrenheit') {
    result = (temp - 273.15) * 9 / 5 + 32
  } else {
    throw new Error('Invalid temperature scale. Please use "celsius" or "fahrenheit"')
  }

  return result
}
