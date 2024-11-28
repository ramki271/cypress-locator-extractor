describe('Verify Username Field with Dynamic Locator Adaptation', () => {
    it('should dynamically locate and interact with the username field', () => {
      cy.fixture('locators_with_dataqa_map.json').then((locators) => {
        const locatorEntry = Object.values(locators).find((locator) =>
          computeSimilarityScore(locator, { id: 'username', 'data-qa': 'username' })
        );
  
        if (!locatorEntry) {
          throw new Error('Locator for username field not found in JSON');
        }
  
        const usernameLocator = locatorEntry.cssSelector;
  
        cy.visit('http://localhost:3003/dom_structure.html');
  
        cy.get(usernameLocator).should('be.visible').type('testuser');
      });
  
      function computeSimilarityScore(locator, target) {
        let score = 0;
  
        if (locator.id && locator.id === target.id) score += 5;
        if (locator['data-qa'] && locator['data-qa'] === target['data-qa']) score += 5;
        if (locator.tag === target.tag) score += 3;
        if (locator.class === target.class) score += 2;
  
        return score >= 5; // Return true if score meets threshold
      }
    });
  });
  