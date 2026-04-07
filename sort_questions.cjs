
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data/questions.json', 'utf8'));

// Sort questions by ID numerically (1, 2, 3...)
const sortedData = data.sort((a, b) => a.id - b.id);

fs.writeFileSync('src/data/questions.json', JSON.stringify(sortedData, null, 2), 'utf8');
console.log('Successfully sorted ' + sortedData.length + ' questions by ID.');
