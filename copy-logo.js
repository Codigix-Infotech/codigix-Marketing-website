const fs = require('fs');

try {
  fs.copyFileSync(
    'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\51cb5d98-44b5-4fca-8dbd-eea1de359912\\.user_uploaded\\media_1789988553490.png',
    'public/logo.png'
  );
  console.log('Copied successfully!');
} catch (e) {
  console.error(e);
}
