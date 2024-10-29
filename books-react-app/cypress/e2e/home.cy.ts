describe.only('open home page', () => {

    beforeEach(() => {
        cy.task("seedDatabase");
        cy.visit('/');
    });

    it('should display home page', () => {
        cy.contains('View our Library');
    });

    it('should navigate to book list page', () => {
        cy.intercept('GET', '/api/books?page=1&limit=8').as('getBooksRequest');
        cy.contains('View our Library').click();

        cy.wait("@getBooksRequest")
            .its("response")
            .its("statusCode")
            .should("eq", 200);

        cy.location("pathname").should("eq", "/books");
        cy.contains('Library');
    });
});