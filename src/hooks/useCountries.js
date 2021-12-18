import { useContext } from 'react';

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