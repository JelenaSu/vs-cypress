class Logout {

    get userAvatarBtn() {
        return cy.get('span[class="el-dropdown-link"]', {force:true});
    }

    get profileBtn() {
        return cy.get('[class="vs-c-site-logo"]').last();
    }

    get logoutBtn() {
        return cy.get('[class="vs-c-btn vs-c-btn--link vs-c-btn--danger"]');
    }

    clickLogoutBtn() {
        this.logoutBtn.click();
    }
    

    clickProfileBtn() {
        this.profileBtn.click();
    }

    clickUserAvatar() {
        this.userAvatarBtn.click();
    }


}

export const logout = new Logout();