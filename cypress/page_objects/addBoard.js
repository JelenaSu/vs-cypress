class AddBoard {

     get addBoardBtn() {
        return cy.get('[class="vs-c-my-organization__board vs-c-my-organization__board-new"]');
     }

     get myOrganizationDropDown() {
        return cy.get('input[autocomplete="off"]');
     }

     get myOrganizationBtn() {
        return cy.get('input[type="text"]').first();
     }

     

     get enterTitleInput() {
        return cy.get('input[name="name"]');
     }

     get cancelBtn() {
        return cy.get('button[name="prev_btn"]');
     }

     get nextBtn() {
        return cy.get('button[name="next_btn"]');
     }

     get kanbanCheck() {
        return cy.get('span[name="type_kanban"]');
     }

     get finishButton() {
        return cy.get('button[name="next_btn"]')
     }

     clickOnFinishBtn() {
        this.finishButton.click();
     }

     clickOnKanbanCheck() {
        this.kanbanCheck.click();
     }

     clickOnNextBtn() {
        this.nextBtn.click();
     }

     clickOnMyOrganizationDropDown() {
        this.myOrganizationDropDown.click();
     }

     clickOnMyOrganizationBtn() {
        this.myOrganizationBtn.click();
     }


     clickOnCancelBtn() {
        this.cancelBtn.click();
     }

     clickOnAddBoardBtn() {
        this.addBoardBtn.click();
     }


     createNewBoard(title = "proba") {
       this.myOrganizationDropDown.click();
       this.clickOnMyOrganizationBtn();
       this.enterTitleInput.type(title);
       this.clickOnNextBtn();
       this.clickOnKanbanCheck();
       this.clickOnNextBtn();
       this.clickOnNextBtn();
       this.clickOnNextBtn();
       this.clickOnFinishBtn();
     }

}

export const addBoard = new AddBoard();