import fs from 'fs';
import translate from 'translate';

translate.engine = 'google';

const delay = ms => new Promise(res => setTimeout(res, ms));

async function translateQuestions() {
  console.log('Reading questions.json...');
  const data = JSON.parse(fs.readFileSync('./src/data/questions.json', 'utf8'));
  
  console.log(`Found ${data.length} questions. Translating...`);
  
  // We'll translate the first 5 questions just to test the API and rate limits
  for (let i = 0; i < 5; i++) {
    const q = data[i];
    console.log(`Translating question ${q.id}...`);
    try {
      q.question_en = await translate(q.question, { from: 'ar', to: 'en' });
      q.answer_en = await translate(q.answer, { from: 'ar', to: 'en' });
      q.category_en = await translate(q.category, { from: 'ar', to: 'en' });
      await delay(1000); // 1s delay to avoid rate limiting
    } catch (err) {
      console.error(`Error translating question ${q.id}:`, err);
    }
  }
  
  fs.writeFileSync('./src/data/questions_translated.json', JSON.stringify(data, null, 2));
  console.log('Saved partial translated data to questions_translated.json');
}

translateQuestions();
