class General {
    
    get headerTitle() {
        return cy.get('[class="vs-c-auth-modal-body__heading"]');
    }

}

export const general = new General();
