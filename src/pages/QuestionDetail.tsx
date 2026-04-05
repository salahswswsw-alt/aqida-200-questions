import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import questions from '../data/questions.json';

const QuestionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const questionId = id ? parseInt(id) : 1;
  const currentIndex = questions.findIndex(q => q.id === questionId);
  const question = questions[currentIndex];

  if (!question) {
    return (
      <div className="text-center mt-4 detail-container" style={{ minHeight: '50vh' }}>
        <h2 className="detail-title">السؤال غير موجود</h2>
        <Link to="/questions" className="btn btn-primary mt-4">العودة للأسئلة</Link>
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

  return (
    <div className="detail-container">
      <button onClick={() => navigate('/questions')} className="back-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '1.1rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <ArrowRight size={20} />
        العودة لجميع الأسئلة
      </button>

      <div className="detail-card">
        <div className="detail-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div className="question-badge">{question.id}</div>
          <span className="question-category">{question.category}</span>
        </div>
        
        <h1 className="detail-title" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', lineHeight: 1.4, color: 'var(--color-white)' }}>{question.question}</h1>
        
        <div className="detail-answer">
          <p>{question.answer}</p>
        </div>
      </div>

      <div className="nav-buttons">
        {hasPrev ? (
          <button onClick={handlePrev} className="btn btn-outline">
            <ArrowRight size={20} />
            السؤال السابق
          </button>
        ) : <div />}
        
        {hasNext ? (
          <button onClick={handleNext} className="btn btn-primary">
            السؤال التالي
            <ArrowLeft size={20} />
          </button>
        ) : <div />}
      </div>

      {relatedQuestions.length > 0 && (
        <div style={{ marginTop: '5rem' }}>
          <h3 className="section-title" style={{ fontSize: '1.75rem', textAlign: 'right', marginBottom: '2rem' }}>
            أسئلة <span className="highlight">مشابهة</span>
          </h3>
          <div className="questions-grid">
            {relatedQuestions.map(q => (
              <Link to={`/question/${q.id}`} key={q.id} className="question-card">
                <div className="question-header" style={{ justifyContent: 'space-between' }}>
                  <span className="question-category">{q.category}</span>
                  <div className="question-badge">{q.id}</div>
                </div>
                <h3 className="question-title">{q.question}</h3>
                <p className="question-excerpt">{q.answer}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;
