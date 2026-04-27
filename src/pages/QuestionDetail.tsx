import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import questions from '../data/questions.json';
import { useLanguage } from '../contexts/LanguageContext';

const QuestionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language, dir } = useLanguage();
  
  const questionId = id ? parseInt(id) : 1;
  const currentIndex = questions.findIndex(q => q.id === questionId);
  const question = questions[currentIndex];

  const translateCategory = (cat: string) => {
    if (language === 'ar') return cat;
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

  return (
    <div className="detail-container">
      <button onClick={() => navigate('/questions')} className="back-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1.1rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <BackIcon size={20} />
        {t('questions.back')}
      </button>

      <div className="detail-card">
        <div className="detail-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="question-badge">{question.id}</div>
          <span className="question-category">{translateCategory(question.category)}</span>
        </div>
        
        <h1 className="detail-title" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.4, color: 'var(--color-white)', textAlign: language === 'ar' ? 'right' : 'left' }}>
          {language === 'ar' ? question.question : `Question ${question.id}: (Translated Summary Available Below)`}
        </h1>
        
        <div className="detail-answer" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
          <p>{language === 'ar' ? question.answer : "Full translation of this question's answer is coming soon. Please refer to the Arabic text for authentic content."}</p>
          {language === 'en' && (
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--color-sky-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-sky-border)' }}>
              <h4 style={{ color: 'var(--color-sky)', marginBottom: '0.5rem' }}>Original Arabic Text:</h4>
              <p style={{ direction: 'rtl', textAlign: 'right' }}>{question.question}</p>
              <hr style={{ margin: '1rem 0', opacity: 0.1 }} />
              <p style={{ direction: 'rtl', textAlign: 'right' }}>{question.answer}</p>
            </div>
          )}
        </div>
      </div>

      <div className="nav-buttons" style={{ flexDirection: dir === 'rtl' ? 'row' : 'row' }}>
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
            {relatedQuestions.map(q => (
              <Link to={`/question/${q.id}`} key={q.id} className="question-card">
                <div className="question-header" style={{ justifyContent: 'space-between' }}>
                  <span className="question-category">{translateCategory(q.category)}</span>
                  <div className="question-badge">{q.id}</div>
                </div>
                <h3 className="question-title">{language === 'ar' ? q.question : `Question ${q.id}`}</h3>
                <p className="question-excerpt">{language === 'ar' ? q.answer : "View Details"}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;
