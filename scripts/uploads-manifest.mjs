/* Writes src/data/uploads-manifest.json: every file under public/wp-content/uploads.
   The article renderer prunes srcset candidates that aren't in it (WordPress
   resized variants that were never migrated 403 and break the image on retina
   screens). Runs before every build; commit the output so tsc/dev have it too. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.join(process.cwd(), 'public', 'wp-content', 'uploads');
const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else files.push('/' + path.relative(path.join(process.cwd(), 'public'), full).split(path.sep).join('/'));
  }
})(root);
files.sort();
fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'uploads-manifest.json'), JSON.stringify(files) + '\n');
console.log(`uploads-manifest: ${files.length} files`);
