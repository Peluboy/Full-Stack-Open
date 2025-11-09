import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setSelected(null)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const handleShowCountry = (country) => {
    setSelected(country)
  }

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Country Information</h1>

      <div className="mb-4">
        find countries:{" "}
        <input
          value={filter}
          onChange={handleFilterChange}
          className="border px-2 py-1 rounded"
        />
      </div>

      {selected ? (
        <Country country={selected} />
      ) : (
        <CountryList
          countries={filteredCountries}
          handleShowCountry={handleShowCountry}
        />
      )}
    </div>
  )
}

export default App
