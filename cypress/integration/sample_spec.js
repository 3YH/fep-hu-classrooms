describe('Homepage', function() {
    it('should show the title', function() {
        cy.visit('https://www.thuisbezorgd.nl');
        cy.get('h1').should('contain', 'Tijd om eten te bestellen');
    });
});
describe('My First Test', function() {
    it('Does not do much!', function() {
        expect(true).to.equal(true)
    })
})
