describe('open a form to create a new book', () => {
    beforeEach(() => {
        cy.task("seedDatabase");
        cy.login('admin', '1234');
        cy.get('nav').find('a').contains('New Book').click();
    });

    it('should display book form', () => {
        cy.contains('New Book');
        cy.get('[data-testid="book-form"]').should('be.visible');
        cy.get('[placeholder="Enter title"]').should('have.value', '');
        cy.get('[placeholder="Enter author"]').should('have.value', '');
        cy.get('[placeholder="Enter publisher"]').should('have.value', '');
        cy.get('[placeholder="Enter isbn"]').should('have.value', '');
        cy.get('[placeholder="Enter pages"]').should('have.value', 0);
        cy.get('[placeholder="Add a tag"]').should('have.value', '');
    });

    it('should create a new book successfully', () => {
        cy.intercept("POST", "/api/books").as("requestAddNewBook");

        cy.get('[placeholder="Enter title"]').type('New Book');
        cy.get('[placeholder="Enter author"]').type('author1');
        cy.get('[placeholder="Enter publisher"]').type('publisher1');
        cy.get('[placeholder="Enter isbn"]').type('isbn1');
        cy.get('[placeholder="Enter pages"]').type('100');

        cy.get('button[type="submit"]').click();

        cy.get('[data-testid="loader"]').should('be.visible');

        cy.wait("@requestAddNewBook")
            .its("response")
            .its("statusCode")
            .should("eq", 201);

        cy.contains('[data-testid="alert"]', 'Book created successfully').should('be.visible');
    });

    it('should display an error message if any of the required book attributes are empty', () => {
        cy.get('button[type="submit"]').click();

        cy.contains('Title is required').should('be.visible');
        cy.contains('Author is required').should('be.visible');
        cy.contains('Publisher is required').should('be.visible');
        cy.contains('Pages is required').should('be.visible');
        cy.contains('Isbn is required').should('be.visible');
    });
})