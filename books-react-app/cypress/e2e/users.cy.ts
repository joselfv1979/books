describe('open users page', () => {

    beforeEach(() => {
        cy.task("seedDatabase");
    });

    it('should display a users list', () => {
        cy.login('admin', '1234');
        cy.intercept('GET', '/api/users').as('getUsersRequest');

        cy.get('nav').find('a').contains('Users').click();

        cy.wait("@getUsersRequest")
            .its("response")
            .its("statusCode")
            .should("eq", 200);

        cy.contains('Users');
        cy.get('[data-testid="user-card"]').should("have.length", 3);
    });

    it('should delete one user', () => {
        cy.login('admin', '1234');
        cy.intercept('GET', '/api/users').as('getUsersRequest');
        cy.intercept('DELETE', '/api/users/*').as('deleteUserRequest');

        cy.get('nav').find('a').contains('Users').click();

        cy.wait("@getUsersRequest")
            .its("response")
            .its("statusCode")
            .should("eq", 200);

        cy.contains('Users');
        cy.get('[data-testid="user-card"]').should("have.length", 3);

        cy.get("[data-testid='userToDelete']").should("exist");
        cy.get('[data-testid="userToDelete"] [data-testid="delete-user-btn"]').click();

        cy.get("[data-testid='delete-modal']").should("exist");
        cy.get('[data-testid="delete-modal"] [data-testid="delete-item-btn"]').click();

        cy.wait("@deleteUserRequest")
            .its("response")
            .its("statusCode")
            .should("eq", 204);

        cy.get("[data-testid='userToDelete']").should("not.exist");
        cy.get('[data-testid="user-card"]').should("have.length", 2);
        cy.contains('[data-testid="alert"]', 'User deleted successfully').should('be.visible');
    });

    it("should update user's profile", () => {
        cy.intercept('POST', '/api/auth/login').as('requestLogin');
        cy.intercept('PUT', '/api/users/*').as('updateUserRequest');

        cy.login('userToUpdate', '1234');

        cy.wait("@requestLogin")
            .its("response")
            .its("statusCode")
            .should("eq", 200);

        cy.get('nav').find('a').contains('Profile').click();
        cy.contains('Edit profile').should('be.visible');
        cy.get('[placeholder="Enter username"]').should('have.value', 'userToUpdate');

        cy.get('[placeholder="Enter username"]').clear();
        cy.get('[placeholder="Enter username"]').type('userUpdated');
        cy.get('button[type="submit"]').click();

        cy.wait("@updateUserRequest")
            .its("response")
            .its("statusCode")
            .should("eq", 201);

        cy.get('[placeholder="Enter username"]').should('have.value', 'userUpdated');
        cy.contains('[data-testid="alert"]', 'User updated successfully').should('be.visible');
        cy.get('nav').find('span').get("[data-testid='userUpdated']").should("be.visible");
    });
})