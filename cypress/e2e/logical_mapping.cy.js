// describe('Sync Locators with DOM Changes Dynamically', () => {
//     it('should dynamically map and sync locators with structural changes', () => {
//       cy.task('readFile', 'cypress-locator-extractor/cypress/fixtures/dom_structure.html').then((domContent) => {
//         const parser = new DOMParser();
//         const document = parser.parseFromString(domContent, 'text/html');
//         const bodyElements = Array.from(document.body.querySelectorAll('*'));
  
//         cy.fixture('locators_with_dataqa_map_body.json').then((existingLocators) => {
//           const updatedLocators = {};
//           const matchedKeys = new Set();
  
//           bodyElements.forEach((el) => {
//             // Find the best match for the current element in the existing locators
//             const bestMatchKey = findBestMatch(el, existingLocators, matchedKeys);
  
//             if (bestMatchKey) {
//               // Update existing locator
//               updatedLocators[bestMatchKey] = {
//                 ...existingLocators[bestMatchKey],
//                 tag: el.tagName.toLowerCase(),
//                 id: el.id || null,
//                 class: el.className || null,
//                 name: el.name || null,
//                 'data-qa': el.getAttribute('data-qa') || null,
//                 xpath: generateXPath(el),
//                 cssSelector: generateCssSelector(el),
//               };
//               matchedKeys.add(bestMatchKey);
//             } else {
//               // Add new locator
//               const logicalName = generateLogicalName(el);
//               updatedLocators[logicalName] = {
//                 tag: el.tagName.toLowerCase(),
//                 id: el.id || null,
//                 class: el.className || null,
//                 name: el.name || null,
//                 'data-qa': el.getAttribute('data-qa') || null,
//                 xpath: generateXPath(el),
//                 cssSelector: generateCssSelector(el),
//               };
//             }
//           });
  
//           // Save updated locators to JSON
//           cy.writeFile('cypress/fixtures/locators_with_dataqa_map.json', updatedLocators);
//         });
  
//         function findBestMatch(el, locators, matchedKeys) {
//           let bestMatch = null;
//           let bestScore = 0;
  
//           Object.keys(locators).forEach((key) => {
//             if (matchedKeys.has(key)) return; // Skip already matched keys
  
//             const locator = locators[key];
//             const score = computeSimilarityScore(el, locator);
  
//             if (score > bestScore) {
//               bestMatch = key;
//               bestScore = score;
//             }
//           });
  
//           return bestMatch;
//         }
  
//         function computeSimilarityScore(el, locator) {
//           let score = 0;
  
//           if (locator.tag === el.tagName.toLowerCase()) score += 3;
//           if (locator.id && locator.id === el.id) score += 5;
//           if (locator['data-qa'] && locator['data-qa'] === el.getAttribute('data-qa')) score += 5;
//           if (locator.class && locator.class === el.className) score += 2;
  
//           return score;
//         }
  
//         function generateLogicalName(el) {
//           if (el.id) return el.id;
//           if (el.getAttribute('data-qa')) return el.getAttribute('data-qa');
//           if (el.name) return el.name;
//           if (el.className) return el.className.split(' ').join('_');
//           return `${el.tagName.toLowerCase()}_${Array.from(el.parentNode.children).indexOf(el) + 1}`;
//         }
  
//         function generateXPath(el) {
//           if (el.id) return `//*[@id="${el.id}"]`;
//           if (el === document.body) return '/html/body';
//           let ix = 0;
//           const siblings = el.parentNode ? el.parentNode.childNodes : [];
//           for (let i = 0; i < siblings.length; i++) {
//             const sibling = siblings[i];
//             if (sibling === el) {
//               return generateXPath(el.parentNode) + '/' + el.tagName.toLowerCase() + `[${ix + 1}]`;
//             }
//             if (sibling.nodeType === 1 && sibling.tagName === el.tagName) ix++;
//           }
//         }
  
//         function generateCssSelector(el) {
//           let path = [];
//           while (el.parentNode) {
//             let selector = el.tagName.toLowerCase();
//             if (el.id) {
//               selector += `#${el.id}`;
//               path.unshift(selector);
//               break;
//             }
//             if (el.className) {
//               selector += `.${el.className.trim().replace(/\s+/g, '.')}`;
//             }
//             path.unshift(selector);
//             el = el.parentNode;
//           }
//           return path.join(' > ');
//         }
//       });
//     });
//   });
  

describe('Sync Locators with DOM Changes Dynamically', () => {
    it('should dynamically map and sync locators with structural changes', () => {
      const locatorsFilePath = 'cypress/fixtures/locators_with_dataqa_map_body.json';
  
      // Ensure the JSON file exists, creating it with default content if necessary
      cy.task('ensureFileExists', locatorsFilePath).then(() => {
        cy.task('readFile', 'cypress-locator-extractor/cypress/fixtures/dom_structure.html').then((domContent) => {
          const parser = new DOMParser();
          const document = parser.parseFromString(domContent, 'text/html');
          const bodyElements = Array.from(document.body.querySelectorAll('*'));
  
          cy.fixture('locators_with_dataqa_map_body.json').then((existingLocators) => {
            const updatedLocators = {};
            const matchedKeys = new Set();
  
            bodyElements.forEach((el) => {
              // Find the best match for the current element in the existing locators
              const bestMatchKey = findBestMatch(el, existingLocators, matchedKeys);
  
              if (bestMatchKey) {
                // Update existing locator
                updatedLocators[bestMatchKey] = {
                  ...existingLocators[bestMatchKey],
                  tag: el.tagName.toLowerCase(),
                  id: el.id || null,
                  class: el.className || null,
                  name: el.name || null,
                  'data-qa': el.getAttribute('data-qa') || null,
                  xpath: generateXPath(el),
                  cssSelector: generateCssSelector(el),
                };
                matchedKeys.add(bestMatchKey);
              } else {
                // Add new locator
                const logicalName = generateLogicalName(el);
                updatedLocators[logicalName] = {
                  tag: el.tagName.toLowerCase(),
                  id: el.id || null,
                  class: el.className || null,
                  name: el.name || null,
                  'data-qa': el.getAttribute('data-qa') || null,
                  xpath: generateXPath(el),
                  cssSelector: generateCssSelector(el),
                };
              }
            });
  
            // Save updated locators to JSON
            cy.writeFile('cypress/fixtures/locators_with_dataqa_map_body.json', updatedLocators);
          });
  
          function findBestMatch(el, locators, matchedKeys) {
            let bestMatch = null;
            let bestScore = 0;
  
            Object.keys(locators).forEach((key) => {
              if (matchedKeys.has(key)) return; // Skip already matched keys
  
              const locator = locators[key];
              const score = computeSimilarityScore(el, locator);
  
              if (score > bestScore) {
                bestMatch = key;
                bestScore = score;
              }
            });
  
            return bestMatch;
          }
  
          function computeSimilarityScore(el, locator) {
            let score = 0;
  
            if (locator.tag === el.tagName.toLowerCase()) score += 3;
            if (locator.id && locator.id === el.id) score += 5;
            if (locator['data-qa'] && locator['data-qa'] === el.getAttribute('data-qa')) score += 5;
            if (locator.class && locator.class === el.className) score += 2;
  
            return score;
          }
  
          function generateLogicalName(el) {
            if (el.id) return el.id;
            if (el.getAttribute('data-qa')) return el.getAttribute('data-qa');
            if (el.name) return el.name;
            if (el.className) return el.className.split(' ').join('_');
            return `${el.tagName.toLowerCase()}_${Array.from(el.parentNode.children).indexOf(el) + 1}`;
          }
  
          function generateXPath(el) {
            if (el.id) return `//*[@id="${el.id}"]`;
            if (el === document.body) return '/html/body';
            let ix = 0;
            const siblings = el.parentNode ? el.parentNode.childNodes : [];
            for (let i = 0; i < siblings.length; i++) {
              const sibling = siblings[i];
              if (sibling === el) {
                return generateXPath(el.parentNode) + '/' + el.tagName.toLowerCase() + `[${ix + 1}]`;
              }
              if (sibling.nodeType === 1 && sibling.tagName === el.tagName) ix++;
            }
          }
  
          function generateCssSelector(el) {
            let path = [];
            while (el.parentNode) {
              let selector = el.tagName.toLowerCase();
              if (el.id) {
                selector += `#${el.id}`;
                path.unshift(selector);
                break;
              }
              if (el.className) {
                selector += `.${el.className.trim().replace(/\s+/g, '.')}`;
              }
              path.unshift(selector);
              el = el.parentNode;
            }
            return path.join(' > ');
          }
        });
      });
    });
  });
  
  // Add this task to `plugins/index.js` to handle file creation
  module.exports = (on, config) => {
    const fs = require('fs');
    on('task', {
      ensureFileExists(filePath) {
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, '{}', 'utf8');
          return `${filePath} created with default content {}`;
        }
        return `${filePath} already exists.`;
      },
    });
  };
  