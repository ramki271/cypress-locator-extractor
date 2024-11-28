const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, '_');
  const dynamicFileName = `body_content_${timestamp}.html`;

  // Correctly point to the 'cypress/fixtures' directory
  const fixturesDir = path.resolve(__dirname, '../cypress/fixtures'); // Adjust this to match your actual structure
  const filePath = path.join(fixturesDir, dynamicFileName);

  try {
    // Ensure the directory exists
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
      console.log(`Created directory: ${fixturesDir}`);
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Replace with the URL of the webpage
    await page.goto('https://preprod.artemishealth.com/auth/login');

    // Extract the <body> tag and its contents
    const bodyWithTag = await page.evaluate(() => document.body.outerHTML);

    // Write the <body> tag and its contents to the dynamically named file
    fs.writeFileSync(filePath, bodyWithTag, 'utf8');
    console.log(`Body tag and its contents saved to ${filePath}`);

    // Output the dynamic file name for Cypress to use
    console.log(`Dynamic File Name: ${dynamicFileName}`);

    await browser.close();
  } catch (err) {
    console.error(`Error occurred: ${err.message}`);
    console.error(err);
    process.exit(1); // Exit with error code
  }
})();
