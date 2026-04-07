
const fs = require('fs');
let data = fs.readFileSync('src/data/questions.json', 'utf8');

// A better way: replace literal newlines that are inside double quotes.
// Since JSON strings can contain escaped characters, we need to be careful.
// Let's use a simple state machine to find characters inside quotes.

let fixed = '';
let inString = false;
let escaped = false;

for (let i = 0; i < data.length; i++) {
  const char = data[i];
  const code = data.charCodeAt(i);

  if (char === '"' && !escaped) {
    inString = !inString;
    fixed += char;
  } else if (char === '\\' && inString) {
    escaped = !escaped;
    fixed += char;
  } else {
    escaped = false;
    if (inString && code < 32) {
      // Literal control character inside string! Escape it.
      if (code === 10) fixed += '\\n';
      else if (code === 13) fixed += '\\r';
      else if (code === 9) fixed += '\\t';
      else {
          // Ignore other control chars
          console.log('Skipping control char', code, 'at position', i);
      }
    } else {
      fixed += char;
    }
  }
}

try {
  const parsed = JSON.parse(fixed);
  // Re-stringify with formatting for better look
  const formatted = JSON.stringify(parsed, null, 2);
  fs.writeFileSync('src/data/questions.json', formatted, 'utf8');
  console.log('Successfully fixed, formatted, and saved JSON');
} catch (e) {
  console.log('Still failing to parse:', e.message);
  // Find where it's failing
  const pos = e.message.match(/at position (\d+)/);
  if (pos) {
    const p = parseInt(pos[1]);
    console.log('Snippet around error:', fixed.substring(Math.max(0, p-50), p+50));
  }
}
