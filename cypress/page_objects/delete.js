class DeleteBoard {

    get deleteBtn() {
        return cy.get('[class="vs-c-btn vs-c-btn--warning vs-c-btn--spaced"]');
    }

    clickOnDeleteBtn() {
        this.deleteBtn.click();
    }
}

export const deleteBoard = new DeleteBoard();
