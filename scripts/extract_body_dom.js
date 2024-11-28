const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Replace with the URL of the webpage
  await page.goto('https://preprod.artemishealth.com/auth/login');

  // Extract the <body> tag and its contents
  const bodyWithTag = await page.evaluate(() => document.body.outerHTML);

  // Save the <body> tag and its contents to a file
  fs.writeFileSync('cypress/fixtures/body_with_tag.html', bodyWithTag, 'utf8');

  await browser.close();
  console.log('Body tag and its contents saved to cypress/fixtures/body_with_tag.html');
})();
