const fs = require('fs');
const path = require('path');

const cssPath = path.resolve(__dirname, '..', 'dist', 'smartbanner.css');
const outPath = path.resolve(__dirname, '..', 'src', 'smartbanner-styles.js');

const css = fs.readFileSync(cssPath, 'utf8');

fs.writeFileSync(outPath, `export default ${JSON.stringify(css)};\n`);
