describe.only('open login page', () => {

    beforeEach(() => {
        cy.task("seedDatabase");
        cy.visit('/login');
    });

    it('should display login form', () => {
        cy.contains("Login");
        cy.get('[placeholder="Enter username"]').should('have.value', '');
        cy.get('[placeholder="Enter password"]').should('have.value', '');
    });

    it("while logging should be visible loading spinner", () => {
        cy.get('[placeholder="Enter username"]').type('admin');
        cy.get('[placeholder="Enter password"]').type('1234');
        cy.contains('Submit').click();
        cy.intercept('/');
        cy.get('[data-testid="loader"]').should('be.visible');
    })

    it('should sign in successfully and navigate to book list page', () => {
        cy.intercept('POST', '/api/auth/login').as('requestLogin');

        cy.get('[placeholder="Enter username"]').type('admin');
        cy.get('[placeholder="Enter password"]').type('1234');
        cy.contains('Submit').click();

        cy.wait("@requestLogin")
            .its("response")
            .its("statusCode")
            .should("eq", 200);

        cy.getAllLocalStorage()
            .its(`http://localhost:3000`)
            .its("token")
            .should("not.be.undefined");

        cy.get('[data-testid="admin"]').should('be.visible');

        cy.location("pathname").should("eq", "/");
        cy.contains('View our Library');
    });

    it('should display a login error', () => {
        cy.get('[placeholder="Enter username"]').type('admin');
        cy.get('[placeholder="Enter password"]').type('wrong password');
        cy.contains('Submit').click();
        cy.contains('Invalid credentials');
    });

    it('should navigate to register page', () => {
        cy.contains('Create an account').click();
        cy.location("pathname").should("eq", "/register");
        cy.contains('Register');
    });

    it('should logout', () => {
        cy.login('admin', '1234');
        cy.get('[data-testid="logout-btn"]').click();
        cy.location("pathname").should("eq", "/login");

        cy.getAllLocalStorage()
            .its(`http://localhost:3000`)
            .its("token")
            .should("be.undefined");
    });
});