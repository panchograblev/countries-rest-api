import { useState } from 'react';

import Card from 'components/Card/Card';
import Filters from 'components/Filters/Filters';
import useCountries from 'Providers/CountriesProvider';

import { ReactComponent as Icon } from 'assets/loadingIcon.svg';
import { Wrapper, CardsList, StyledLoading } from './SearchPage.styles';

const SearchPage = () => {
  const { countries, state } = useCountries();
  const [selectedValue, setSelectedValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  function handleSelectedItemChange({ selectedItem }) {
    setSelectedValue(selectedItem);
  }

  let content;
  switch (state) {
    case 'loading':
      content = (
        <StyledLoading>
          <Icon />
          Loading...
        </StyledLoading>
      );
      break;
    case 'resolved':
      const list = countries
        .filter((country) => country.name.common.toLowerCase().includes(inputValue.toLowerCase()))
        .filter((country) => {
          return country.continents.some((continent) => continent.toLowerCase().includes(selectedValue.toLowerCase()));
        })
        .map((country) => <Card country={country} key={country.name.common} />);
      content = <CardsList>{list}</CardsList>;
      break;
    default:
      content = <h2>Error...</h2>;
      break;
  }

  return (
    <Wrapper>
      <Filters
        selectedValue={selectedValue}
        handleSelectedItemChange={handleSelectedItemChange}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      {content}
    </Wrapper>
  );
};

export default SearchPage;
