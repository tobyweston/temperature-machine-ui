describe('Temperatures page', function () {

  beforeEach(function () {
    cy.exec('npm start');
  });
  
  it('Visit the page', function () {
    
    cy.visit('/');
    cy.title().should('include', 'temperature-machine');
  
  });
  
});