describe('Country Details Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://restcountries.com/v3.1/all*', { fixture: 'countries.json' }).as('getCountries');
    cy.visit('/country/Switzerland');
    cy.wait(['@getCountries']);
  });

  it('Country details page is loaded', () => {
    // ensure header elements and are visible
    cy.contains('Where in the world?');
    cy.contains('Light Mode');

    cy.get('button:contains("Back")');

    // country info is rendered
    cy.get('h2').should('have.text', 'Switzerland');
    cy.contains('Native Name: Suisse');
    cy.contains('Population: 17,500,657');
    cy.contains('Region: Europe');
    cy.contains('Sub Region: Western Europe');
    cy.contains('Capital: Bern');
    cy.contains('Top Level Domain: .ch');
    cy.contains('Currencies: Swiss franc');
    cy.contains('Languages: French, Swiss German, Italian, Romansh');
    cy.contains('Border Countries:');

    // neighbour countries are listed
    cy.contains('button', 'Austria').should('exist');
    cy.contains('button', 'Germany').should('exist');
    cy.contains('button', 'France').should('exist');
    cy.contains('button', 'Italy').should('exist');
    cy.contains('button', 'Liechtenstein').should('exist');
  });

  it('Country border countries are clickable and user is navigated back and forth', () => {
    cy.contains('button', 'Austria').click();
    cy.url().should('include', '/country/Austria');

    cy.contains('button', 'Back').click();
    cy.url().should('include', '/country/Switzerland');
  });
});
