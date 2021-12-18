import { useMemo } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import useCountries from 'Providers/CountriesProvider';
import InfoRow from 'components/InfoRow/InfoRow';
import BorderCountry from 'components/BorderCountry/BorderCountry';
import { StyledBorderCountries, BorderCountryList, Info, InfoWrapper, StyledButton, Wrapper } from './CountryDetails.styles';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const CountryDetails = () => {
  const { name } = useParams();
  let navigate = useNavigate();
  const { findCountryByName, findByAltSpelling } = useCountries();

  const handleBackButton = () => {
    navigate(-1);
  };

  const country = useMemo(() => findCountryByName(name), [findCountryByName, name]);

  const prepareLanguages = (languages) => {
    if (!languages) return;
    return Object.values(languages);
  };

  const prepareCurrencies = (currency) => {
    if (!currency) return;
    return Object.values(currency).map((curr) => curr.name);
  };

  return (
    <Wrapper>
      <StyledButton onClick={handleBackButton}>Back</StyledButton>
      {country ? (
        <InfoWrapper>
          <img src={country.flags.svg} alt={country.common} />
          <Info>
            <h2>{country.name.common}</h2>
            <div>
              <InfoRow title="Native Name" stat={Object.values(country.name.nativeName)[0]?.common} />
              <InfoRow title="Population" stat={numberWithCommas(country.population)} />
              <InfoRow title="Region" stat={country.continents?.[0]} />
              <InfoRow title="Sub Region" stat={country.subregion} />
              <InfoRow title="Capital" stat={country.capital} />
            </div>
            <div>
              <InfoRow title="Top Level Domain" stat={country.tld} />
              <InfoRow title="Currencies" stat={prepareCurrencies(country.currencies)} isArray />
              <InfoRow title="Languages" stat={prepareLanguages(country.languages)} isArray />
            </div>
            {country.borders ? (
              <StyledBorderCountries>
                <div>Border Countries:</div>
                <BorderCountryList>
                  {country.borders.map((altSpelling) => {
                    const countryByAlt = findByAltSpelling(altSpelling);
                    return countryByAlt ? <BorderCountry name={countryByAlt.name.common} key={countryByAlt.name.common} /> : '';
                  })}
                </BorderCountryList>
              </StyledBorderCountries>
            ) : null}
          </Info>
        </InfoWrapper>
      ) : (
        <h2>Loading...</h2>
      )}
    </Wrapper>
  );
};

export default CountryDetails;
