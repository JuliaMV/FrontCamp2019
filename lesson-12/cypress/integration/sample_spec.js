describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('/');

    cy.get('#search-input')
      .type('Home Alone')
      .should('have.value', 'Home Alone');

    cy.get('button[type="submit"]')
      .click();

    cy.url().should('include', 'Home%20Alone');

    cy.get('#filmsList')
      .should('be.visible')
      .find('li')
      .should(($li) => {
        expect($li).to.have.length(4);
      });
  });
});
