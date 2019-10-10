describe('Overzicht aanvragen', () => {
  it('should show filter text', () => {
    cy.visit('localhost:4200');
    cy.get('p').should('contain', 'Filter op aanvraagstatus');
  });

  it('filter op aanvraagstatus', () => {
    cy.get('.mat-chip')
      .contains('Geaccepteerd')
      .click()
      .should('have.class', 'mat-chip-selected');
    cy.get('.cdk-column-aanvraagStatus').should('contain', 'ACCEPTED');
    cy.get('.mat-chip')
      .contains('Afgewezen')
      .click()
      .should('have.class', 'mat-chip-selected');
    cy.get('.cdk-column-aanvraagStatus').should('contain', 'REJECTED');
    cy.get('.mat-chip')
      .contains('Aangevraagd')
      .click()
      .should('have.class', 'mat-chip-selected');
    cy.get('.cdk-column-aanvraagStatus').should('contain', 'REQUESTED');
  });

  it('Zoeken op aanvraag id', () => {
    cy.get('.mat-input-element').type('fe823');
    cy.get('.cdk-column-aanvragerId').should('contain', 'fe823');
  });
});
