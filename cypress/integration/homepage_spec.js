describe('Homepage', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://restcountries.com/v3.1/all*', { fixture: 'countries.json' }).as('getCountries');
    cy.visit('/');
    cy.wait(['@getCountries']);
  });

  it('Homepage is loaded and countries are shown', () => {
    // ensure elements and are visible
    cy.contains('Where in the world?');
    cy.contains('Light Mode');

    cy.contains('button', 'Filter by Region').should('exist');

    // country list rendered
    cy.get('h3').should('have.length', 9);
    cy.get('h3').each(($el) => {
      cy.wrap($el).parent().should('contain.text', 'Population');
      cy.wrap($el).parent().should('contain.text', 'Region');
      cy.wrap($el).parent().should('contain.text', 'Capital');
      cy.wrap($el).parent().get('img').should('exist');
    });
  });

  it('Clicking on a country would open a country page', () => {
    cy.get('a[href*="/country/Switzerland"]').click();
    cy.url().should('include', '/country/Switzerland');
  });

  it('Theme mode is properly changed', () => {
    // light theme is loaded by default
    cy.contains('Light Mode').click();

    cy.should('contain.text', 'Dark Mode');
    cy.should('not.contain.text', 'Light Mode');

    cy.contains('Dark Mode').then(($el) => {
      cy.wrap($el).parent().next().should('have.css', 'background-color').and('eq', 'rgb(32, 44, 55)');
    });

    // switch back to light
    cy.contains('Dark Mode').click();

    cy.should('not.contain.text', 'Dark Mode');
    cy.should('contain.text', 'Light Mode');

    cy.contains('Light Mode').then(($el) => {
      cy.wrap($el).parent().next().should('have.css', 'background-color').and('eq', 'rgb(250, 250, 250)');
    });
  });

  it('Filter by region changes results', () => {
    cy.contains('button', 'Filter by Region').should('exist');

    cy.get('h3').should('have.length', 9);

    cy.contains('button', 'Filter by Region').click();
    cy.contains('li', 'Asia').should('be.visible');
    cy.contains('li', 'Asia').click();
    cy.contains('button', 'Filter by Region').should('not.exist');
    cy.contains('button', 'Asia').should('be.visible');

    cy.get('h3').should('have.length', 0);

    cy.contains('button', 'Asia').click();
    cy.contains('li', 'Europe').should('be.visible');
    cy.contains('li', 'Europe').click();

    cy.get('h3').should('have.length', 7);

    cy.contains('button', 'Europe').click();
    cy.contains('li', 'Oceania').should('be.visible');
    cy.contains('li', 'Oceania').click();

    cy.get('h3').should('have.length', 1);

    cy.contains('button', 'Oceania').click();
    cy.contains('li', 'Filter by Region').should('be.visible');
    cy.contains('li', 'Filter by Region').click();

    cy.get('h3').should('have.length', 9);
  });

  it('Filter by word and region returns correct results', () => {
    cy.contains('button', 'Filter by Region').should('exist');

    cy.get('h3').should('have.length', 9);

    // search for France
    cy.get('input').type('France');
    cy.get('h3').should('have.length', 1);

    // search for country with letter `c`
    cy.get('input').clear();
    cy.get('input').type('c');
    cy.get('h3').should('have.length', 3);

    // change region to Asia
    cy.contains('button', 'Filter by Region').click();
    cy.contains('li', 'Asia').should('be.visible');
    cy.contains('li', 'Asia').click();

    cy.get('h3').should('have.length', 0);

    // change region to America
    cy.contains('button', 'Asia').click();
    cy.contains('li', 'America').should('be.visible');
    cy.contains('li', 'America').click();

    cy.get('h3').should('have.length', 1);

    // change to Europe
    cy.contains('button', 'America').click();
    cy.contains('li', 'Europe').should('be.visible');
    cy.contains('li', 'Europe').click();

    cy.get('h3').should('have.length', 2);

    // clear search, but filter is on
    cy.get('input').clear();
    cy.get('h3').should('have.length', 7);
  });
});
