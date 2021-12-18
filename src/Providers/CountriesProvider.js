import React, { useState, useEffect, useContext, useCallback } from 'react';

const CountryContext = React.createContext({});

const COUNTRIES_API =
  'https://restcountries.com/v3.1/all?fields=name,population,region,subregion,capital,flags,cca3,continents,tld,currencies,languages,borders';

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState(null);
  const [state, setState] = useState('loading');

  const findCountryByName = useCallback(
    (name) => {
      if (!countries) return;
      return countries.find((country) => country.name.common === name);
    },
    [countries]
  );

  const findByAltSpelling = (altSpelling) => {
    if (!countries) return;
    return countries.find((country) => country.cca3 === altSpelling);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(COUNTRIES_API);
        const data = await response.json();
        setCountries(data);
        setState('resolved');
      } catch (err) {
        setState('error');
      }
    })();
  }, []);

  return <CountryContext.Provider value={{ countries, findCountryByName, findByAltSpelling, state }}>{children}</CountryContext.Provider>;
};

const useCountries = () => {
  const { countries, findCountryByName, findByAltSpelling, state } = useContext(CountryContext);

  return {
    countries,
    findCountryByName,
    findByAltSpelling,
    state,
  };
};

export default useCountries;
