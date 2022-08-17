/// <reference types="Cypress" />

import { loginPage } from "../page_objects/loginPage"
import { navigation } from "../page_objects/navigation"
import { general } from "../page_objects/general"
import { addBoard } from "../page_objects/addBoard"
import { editBoard } from "../page_objects/editBoard"
import { deleteBoard } from "../page_objects/delete"

var token;
var boardId;



describe('Login test cases', () => {
  before('Visit Vivifyscrum page and click on login', () => {
    cy.visit('/');
    cy.url().should('contain', 'https://cypress.vivifyscrum-stage.com/');
    general.headerTitle.should('contain', 'Log in with your existing account');
    cy.url().should('contain', '/login');
    loginPage.loginBtn.should('exist');
    loginPage.clickOnLoginBtn();
  })

  beforeEach("Login through BE", () => {
    cy.request ({
         method: "POST",
         url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
         body: {
          email: "test1235@gmail.com",
          password: "test1235",
         }
    }).its("body").then((body) => {
      window.localStorage.setItem("token", body.access_token);
    })
  })


  it("Login with valid credentials", () => {
    cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/login').as('login')
    loginPage.login(Cypress.env('validLoginEmail'), Cypress.env('validLoginPassword'));
    cy.wait('@login').then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
      expect(intercept.response.url).to.eq('https://cypress-api.vivifyscrum-stage.com/api/v2/login');
      expect(intercept.request.body.email).to.eq(Cypress.env('validLoginEmail'));
      expect(intercept.request.body.password).to.eq(Cypress.env('validLoginPassword'));
      token = intercept.response.body.access_token;
    })
  })

  it('Add new board', () => {
    cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards').as('addBoard');
    addBoard.addBoardBtn.should('exist');
    addBoard.clickOnAddBoardBtn();
    addBoard.createNewBoard();
    cy.url().should('contain', 'boards');
    cy.wait('@addBoard').then(intercept => {
      expect(intercept.response.url).to.eq('https://cypress-api.vivifyscrum-stage.com/api/v2/boards');
      expect(intercept.response.statusCode).to.eq(201);
      boardId = intercept.response.body.id
    })
  })

  it('Edit board BE', () => {
    editBoard.configurationBtn.should('exist');
    editBoard.clickOnConfigurationBtn();
    cy.request({
      method: "PUT",
      url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
      body: {
        name: "Novi Board",
        description: "opis",
      },
      headers: {
        authorization: `Bearer ${token}`
      }

    }).then((response) => {
      expect(response.body.name).to.eq("Novi Board");
      expect(response.status).to.eq(200);
    })
    
  })

  it('Delete board BE', () => {
    cy.request({
        method: 'DELETE',
        url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
    })
})

})
