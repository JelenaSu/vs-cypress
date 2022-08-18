class DeleteBoard {

    get deleteBtn() {
        return cy.get('[class="vs-c-btn vs-c-btn--warning vs-c-btn--spaced"]');
    }

    get confirmYesBtn() {
        return cy.get('button[name="save-btn"]');
    }

    clickOnYesBtn() {
        this.confirmYesBtn.click();
    }

    clickOnDeleteBtn() {
        this.deleteBtn.click();
    }


}

export const deleteBoard = new DeleteBoard();
