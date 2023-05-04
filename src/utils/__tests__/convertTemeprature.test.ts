import { convertFromKelvin } from './../convertTemperature'

describe('convertFromKelvin', () => {
  test('converts Kelvin to Celsius correctly', () => {
    const result = convertFromKelvin(273.15, 'C')
    expect(result).toEqual(0)
  })

  test('converts Kelvin to Fahrenheit correctly', () => {
    const result = convertFromKelvin(273.15, 'F')
    expect(result).toEqual(32)
  })

  test('throws an error for an invalid temperature scale', () => {
    expect(() => {
      convertFromKelvin(273.15, 'invalid')
    }).toThrow('Invalid temperature scale. Please use "celsius" or "fahrenheit"')
  })
})
