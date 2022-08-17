class EditBoard {

    get configurationBtn() {
        return cy.get('.vs-c-site-logo').last();
    }

    get boardBtn() {
        return cy.get('.vs-c-list__btn').last();
    }

    clickOnConfigurationBtn() {
        this.configurationBtn.click();
    }


}

export const editBoard = new EditBoard();
