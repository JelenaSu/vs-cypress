/// <reference types="Cypress" />

import { loginPage } from "../page_objects/loginPage"
import { navigation } from "../page_objects/navigation"
import { general } from "../page_objects/general"
import { addBoard } from "../page_objects/addBoard"
import { editBoard } from "../page_objects/editBoard"
import { deleteBoard } from "../page_objects/deleteBoard"

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
    addBoard.createNewBoard("novo");
    cy.url().should('contain', 'boards');
    cy.wait('@addBoard').then(intercept => {
      expect(intercept.response.url).to.eq('https://cypress-api.vivifyscrum-stage.com/api/v2/boards');
      expect(intercept.response.statusCode).to.eq(201);
      boardId = intercept.response.body.id
    })
  })

  it('Edit board', () => {
    editBoard.boardBtn.should('exist');
    editBoard.clickOnBoardBtn();
    editBoard.configurationBtn.should('exist');
    editBoard.clickOnConfigurationBtn();
    cy.url().should('contain', '/settings');
    editBoard.inputBoardTitle.clear().type("title123");
    editBoard.inputBoardDescription.clear().type("opis123");
    editBoard.updateBtn.should('be.visible')
    .and('have.css', 'background-color', 'rgb(78, 174, 147)');
    editBoard.clickUpdateBtn();
  })


  it('Delete board', () => {
    editBoard.clickOnConfigurationBtn();
    deleteBoard.deleteBtn.should('exist')
    .and('have.text', ' Delete')
    .and('have.css', 'background-color', 'rgb(254, 126, 86)');
    deleteBoard.clickOnDeleteBtn();
    deleteBoard.confirmYesBtn.should('be.visible')
    .and('have.css', 'background-color', 'rgb(78, 174, 147)');
    deleteBoard.clickOnYesBtn();
});

  it('Delete board BE', () => {
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
  })

  it('Logout BE', () => {
     Cypress.Commands.add('logout', (token) => {
       cy.request({
          method: "POST", 
          url: "https://cypress-api.vivifyscrum-stage.com/api/v2/logout",
          headers: {
          authorization: `Bearer ${token}`,
      }
   }).then((response) => {
    expect(response.status).to.eq(200);
      })
    })
  })
})
