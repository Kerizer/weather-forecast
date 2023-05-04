export const convertFromKelvin = (temp: number, to: 'C' | 'F'): number => {
  let result: number

  if (to === 'C') {
    result = temp - 273.15
  } else if (to === 'F') {
    result = (temp - 273.15) * 9 / 5 + 32
  } else {
    throw new Error('Invalid temperature scale. Please use "celsius" or "fahrenheit"')
  }

  return result
}
