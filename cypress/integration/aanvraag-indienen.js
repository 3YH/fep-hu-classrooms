describe('Aanvraag indienen', () => {
    it('Should visit localhost', () => {
        cy.visit('localhost:4200');
    });
    it('open dialog', () => {
        cy.get('.mat-fab > .mat-button-wrapper > .mat-icon').click();
        cy.get('[formcontrolname=ruimteId]').click();
        cy.get('.mat-option span')
            .contains('HL15-4.062')
            .then(option => {
                option[0].click(); // this is jquery click() not cypress click()
            });
        cy.get('[formcontrolname=motivatie]').type('test motivatie');
    });
    it('displays form validation', () => {
        cy.get('[formcontrolname=ruimteId]').click();
        cy.get('.mat-option span')
            .should('be.empty')
            .then(option => {
                option[0].click(); // this is jquery click() not cypress click()
            });
        cy.get('[id=mat-error-0]').should('contain', 'Een ruimte is verplicht');

        cy.get('[formcontrolname=datum]').type(' ');

        cy.get('[formcontrolname=motivatie]').clear();

        cy.get('[formcontrolname=startTijd]').click();
        cy.get('.mat-option span')
            .should('be.empty')
            .then(option => {
                option[0].click(); // this is jquery click() not cypress click()
            });

        cy.get('[id=mat-error-1]').should(
            'contain',
            'Een datum in de toekomst is verplicht'
        );

        cy.get('[id=mat-error-4]').should('contain', 'Een motivatie is verplicht');

        cy.get('[formcontrolname=eindTijd]').click();
        cy.get('.mat-option span')
            .should('be.empty')
            .then(option => {
                option[0].click(); // this is jquery click() not cypress click()
            });

        cy.get('[id=mat-error-2]').should('contain', 'Een begintijd is verplicht');

        cy.get('[id=mat-error-4]').should('contain', 'Een motivatie is verplicht');
    });

});
