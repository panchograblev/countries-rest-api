import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from 'assets/styles/GlobalStyles';
import { theme, lightTheme } from 'assets/styles/theme';

import Header from 'components/Header/Header';
import SearchPage from 'components/SearchPage/SearchPage';
import styled from 'styled-components';
import CountryDetails from 'components/CountryDetails/CountryDetails';
import { CountriesProvider } from 'Providers/CountriesProvider';

import useToggleMode from 'hooks/useToggleMode';

const Content = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 90px 1fr;
`;

function App() {
  const { theme: currentTheme, toggleTheme } = useToggleMode();
  const isLight = currentTheme === 'light';

  return (
    <ThemeProvider theme={isLight ? lightTheme : theme}>
      <CountriesProvider>
        <GlobalStyle />
        <Content>
          <Header toggleTheme={toggleTheme} currentTheme={currentTheme} />
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="country/:name" element={<CountryDetails />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </Content>
      </CountriesProvider>
    </ThemeProvider>
  );
}

export default App;
