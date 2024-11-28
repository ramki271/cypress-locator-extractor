const fs = require('fs');
const path = require('path');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        // Task to read the latest dynamically generated file
        readLatestFile() {
          const fixturesDir = path.resolve(__dirname, 'cypress/fixtures');
          const files = fs.readdirSync(fixturesDir);

          // Find the latest file matching the pattern
          const matchingFiles = files.filter((file) => file.startsWith('body_content_') && file.endsWith('.html'));
          if (matchingFiles.length === 0) {
            throw new Error('No matching body content files found in the fixtures directory.');
          }

          // Sort files by creation date and pick the latest
          const latestFile = matchingFiles
            .map((file) => ({
              file,
              time: fs.statSync(path.join(fixturesDir, file)).mtime.getTime(),
            }))
            .sort((a, b) => b.time - a.time)[0].file;

          console.log(`Latest file found: ${latestFile}`);
          return latestFile;
        },

        // Task to read the content of a specific file
        readFile(fileName) {
          const filePath = path.resolve(__dirname, 'cypress/fixtures', fileName);
          console.log(`Reading file from: ${filePath}`);

          if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            throw new Error(`File not found: ${filePath}`);
          }

          return fs.readFileSync(filePath, 'utf8');
        },

        // Task to ensure a file exists, creating it if necessary
        ensureFileExists(filePath) {
          const absolutePath = path.resolve(__dirname, filePath); // Resolve the full path
          if (!fs.existsSync(absolutePath)) {
            fs.writeFileSync(absolutePath, '{}', 'utf8'); // Create file with default content {}
            console.log(`${absolutePath} created with default content {}`);
            return `${absolutePath} created with default content {}`;
          }
          console.log(`${absolutePath} already exists.`);
          return `${absolutePath} already exists.`;
        },

        // Task to delete a specific file
        deleteFile(fileName) {
          const filePath = path.resolve(__dirname, 'cypress/fixtures', fileName);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file
            console.log(`File deleted: ${filePath}`);
            return `File deleted: ${filePath}`;
          }
          console.log(`File not found, so not deleted: ${filePath}`);
          return `File not found, so not deleted: ${filePath}`;
        },
      });
    },
    fixturesFolder: 'cypress/fixtures',
    supportFile: 'cypress/support/e2e.js',
  },
};




