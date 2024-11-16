describe('Operation Type Page Test', () => {
    it('Visits the operation type page', () => {
        cy.visit('/operationtype');
        cy.contains('Operation Type');
        cy.get('.p-datatable-striped tbody')
            .find('tr')
            .its('length')
            .should('be.gte', 2);
    });
});

const randomName = `OpTypeName_${Date.now()}`;

describe('Operation Type Tests', () => {
    it('Create Operation Type', () => {
        cy.visit('/operationtype');

        cy.get('#buttonCreateOperationType').click();

        cy.get('#name').type(randomName);
        cy.get('#preparation').type('20');
        cy.get('#surgery').type('50');
        cy.get('#cleaning').type('25');

        cy.get('#buttonCreateRequiredStaff').click();
        cy.get('#buttonCreateRequiredStaff').click();

        cy.get('#total0').clear().type('2');
        cy.get('#total1').clear().type('5');

        cy.get('#specialization0').click();
        cy.get('.p-dropdown-item').contains('Dermatology').click();

        cy.get('#specialization1').click();
        cy.get('.p-dropdown-item').contains('Nurse Anaesthetist').click();

        cy.get('#buttonCreateSubmit').find('button').click({ force: true });

        cy.get('#message').should(($div) => {
            const text = $div.text();

            expect('Success!Your Operation Type was added with success').equal(text);
        });
    });

    // it('Update Operation Type Test', () => {
    //   cy.visit('/staff');

    //   cy.get('input[aria-label="Filter Name"]').type('TestName{enter}');

    //   cy.get('.p-datatable-striped tbody')
    //     .contains('tr', 'TestName')
    //     .within(() => {
    //       cy.get('#buttonEdit').click();
    //     });
    //   cy.get('#phone').type('992945969');

    //   cy.get('#buttonSubmit').find('button').click({ force: true });

    //   cy.get('#message').should(($div) => {
    //     const text = $div.text();

    //     expect('Success!Your Staff Profile was edited with success').equal(text);
    //   });
    // });

    // it('Get Operation Type Details Test', () => {
    //   cy.visit('/staff');

    //   cy.get('input[aria-label="Filter Name"]').type('TestName{enter}');

    //   cy.get('.p-datatable-striped tbody')
    //     .contains('tr', 'TestName')
    //     .within(() => {
    //       cy.get('#buttonDetails').click();
    //     });

    //     cy.get('#licenseNumber').should('contain.text', '17825');
    //   });

    // it('Deactivate Operation Type Test', () => {
    //   cy.visit('/staff');

    //   cy.get('input[aria-label="Filter Name"]').type('TestName{enter}');

    //   cy.get('.p-datatable-striped tbody')
    //     .contains('tr', 'TestName')
    //     .within(() => {
    //       cy.get('#buttonDeactivate').click();
    //     });

    //   cy.get('#buttonConfirmDelete').click();

    //   cy.get('#message').should(($div) => {
    //     const text = $div.text();

    //     expect('Success!Your Staff Profile was deactivated with success').equal(
    //       text
    //     );
    //   });
    // });
});

