import fs from 'fs';

const data = fs.readFileSync('src/data/questions.json', 'utf8');

// Strategy: 
// 1. The first array (lines 2-396) has IDs 1-39, 50-75 (valid JSON up to the control char at line 234)
// 2. The second section (lines 397-472) has IDs 41-50 (duplicates and extras)
// 3. We need to combine them properly

// Let's use a different approach - parse the file in sections
// First, let's clean up the answer field at line 234 that has the control character

const lines = data.split('\n');

// Fix line 234 - find and escape any unescaped control chars in the answer string
let fixedLine234 = lines[233];
// The answer value has literal newlines from \n in the JSON string value
// The issue is that there's a raw control character somewhere
// Let's check each character
let fixedChars = '';
for (let i = 0; i < fixedLine234.length; i++) {
  const code = fixedLine234.charCodeAt(i);
  if (code < 32 && code !== 9) {
    // Replace control chars with escaped versions
    if (code === 10) fixedChars += '\\n';
    else if (code === 13) fixedChars += '\\r';
    else fixedChars += ''; // skip other control chars
  } else {
    fixedChars += fixedLine234[i];
  }
}

// Check if line 234 ends properly
const output = [];
output.push(`Original line 234 length: ${lines[233].length}`);
output.push(`Fixed line 234 length: ${fixedChars.length}`);
output.push(`Original ends with: charCode=${lines[233].charCodeAt(lines[233].length-1)}`);
output.push(`Next line (235) starts with ID 50 - this means line 234 is missing the closing quote, comma, etc`);

// The problem: line 234 starts the "answer" for id=39 but doesn't close properly
// It goes: "answer": "..." then the next line is id=50, meaning question 39's answer 
// is truncated and missing the closing quote, comma, and the category field and closing brace

// Let me check if the answer string literally ends at the end of line 234
output.push(`Line 234 last 30 chars (safe):`);
const last30 = [];
for (let i = Math.max(0, lines[233].length - 30); i < lines[233].length; i++) {
  const c = lines[233].charCodeAt(i);
  if (c >= 32 && c < 127) last30.push(lines[233][i]);
  else last30.push(`[${c}]`);
}
output.push(last30.join(''));

// Check what's between line 234 and 235
output.push(`\nLine 234 full (safe last 50 chars):`);
const tail = [];
for (let i = Math.max(0, lines[233].length - 50); i < lines[233].length; i++) {
  const c = lines[233].charCodeAt(i);
  if (c >= 32 && c < 127) tail.push(lines[233][i]);
  else tail.push(`[${c}]`);
}
output.push(tail.join(''));

// Check if id=39 answer closes properly
output.push(`\nLine 233 (question for 39): starts="${lines[232].substring(0,30)}"`);
output.push(`Line 234 (answer for 39 - first 50 chars safe):`);
const head234 = [];
for (let i = 0; i < Math.min(50, lines[233].length); i++) {
  const c = lines[233].charCodeAt(i);
  if (c >= 32 && c < 127) head234.push(lines[233][i]);
  else head234.push(`[${c}]`);
}
output.push(head234.join(''));

fs.writeFileSync('json_analysis3.txt', output.join('\n'), 'utf8');
console.log('Analysis 3 written');
