const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
}

const files = getAllFiles(directoryPath);

// Regex to match font sizes and weights including responsive prefixes (e.g. sm:text-2xl)
const sizeWeightRegex = /(?:sm:|md:|lg:|xl:|2xl:)?(?:text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[.*?\])|font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black))\s*/g;

const standardClasses = {
  h1: 'text-4xl md:text-5xl font-bold ',
  h2: 'text-3xl md:text-4xl font-bold ',
  h3: 'text-2xl md:text-3xl font-semibold ',
  h4: 'text-xl md:text-2xl font-semibold ',
  h5: 'text-lg font-semibold ',
  h6: 'text-base font-semibold ',
  p: 'text-base font-normal ',
  span: 'text-base font-normal ',
  a: 'text-base font-medium '
};

let modifiedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  Object.keys(standardClasses).forEach(tag => {
    // This regex looks for `<tag className="..."`
    const tagRegex = new RegExp(`(<${tag}\\s+[^>]*className=["'\`])([^"'\`]*)`, 'g');
    
    content = content.replace(tagRegex, (match, prefix, classString) => {
      // Remove all sizing/weight classes
      let newClassString = classString.replace(sizeWeightRegex, '');
      // Clean up multiple spaces
      newClassString = newClassString.replace(/\s+/g, ' ').trim();
      
      // If the tag is an anchor or span, only apply the standard classes if they aren't part of a special component.
      // Wait, let's just prepend the standard class to ensure uniformity.
      newClassString = standardClasses[tag] + newClassString;
      return prefix + newClassString;
    });
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedFiles++;
  }
});

console.log(`Updated ${modifiedFiles} files.`);
