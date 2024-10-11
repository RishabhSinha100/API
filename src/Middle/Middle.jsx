import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Middle.css';

function Middle() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.log('Error fetching countries:', error));
  }, []);

  return (
    <>
      {countries.map((country) => (
        <Link className="country-card" to={`/country/${country.name.common}`} key={country.name.common}>
          <img src={country.flags.svg} alt={country.name.common} />
          <div className="card-text">
            <h3>{country.name.common}</h3>
            <p><b>Population:</b> {country.population.toLocaleString('en-IN')}</p>
            <p><b>Region:</b> {country.region}</p>
            <p><b>Capital:</b> {country.capital?.[0]}</p>
          </div>
        </Link>
      ))}
    </>
  );
}

export default Middle;
