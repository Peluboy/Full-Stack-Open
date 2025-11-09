import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const api_key = import.meta.env.VITE_WEATHER_KEY
  const [weather, setWeather] = useState(null)

  const capital = country.capital ? country.capital[0] : ''

  useEffect(() => {
    if (!capital) return

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`

    axios.get(url).then(response => setWeather(response.data))
  }, [capital, api_key])

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">{country.name.common}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {country.area} km²</p>

      <h3 className="font-semibold mt-3">Languages:</h3>
      <ul className="list-disc list-inside">
        {Object.values(country.languages || {}).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
        className="my-3 border"
      />

      {weather && (
        <div>
          <h3 className="font-semibold mt-3">Weather in {capital}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default Country
