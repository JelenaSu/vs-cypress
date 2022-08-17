class Navigation {

    get loginButton() {
        return cy.get('strong[xpath="1"]');
    }

    clickOnLoginButton() {
        this.loginButton.click();
    }

}

export const navigation = new Navigation(); 

