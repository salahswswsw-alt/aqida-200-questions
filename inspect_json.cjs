
const fs = require('fs');
const data = fs.readFileSync('src/data/questions.json', 'utf8');
console.log('--- FIRST 1000 CHARS ---');
console.log(data.substring(0, 1000));
console.log('--- LAST 1000 CHARS ---');
console.log(data.substring(data.length - 1000));
try {
  JSON.parse(data);
  console.log('JSON IS VALID');
} catch (e) {
  console.log('JSON ERROR:', e.message);
}
