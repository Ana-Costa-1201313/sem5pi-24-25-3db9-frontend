describe('Staff Page Test', () => {
  it('Visits the staff page', () => {
    cy.visit('/staff');
    cy.contains('Staff');
    cy.get('.p-datatable-striped tbody')
      .find('tr')
      .its('length')
      .should('be.gte', 2);
  });
});

describe('Staff Test', () => {
  it('Create staff', () => {
    cy.visit('/staff');

    cy.get('#buttonCreate').click();

    cy.get('#name').type('TestName');
    cy.get('#licenseNumber').type('17825');
    cy.get('#phone').type('992948964');
    cy.get('#recruitmentYear').type('2022');

    cy.get('#role').click();
    cy.get('.p-dropdown-item').contains('NURSE').click();

    cy.get('#buttonSubmit').find('button').click({ force: true });

    cy.get('#message').should(($div) => {
      const text = $div.text();

      expect('Success!Your Staff Profile was added with success').equal(text);
    });
  });

  it('Edit staff', () => {
    cy.visit('/staff');

    cy.get('input[aria-label="Filter Name"]').type('TestName{enter}');

    cy.get('.p-datatable-striped tbody')
      .contains('tr', 'TestName')
      .within(() => {
        cy.get('#buttonEdit').click();
      });
    cy.get('#phone').type('992945969');

    cy.get('#buttonSubmit').find('button').click({ force: true });

    cy.get('#message').should(($div) => {
      const text = $div.text();

      expect('Success!Your Staff Profile was edited with success').equal(text);
    });
  });

  it('Get staff details', () => {
    cy.visit('/staff');

    cy.get('input[aria-label="Filter Name"]').type('TestName{enter}');

    cy.get('.p-datatable-striped tbody')
      .contains('tr', 'TestName')
      .within(() => {
        cy.get('#buttonDetails').click();
      });

      cy.get('#licenseNumber').should('contain.text', '17825');
    });

  it('Deactivate staff', () => {
    cy.visit('/staff');

    cy.get('input[aria-label="Filter Name"]').type('TestName{enter}');

    cy.get('.p-datatable-striped tbody')
      .contains('tr', 'TestName')
      .within(() => {
        cy.get('#buttonDeactivate').click();
      });

    cy.get('#buttonConfirmDelete').click();

    cy.get('#message').should(($div) => {
      const text = $div.text();

      expect('Success!Your Staff Profile was deactivated with success').equal(
        text
      );
    });
  });
});
