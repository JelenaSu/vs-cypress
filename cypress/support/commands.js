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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('loginBE', (email, password)=> {
    cy.request('POST', 'https://cypress.vivifyscrum-stage.com/login', {
        email,
        password
    }).its('body').then(response => {
        window.localStorage.setItem('token', response.access_token)
    })

})

Cypress.Commands.add('logout', (token) => {
    cy.request({
        method: "POST", 
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/logout",
        headers: {
            authorization: `Bearer ${token}`
        }
    })
})

Cypress.Commands.add('Delete board BE', (token) => {
        cy.request({
          method: 'DELETE',
          url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,  
          headers: {
          authorization: `Bearer ${token}`,
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      })
    })

