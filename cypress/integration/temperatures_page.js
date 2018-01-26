describe('Temperatures page', function () {

  beforeEach(function () {
    cy.exec('npm start');
  });

  it('Visit the page', function () {

    cy.visit('/');
    cy.title().should('include', 'temperature-machine');

  });

  it('Current temperatures (averaged) are shown', function () {

    cy.server();
    cy.route('GET', 'temperatures/average', 'fixture:temperatures_average.json');
    cy.route('GET', 'temperature.json', 'fixture:temperature.json');

    cy.visit('/');

    cy.get('.source.bedroom1').should('contain', 'bedroom1');
    cy.get('.temperature.bedroom1').should('contain', '21.1');

    cy.get('.source.bedroom2').should('contain', 'bedroom2');
    cy.get('.temperature.bedroom2').should('contain', '18.6');
    
    cy.get('.source.study').should('contain', 'study');
    cy.get('.temperature.study').should('contain', '19.3');
  });
  
  it('Current temperatures (all sensors) are shown', function () {

    cy.server();
    cy.route('GET', 'temperatures', 'fixture:temperatures_all_sensors.json');
    cy.route('GET', 'temperature.json', 'fixture:temperature.json');

    cy.visit('/');
    
    selectAllSensors();

    // todo a better selector
    cy.get(':nth-child(1) > :nth-child(1) > .source').should('contain', 'bedroom1');
    cy.get(':nth-child(1) > :nth-child(1) > .temperature').should('contain', '20.9');

    cy.get(':nth-child(2) > .source').should('contain', 'bedroom1');
    cy.get(':nth-child(2) > .temperature').should('contain', '21.4');
    
    cy.get(':nth-child(2) > div > .source').should('contain', 'bedroom2');
    cy.get(':nth-child(2) > div > .temperature').should('contain', '18.6');
    
    cy.get(':nth-child(3) > div > .source').should('contain', 'study');
    cy.get(':nth-child(3) > div > .temperature').should('contain', '19.3');
  });

  let selectAllSensors = function () {
    let menu = cy.get('.bm-burger-button > button').click();
    menu.get('.bm-item-selection.all_sensors').click();
    menu.get('.bm-cross-button > button').click();
  };
  
});