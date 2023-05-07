# Simple weather forecast

This is a home assignment. Project created by using `create-react-app`. Also used typescript, redux-toolkit, sass+scss-modules, eslint and prettier.

## Setup

1. Clone this repository
2. Install dependencies: `npm install`
3. Create `src/config/secrets.ts`. See `src/config/secrets.example.ts` for a reference.
  - `openweathermapApiKey` is required. You can get it from here - https://home.openweathermap.org/api_keys
4. Run the application in development mode: `npm start`

## Comments

- It was possible to do this simpler without having to create separate slices for features or separating containers and their respective components, but I thought it was better to have a possibility of easier scaling in the future (potentially).
- Open weather only allow you to use 2 free endpoints:
  - [**5 day weather forecast**](https://openweathermap.org/forecast5) - this will return forecast data with 3-hour step (40 entries). Because it doesn't provide data grouped by date I did my own data transformation assuming that user wants to see the highest possible temperature for the given date
  - [**Current weather data**](https://openweathermap.org/current) - this returns the current weather data for given coordinates (or place using own geocoding). Since it doesn't return any kind of data by hour or time of day (and `forecast5` endpoint doesn't give data in past) it was not really possible to show the temperature for morning-day-evening-night and I decided to show min-average-max instead
- API returns all temperatures in Kelvin, Fahrenheit or Celsius. I decided to not to fetch data every time mode is changed since API calls are limited daily and use Kelvins in state. So temperature shown in the app is re-calculated based on Kelvins when mode is changed a, but is not re-fetched
- API returns their own icons code which I mapped to icons provided by the task to the ones, suggested by the API. It's possible to improve icons mapping by using the `code` property from the API, but I decided to not to spend to much time on this
- Since there was no mockups other than JPG files I assumed some of the fonts, colors and etc based on those JPG-files provided
- I made it responsive, but my design is not very fancy, I only focused on making it clear
- Forecast data is cached in `localStorage`
- I didn't deploy it anywhere because app uses api token that I don't want to include into the build and I don't want to build the custom backend middleware to proxy the data
- I downloaded and included all the sass files for (https://erikflowers.github.io/weather-icons/)[weather-icons] instead of installing it as a package because this is the recommended way of usage by icons authors. Also it seams they do not deploy the package to npm as it's still of version `1.x`, while the icons in the repository are marked as `2.x` already

## Possible improvements

- Add [React google autocomplete](https://www.npmjs.com/package/react-google-autocomplete) to easier search of location. This would allow to get rid of `getWeatherForecastForLocationByName` thunk, since we would be able to get coordinates from google location api. This, however, requires to register 1 more API key
- Maybe use router so it would be possible to share links like `weather-cool-project-whatever/coords/123/123` that will load the weather forecast for coords that one wants to share