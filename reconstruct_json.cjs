
const fs = require('fs');

function fixJson() {
    let rawData = fs.readFileSync('src/data/questions.json', 'utf8');
    
    // We want to extract all complete { ... } objects that look like questions.
    // Given the file is messy, we'll search for patterns like "id": N
    
    const results = [];
    const seenIds = new Set();
    
    // Pattern to find objects. This is tricky because content can contain braces.
    // However, most questions have "id", "question", "answer", "category".
    
    // Let's try to find all "id": \d+ and extract the surrounding object.
    const idMatches = [...rawData.matchAll(/"id":\s*(\d+)/g)];
    
    for (const match of idMatches) {
        const id = parseInt(match[1]);
        const startPos = match.index;
        
        // Find the start of this object { before the "id"
        let objStart = rawData.lastIndexOf('{', startPos);
        if (objStart === -1) continue;
        
        // Find the end of this object } after the "id"
        // This is hard because of nested braces or truncated content.
        // We'll look for the next "id" or the end of the file/array.
        
        // Let's try to find a valid closing brace by counting.
        let objEnd = -1;
        let braceCount = 0;
        for (let i = objStart; i < rawData.length; i++) {
            if (rawData[i] === '{') braceCount++;
            else if (rawData[i] === '}') {
                braceCount--;
                if (braceCount === 0) {
                    objEnd = i + 1;
                    break;
                }
            }
        }
        
        if (objEnd !== -1) {
            let objStr = rawData.substring(objStart, objEnd);
            try {
                // Fix potential literal newlines in the string before parsing
                let fixedObjStr = '';
                let inString = false;
                let escaped = false;
                for (let j = 0; j < objStr.length; j++) {
                    const char = objStr[j];
                    const code = objStr.charCodeAt(j);
                    if (char === '"' && !escaped) { inString = !inString; fixedObjStr += char; }
                    else if (char === '\\' && inString) { escaped = !escaped; fixedObjStr += char; }
                    else {
                        escaped = false;
                        if (inString && code < 32) {
                            if (code === 10) fixedObjStr += '\\n';
                            else if (code === 13) fixedObjStr += '\\r';
                            else if (code === 9) fixedObjStr += '\\t';
                        } else fixedObjStr += char;
                    }
                }
                
                const obj = JSON.parse(fixedObjStr);
                if (obj.id && obj.question && obj.answer) {
                    // Avoid duplicates, prefer later ones or something?
                    // Actually, if we see the same ID twice, let's keep the one with longer answer.
                    const existing = results.find(r => r.id === obj.id);
                    if (existing) {
                        if (obj.answer.length > existing.answer.length) {
                            results[results.indexOf(existing)] = obj;
                        }
                    } else {
                        results.push(obj);
                    }
                }
            } catch (e) {
                console.log(`Failed to parse object for ID ${id} near pos ${startPos}: ${e.message}`);
                // If it's the truncated ID 39, we'll handle it specially if needed.
            }
        }
    }
    
    // Sort by ID
    results.sort((a, b) => a.id - b.id);
    
    console.log(`Found ${results.length} valid questions.`);
    
    // Check for gaps
    const ids = results.map(r => r.id);
    const gaps = [];
    for (let i = 1; i <= Math.max(...ids); i++) {
        if (!ids.includes(i)) gaps.push(i);
    }
    if (gaps.length > 0) console.log('Gaps in IDs:', gaps.join(', '));
    
    fs.writeFileSync('src/data/questions.json', JSON.stringify(results, null, 2), 'utf8');
    console.log('Saved fixed JSON to src/data/questions.json');
}

fixJson();
