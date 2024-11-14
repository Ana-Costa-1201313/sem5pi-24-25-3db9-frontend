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
  it('Get staff details', () => {
    cy.visit('/staff');

    cy.get('#buttonDetails').click();
  });

  // it('Create staff', () => {
  //   cy.visit('/staff');

  //   cy.get('#buttonCreate').click();

  //   cy.get('#name').type('name');
  //   cy.get('#licenseNumber').type('123');
  //   cy.get('#phone').type('999999999');
  //   cy.get('#specialization').type('specialization');
  //   cy.get('#availabilitySlots').type('availabilitySlots');
  //   cy.get('#role').type('Nurse');
  //   cy.get('#recruitmentYear').type('2022');

  //   cy.get('#buttonSubmit').click({force: true});
  //   cy.get('#success').should(($div) => {
  //     const text = $div.text();
  //     expect('Your Staff Profile was added with success').equal(text);
  //   });
  //});
});
