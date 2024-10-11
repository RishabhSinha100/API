import React, { useState, useEffect } from 'react';
import './Search.css';

function Search() {
  const [countries, setCountries] = useState([]); // Store all countries
  const [filteredCountries, setFilteredCountries] = useState([]); // Store filtered countries
  const [searchTerm, setSearchTerm] = useState(''); // Search input
  const [region, setRegion] = useState(''); // Selected region

  // Fetch all countries when the component mounts
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data); // Initialize with all countries
      })
      .catch((error) => console.log('Error fetching countries:', error));
  }, []);

  // Function to filter countries based on search term and region
  const filterCountries = () => {
    let filtered = countries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by selected region
    if (region) {
      filtered = filtered.filter((country) => country.region === region);
    }

    setFilteredCountries(filtered);
  };

  // Use effect for search term
  useEffect(() => {
    filterCountries(); // Call filtering function whenever search term or region changes
  }, [searchTerm, region, countries]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle region selection change
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  // Handle dark mode toggle
  const handleThemeChange = () => {
    document.body.classList.toggle('dark');
  };

  return (
    <div className="search-filter-container">
      {/* Search Input */}
      <div className="search-container">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filter by Region */}
      <select className="filter-by-region" onChange={handleRegionChange}>
        <option hidden>Filter by Region</option>
        <option value="">All</option> {/* Add option for all regions */}
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      {/* Countries Display */}
      <div className="countries-container">
        {filteredCountries.map((country) => (
          <a
            key={country.name.common}
            className="country-card"
            href={`/country/${country.name.common}`}
          >
            <img src={country.flags.svg} alt={`${country.name.common} flag`} />
            <div className="card-text">
              <h3 className="card-title">{country.name.common}</h3>
              <p>
                <b>Population: </b>
                {country.population.toLocaleString('en-IN')}
              </p>
              <p>
                <b>Region: </b>
                {country.region}
              </p>
              <p>
                <b>Capital: </b>
                {country.capital?.[0]}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Search;
