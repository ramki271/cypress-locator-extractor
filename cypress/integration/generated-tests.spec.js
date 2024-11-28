describe('Generated Test Cases', () => {
  cy.visit('http://localhost:3003/dom_structure.html');
      it('Test Case 1: Perform type on input element', () => {
          cy.get('#username1').type('Sample Input');
      });
    it('Test Case 2: Perform click on button element', () => {
          cy.get('html.ng-scope > body > div.container.ng-scope > div.container-signin.ng-scope > div.flipper > div.frontside > div > div > button.btn.btn-primary.btn-large').click();
      });
    it('Test Case 3: Perform type on input element', () => {
          cy.get('html.ng-scope > body > div.container.ng-scope > div.container-signin.ng-scope > div.flipper > div.backside > form.ng-pristine.ng-valid-email.ng-invalid.ng-invalid-required > div.container-input > input.first.form-control.ng-pristine.ng-untouched.ng-empty.ng-valid-email.ng-invalid.ng-invalid-required').type('Sample Input');
      });
    it('Test Case 4: Perform click on button element', () => {
          cy.get('html.ng-scope > body > div.container.ng-scope > div.container-signin.ng-scope > div.flipper > div.backside > form.ng-pristine.ng-valid-email.ng-invalid.ng-invalid-required > button.btn.btn-primary.btn-large.bottom-15px').click();
      });
  });