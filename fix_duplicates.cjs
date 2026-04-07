
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data/questions.json', 'utf8'));

// Filter to keep unique IDs
const uniqueData = [];
const seenIds = new Set();

for (const q of data) {
    if (!seenIds.has(q.id)) {
        uniqueData.push(q);
        seenIds.add(q.id);
    }
}

// Ensure the order is as requested: new ones at top, then the rest.
// Wait, the user said "Add the new questions ... ABOVE the existing questions".
// So I'll just sort them? No, that would put 1 first.
// I'll manually construct the order: [76-90, 1-75].

const batch76to90 = uniqueData.filter(q => q.id >= 76 && q.id <= 90);
const batch1to75 = uniqueData.filter(q => q.id >= 1 && q.id <= 75);

const finalData = [...batch76to90, ...batch1to75];

fs.writeFileSync('src/data/questions.json', JSON.stringify(finalData, null, 2), 'utf8');
console.log('Fixed duplicates. Result count: ' + finalData.length);
