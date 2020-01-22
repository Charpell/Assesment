const faker = require('faker')

describe('Capbase', () => {
  beforeEach(function () {
    cy.fixture('user')
      .then((user) => {
        this.user = user
        cy.SignIn(user.email, user.password)
      })
  }) 
  
  it('SignIn', () => {
    cy.get("a")
  })

  it("Creates a target investor",  function () {
    const randomName = faker.name.findName()
    cy.get('.sc-giadOv').find('li').eq(6).click()
    cy.location("pathname", { timeout: 60000 }).should("match", /app\/[\w-]{36}\/fundraising\/investors/);
    cy.get('ul.list-group.list-group-flush', { timeout: 60000 }).find('li').then((listing) => {
      const lengthRows = Cypress.$(listing).length
      console.log('lengthRows')
      cy.log("lengthRows")

    cy.get('.btn.btn-link').click()
    cy.get('.switch-text-label').click()
    cy.wait(4000)
    cy.get('button.btn-primary.mb-1').click()
    cy.get('input[placeholder="Sarah Partner"]').type(randomName).should("have.value", randomName)
    cy.get('input[name="fundName"]').type("No").should("have.value", "No")
    cy.get('input[name="email"]').type(this.user.email).should("have.value", this.user.email)
    cy.get('button.btn-primary.mb-1').click()
    cy.get('.switch-text-label', { timeout: 60000 }).eq(0).click()
    cy.get('#valuationCap').click().type(this.user.amount)
    cy.get('button.btn-primary.mb-1').click()
    cy.wait(4000)
    cy.log('randomName', randomName)
    cy.get('button.close').find('span').click()
    cy.contains(randomName)
    cy.get('ul.list-group.list-group-flush').find('li').should('have.length', lengthRows + 1)
    cy.Logout()
    })
  })

})