import { watch, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import * as sass from 'sass';

const source = fileURLToPath(new URL('../src/smartbanner.scss', import.meta.url));
const target = fileURLToPath(new URL('../src/smartbanner-styles.js', import.meta.url));

function inline() {
  const { css } = sass.compile(source, { style: 'compressed' });
  writeFileSync(target, `export default ${JSON.stringify(css)};\n`);
}

inline();

if (process.argv.includes('--watch')) {
  watch(source, inline);
}
