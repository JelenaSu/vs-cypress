class EditBoard {

    get configurationBtn() {
        // return cy.get('.vs-c-site-logo').last();
        return cy.get('[data-cy="board-configuration"] > span > div > .vs-c-site-logo').last();
    }

    get boardBtn() {
        return cy.get('.vs-c-list__btn').last();
        // return cy.get('[class="vs-c-img--avatar vs-c-img--board-avatar"]').last();
    }

    get inputBoardTitle() {
        return cy.get('[data-vv-as="board title"]');
    }

    get inputBoardDescription() {
        return cy.get(':nth-child(1) > .vs-c-settings-section > .vs-c-settings-section-form > .el-form > :nth-child(3) > .el-form-item__content > .el-input > .el-input__inner');
    }

    get updateBtn() {
        return cy.get('[class="vs-c-btn vs-c-btn--primary vs-c-btn--spaced vs-u-font-weight-bold vs-c-btn-auth--top-gap"]');
    }

    clickUpdateBtn() {
        this.updateBtn.click();
    }

    clickOnBoardBtn() {
        this.boardBtn.click();
    }

    clickOnConfigurationBtn() {
        this.configurationBtn.click();
    }

    edit(title, description) {
        this.inputBoardTitle.type(title);
        this.inputBoardDescription.type(description);
        this.clickUpdateBtn();
    }


}

export const editBoard = new EditBoard();
