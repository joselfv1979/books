describe.only('open books page', () => {

    beforeEach(() => {
        cy.task("seedDatabase");
    });

    it('should navigate to book list page', () => {
        cy.intercept('GET', '/api/books?*').as('getBooksRequest');

        cy.visit('/');
        cy.get('nav').find('a').contains('Books').click();

        cy.wait("@getBooksRequest")
            .its("response")
            .its("statusCode")
            .should("eq", 200);

        cy.location("pathname").should("eq", "/books");
        cy.contains('Library');
        cy.get('[data-testid="book-card"]').should("have.length", 4);
    });

    it('should display one book', () => {
        cy.intercept('GET', '/api/books/*').as('getBookRequest');

        cy.visit('/books');
        cy.get("[data-testid='El doctor enamorado']").should("exist");
        cy.get('[data-testid="El doctor enamorado"] [data-testid="view-book-btn"]').click();

        cy.wait("@getBookRequest")
            .its("response")
            .its("statusCode")
            .should("eq", 200);

        cy.get('h2').contains('El doctor enamorado');
    });

    it('should delete one book', () => {
        cy.login('admin', '1234');
        cy.intercept('GET', '/api/books?*').as('getBooksRequest');
        cy.intercept('DELETE', '/api/books/*').as('deleteBookRequest');

        cy.get('nav').find('a').contains('Books').click();

        cy.wait("@getBooksRequest")
            .its("response")
            .its("statusCode")
            .should("eq", 200);

        cy.contains('Books');
        cy.get('[data-testid="book-card"]').should("have.length", 4);

        cy.get("[data-testid='bookToDelete']").should("exist");
        cy.get('[data-testid="bookToDelete"] [data-testid="delete-book-btn"]').click();

        cy.get("[data-testid='delete-modal']").should("exist");
        cy.get('[data-testid="delete-modal"] [data-testid="delete-item-btn"]').click();

        cy.wait("@deleteBookRequest")
            .its("response")
            .its("statusCode")
            .should("eq", 204);

        cy.get("[data-testid='bookToDelete']").should("not.exist");
        cy.get('[data-testid="book-card"]').should("have.length", 3);
        cy.contains('[data-testid="alert"]', 'Book deleted successfully').should('be.visible');
    });

    it("should update one book", () => {
        cy.login('admin', '1234');
        cy.intercept('GET', '/api/books?*').as('getBooksRequest');
        cy.intercept('PUT', '/api/books/*').as('updateBookRequest');

        cy.get('nav').find('a').contains('Books').click();

        cy.get("[data-testid='bookToUpdate']").should("exist");
        cy.get('[data-testid="bookToUpdate"] [data-testid="edit-book-btn"]').click();

        cy.contains('Edit Book');
        cy.get('[data-testid="book-form"]').should('be.visible');
        cy.get('[placeholder="Enter title"]').should('have.value', 'bookToUpdate');

        cy.get('[placeholder="Enter title"]').clear();
        cy.get('[placeholder="Enter title"]').type('titleUpdated');
        cy.get('button[type="submit"]').click();

        cy.wait("@updateBookRequest")
            .its("response")
            .its("statusCode")
            .should("eq", 201);

        cy.get('[placeholder="Enter title"]').should('have.value', 'titleUpdated');
        cy.contains('[data-testid="alert"]', 'Book updated successfully').should('be.visible');
    });
});