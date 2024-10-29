describe('open register page', () => {

    beforeEach(() => {
        cy.task("seedDatabase");
        cy.visit('/register');
    });

    it('should display register form', () => {
        cy.contains('Register');
        cy.get('[data-testid="user-form"]').should('be.visible');
        cy.get('[placeholder="Enter full name"]').should('have.value', '');
        cy.get('[placeholder="Enter username"]').should('have.value', '');
        cy.get('[placeholder="Enter email"]').should('have.value', '');
        cy.get('[placeholder="Password"]').should('have.value', '');
    });

    it('should create a new user successfully', () => {
        cy.intercept("POST", "/api/auth/register").as("requestAddNewUser");

        cy.get('[placeholder="Enter full name"]').type('New User');
        cy.get('[placeholder="Enter username"]').type('newUser');
        cy.get('[placeholder="Enter email"]').type('newUser@gmail.com');
        cy.get('[placeholder="Password"]').type('password');
        cy.get('button[type="submit"]').click();

        cy.get('[data-testid="loader"]').should('be.visible');

        cy.wait("@requestAddNewUser")
            .its("response")
            .its("statusCode")
            .should("eq", 201);

        cy.contains('[data-testid="alert"]', 'User created successfully').should('be.visible');
    });

    it('should display an error message if any of the required book attributes are empty or wrong', () => {
        cy.get('button[type="submit"]').click();
        cy.contains('Fullname is required').should('be.visible');
        cy.contains('Username must contains 4 characters at least').should('be.visible');
        cy.contains('Email is required').should('be.visible');
        cy.contains('Password must be between 4 and 8 characters long').should('be.visible');
    });

    it('should navigate to login page', () => {
        cy.contains('Login here').click();
        cy.location("pathname").should("eq", "/login");
        cy.contains('Login');
    });
});