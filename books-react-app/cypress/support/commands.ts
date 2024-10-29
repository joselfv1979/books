/// <reference types="cypress" />

export { };
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            login(username: string, passwd: string): Chainable<JQuery<HTMLElement>>;
        }
    }
};

Cypress.Commands.add('login', (username, passwd) => {
    cy.intercept('POST', '/api/auth/login').as("loginRequest");

    cy.visit('/login');
    cy.get('[placeholder="Enter username"]').type(username);
    cy.get('[placeholder="Enter password"]').type(passwd);
    cy.contains('Submit').click();

    cy.wait("@loginRequest")
        .its("response.body.data.token").should('not.be.undefined');
});


