import { Wrapper, StyledLink } from './Card.styles';

const Card = ({ country }) => {
  const {
    name: { common },
    capital,
    continents: [continent],
    population,
    flags: { svg },
  } = country;

  return (
    <Wrapper>
      <StyledLink to={`country/${common}`}>
        <img src={svg} alt={common} />
        <div>
          <h3>{common}</h3>
          <p>
            <span>Population:</span> {population}
          </p>
          <p>
            <span>Region:</span> {continent}
          </p>
          <p>
            <span>Capital:</span> {capital}
          </p>
        </div>
      </StyledLink>
    </Wrapper>
  );
};

export default Card;
