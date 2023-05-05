// We only need to get items by key, so using Map
export default new Map(Object.entries({
  // clear sky
  '01d': 'wi-day-sunny',
  '01n': 'wi-night-clear',

  // clouds
  '02d': 'wi-day-cloudy',
  '02n': 'wi-night-partly-cloudy',
  '03d': 'wi-day-cloudy',
  '03n': 'wi-night-cloudy',
  '04d': 'wi-cloudy',
  '04n': 'wi-cloudy',

  // drizzle, rain and snow
  '09d': 'wi-day-sleet',
  '10d': 'wi-rain',
  '11d': 'wi-storm-showers',
  '13d': 'wi-snow',

  // other
  '50d': 'wi-dust',
}))
