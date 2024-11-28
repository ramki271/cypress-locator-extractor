describe('Verify Username Field Visibility', () => {
    it('should verify that the username field is visible', () => {
      // Load the locators from the JSON file
      cy.fixture('locators_with_dataqa.json').then((locators) => {
        const usernameLocator = locators.username.cssSelector; // Access the username field CSS Selector
  
        // Visit the webpage (replace with your URL)
        cy.visit('https://preprod.artemishealth.com/auth/login');
  
        // Assert that the username field is visible
        cy.get(usernameLocator).should('be.visible');
      });
    });
  });
  