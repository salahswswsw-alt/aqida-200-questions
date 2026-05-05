import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import questionsTranslated from '../data/questions_translated.json';
import { questionsEn } from '../data/questionsEn';
import { useLanguage } from '../contexts/LanguageContext';

// Type for our translated questions
interface TranslatedQuestion {
  id: number;
  question: string;
  answer: string;
  category: string;
  question_en?: string;
  answer_en?: string;
  category_en?: string;
}

const questions = questionsTranslated as TranslatedQuestion[];

const QuestionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language, dir } = useLanguage();
  
  const questionId = id ? parseInt(id) : 1;
  const currentIndex = questions.findIndex(q => q.id === questionId);
  const question = questions[currentIndex];

  // English data from the dedicated translation dictionary
  const enData = questionsEn[questionId as keyof typeof questionsEn];

  const translateCategory = (cat: string, catEn?: string) => {
    if (language === 'ar') return cat;
    // Prefer enData category, then catEn field, then mapping
    if (enData?.category) return enData.category;
    if (catEn) return catEn;
    const mapping: Record<string, string> = {
      'توحيد وعبادة': 'Tawhid & Worship',
      'مراتب الدين والإسلام': 'Ranks of Religion & Islam',
      'شهادة أن لا إله إلا الله': 'Testimony of Faith',
      'أركان الإسلام': 'Pillars of Islam',
      'الإيمان': 'Faith (Iman)',
      'الإيمان بالله': 'Belief in Allah',
      'توحيد الأسماء والصفات': 'Tawhid of Names & Attributes',
      'صفات الذات': 'Attributes of Essence',
      'صفات الأفعال': 'Attributes of Action',
      'الملائكة': 'Angels',
      'الإيمان بالكتب': 'Belief in Books',
      'الإيمان بالرسل': 'Belief in Messengers',
      'الإيمان باليوم الآخر': 'Belief in Last Day',
    };
    return mapping[cat] || cat;
  };

  if (!question) {
    return (
      <div className="text-center mt-4 detail-container" style={{ minHeight: '50vh' }}>
        <h2 className="detail-title">{t('questions.not_found')}</h2>
        <Link to="/questions" className="btn btn-primary mt-4">{t('questions.back')}</Link>
      </div>
    );
  }

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < questions.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      navigate(`/question/${questions[currentIndex - 1].id}`);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      navigate(`/question/${questions[currentIndex + 1].id}`);
    }
  };

  const relatedQuestions = questions
    .filter(q => q.category === question.category && q.id !== question.id)
    .slice(0, 2);

  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;
  const PrevIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;
  const NextIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Get display content based on language
  // Priority: questionsEn dict → question_en/answer_en field in JSON → Arabic text
  const displayQuestion = language === 'ar'
    ? question.question
    : (enData?.question || question.question_en || question.question);

  const displayAnswer = language === 'ar'
    ? question.answer
    : (enData?.answer || question.answer_en || question.answer);

  const displayCategory = translateCategory(question.category, question.category_en);

  return (
    <div className="detail-container">
      <button onClick={() => navigate('/questions')} className="back-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1.1rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <BackIcon size={20} />
        {t('questions.back')}
      </button>

      <div className="detail-card">
        <div className="detail-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="question-badge">{question.id}</div>
          <span className="question-category">{displayCategory}</span>
        </div>
        
        <h1 className="detail-title" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.4, color: 'var(--color-white)', textAlign: language === 'ar' ? 'right' : 'left' }}>
          {displayQuestion}
        </h1>
        
        <div className="detail-answer" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
          <p style={{ direction: language === 'ar' ? 'rtl' : 'ltr', lineHeight: 1.9 }}>
            {displayAnswer}
          </p>
        </div>
      </div>

      <div className="nav-buttons">
        {hasPrev ? (
          <button onClick={handlePrev} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PrevIcon size={20} />
            {t('questions.prev')}
          </button>
        ) : <div />}
        
        {hasNext ? (
          <button onClick={handleNext} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {t('questions.next')}
            <NextIcon size={20} />
          </button>
        ) : <div />}
      </div>

      {relatedQuestions.length > 0 && (
        <div style={{ marginTop: '5rem' }}>
          <h3 className="section-title" style={{ fontSize: '1.75rem', textAlign: language === 'ar' ? 'right' : 'left', marginBottom: '2rem' }}>
            {language === 'ar' ? <>أسئلة <span className="highlight">مشابهة</span></> : <>Similar <span className="highlight">Questions</span></>}
          </h3>
          <div className="questions-grid">
          {relatedQuestions.map(q => {
              const tq = q as TranslatedQuestion;
              const relEnData = questionsEn[tq.id as keyof typeof questionsEn];
              const relatedDisplayQ = language === 'ar'
                ? tq.question
                : (relEnData?.question || tq.question_en || tq.question);
              const relatedDisplayA = language === 'ar'
                ? tq.answer.slice(0, 100) + '...'
                : (relEnData?.answer
                    ? relEnData.answer.slice(0, 100) + '...'
                    : tq.answer_en
                      ? tq.answer_en.slice(0, 100) + '...'
                      : tq.answer.slice(0, 100) + '...');
              const relCat = language === 'ar'
                ? tq.category
                : (relEnData?.category || tq.category_en || translateCategory(tq.category, tq.category_en));

              return (
                <Link to={`/question/${tq.id}`} key={tq.id} className="question-card">
                  <div className="question-header" style={{ justifyContent: 'space-between' }}>
                    <span className="question-category">{relCat}</span>
                    <div className="question-badge">{tq.id}</div>
                  </div>
                  <h3 className="question-title">{relatedDisplayQ}</h3>
                  <p className="question-excerpt">{relatedDisplayA}</p>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;
