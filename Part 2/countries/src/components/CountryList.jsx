import React from 'react'

const CountryList = ({ countries, handleShowCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length === 1) {
    const country = countries[0]
    handleShowCountry(country)
    return null
  }

  return (
    <div>
      {countries.map(country => (
        <div key={country.name.common} className="mb-1">
          {country.name.common}{' '}
          <button
            onClick={() => handleShowCountry(country)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-2 py-1 rounded"
          >
            show
          </button>
        </div>
      ))}
    </div>
  )
}

export default CountryList
