import {
    verify
} from "crypto";

describe('detail aanvraag requested als docent', () => {
    it('should show filter text', () => {
        cy.visit('localhost:4200');
        cy.get('.mat-toolbar-row > span').should('contain', 'Innovation Lab')
    });
    it('should show buttons and have text input', () => {
        cy.get('.mat-chip-list-wrapper > :nth-child(2)').click();
        cy.get(':nth-child(2) > .cdk-column-aanvragerId').click();
        cy.get('#mat-input-1').should('exist');
        cy.get('#mat-input-1').clear();
        cy.get('.mat-card-actions > :nth-child(2) > .mat-button-wrapper').should('be.visible');
        cy.get('#mat-input-1').type('Daarom.');
        cy.get('.mat-card-actions > :nth-child(1) > .mat-button-wrapper').should('be.visible');

    })

});
