// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("SignIn", (email, password) => {
  cy.visit("/");
    
    cy.get('a[href="/app/start"]').click()
    cy.location("pathname").should("eq", "/app/start")
    
    cy
      .get('input[name="email"]')
      .type(email)
      .should("have.value", email);
    cy
      .get('input[name="password"]')
      .type(password)
      .should("have.value", password);
    cy.get("form").submit();
    cy.location("pathname", { timeout: 60000 }).should("match", /app\/[\w-]{36}\/home/)
    cy.log('Login Successfully');

})

Cypress.Commands.add("Logout", () => {

  cy.get('.avatar-text').click({ multiple: true })
  cy.get('a[href="/app/logout"]').find('div').find('span').click()
  cy.location("pathname").should("eq", "/")
})