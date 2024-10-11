import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Country.css';

const Country = () => {
  const { name } = useParams(); // Get the country name from the URL params
  const [country, setCountry] = useState(null);
  const navigate = useNavigate(); // Hook to go back to the previous page

  useEffect(() => {
    // Fetch country data from the REST Countries API using the name from the params
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        setCountry(data);
      })
      .catch((error) => console.error('Error fetching country:', error));
  }, [name]);

  if (!country) {
    return <div>Loading...</div>; // Render a loading state while data is being fetched
  }

  // Destructure the country details
  const { flags, population, region, subregion, capital, tld, currencies, languages, name: countryName, borders, nativeName } = country;

  return (
    <main>
      <div className="country-details-container">
        {/* Back button */}
        <span className="back-button" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>

        {/* Country details */}
        <div className="country-details">
          {/* Country flag */}
          <img className="flag" src={flags.svg} alt={`${countryName.common} flag`} />

          {/* Country details text */}
          <div className="details-text-container">
            <h1>{countryName.common}</h1>
            <div className="details-text">
              <p><b>Native Name: </b>{Object.values(countryName.nativeName)?.[0]?.common}</p>
              <p><b>Population: </b>{population.toLocaleString('en-IN')}</p>
              <p><b>Region: </b>{region}</p>
              <p><b>Sub Region: </b>{subregion}</p>
              <p><b>Capital: </b>{capital?.[0]}</p>
              <p><b>Top-Level Domain: </b>{tld?.[0]}</p>
              <p><b>Currency: </b>{currencies ? Object.values(currencies).map((currency) => currency.name).join(', ') : 'N/A'}</p>
              <p><b>Languages: </b>{languages ? Object.values(languages).join(', ') : 'N/A'}</p>
            </div>

            {/* Border countries */}
            <div className="border-countries">
              <b>Border Countries:</b> &nbsp;
              {borders?.length > 0
                ? borders.map((border) => (
                    <span key={border} className="border-country">{border}</span>
                  ))
                : 'No bordering countries'}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Country;
