import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw, Trophy, ChevronLeft, ChevronRight, Home, ShieldCheck } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { useNotification } from '../contexts/NotificationContext';

type Phase = 'start' | 'question' | 'result';

const TOTAL = quizQuestions.length;

const Quiz = () => {
  const [phase, setPhase] = useState<Phase>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(TOTAL).fill(null));
  const { addNotification } = useNotification();

  const current = quizQuestions[currentIndex];
  // Smoother progress calculation
  const progress = ((currentIndex) / TOTAL) * 100;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase, currentIndex]);

  const handleStart = () => {
    setPhase('question');
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAnswers(Array(TOTAL).fill(null));
  };

  const handleSelect = useCallback((optionIndex: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
    if (optionIndex === current.correctAnswer) {
      setScore(s => s + 1);
    }
  }, [isAnswered, answers, currentIndex, current]);

  const handleNext = () => {
    if (currentIndex + 1 >= TOTAL) {
      setPhase('result');
      addNotification({
        type: 'success',
        title: 'اكتمل الاختبار!',
        message: `لقد حصلت على ${score} من ${TOTAL}`
      });
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const getOptionClass = (i: number) => {
    if (!isAnswered) return selectedAnswer === i ? 'quiz-option quiz-option--selected' : 'quiz-option';
    if (i === current.correctAnswer) return 'quiz-option quiz-option--correct';
    if (i === selectedAnswer && i !== current.correctAnswer) return 'quiz-option quiz-option--wrong';
    return 'quiz-option quiz-option--dim';
  };

  const getScoreLabel = () => {
    const pct = (score / TOTAL) * 100;
    if (pct >= 90) return { label: 'ممتاز! تبارك الله', color: '#22c55e' };
    if (pct >= 75) return { label: 'جيد جداً، أحسنت', color: '#0ea5e9' };
    if (pct >= 60) return { label: 'جيد، استمر في المراجعة', color: '#f59e0b' };
    return { label: 'تحتاج مراجعة أكثر للكتاب', color: '#ef4444' };
  };

  if (phase === 'start') {
    return (
      <div className="quiz-start" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div className="auth-icon-wrapper" style={{ width: '80px', height: '80px', marginBottom: '2rem' }}>
          <ShieldCheck size={42} />
        </div>
        <h1 className="auth-title">اختبر عقيدتك</h1>
        <p className="auth-subtitle" style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          اختبر معلوماتك في العقيدة الإسلامية من خلال {TOTAL} سؤالاً شاملًا.
          منهج أهل السنة والجماعة بأسلوب السؤال والجواب.
        </p>
        <div className="stats-container" style={{ margin: '2rem 0' }}>
          <div className="stat-item">
            <div className="stat-number">{TOTAL}</div>
            <div className="stat-label">سؤالاً</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">خيارات</div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleStart} style={{ padding: '1.25rem 3.5rem', fontSize: '1.2rem' }}>
          <ShieldCheck size={22} style={{ marginLeft: '8px' }} />
          ابدأ الاختبار الآن
        </button>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/dashboard" className="auth-link">العودة للوحة التحكم</Link>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const { label, color } = getScoreLabel();
    const pct = Math.round((score / TOTAL) * 100);
    return (
      <div className="quiz-result">
        <div className="quiz-result-trophy" style={{ color }}>
          <Trophy size={64} />
        </div>
        <h1 className="auth-title">انتهى الاختبار!</h1>
        <div className="quiz-result-score-ring" style={{ borderColor: color }}>
          <span className="quiz-result-score-num" style={{ color }}>{score}</span>
          <span className="quiz-result-score-total">/{TOTAL}</span>
        </div>
        <p style={{ fontSize: '1.5rem', fontWeight: 800, color, marginBottom: '2rem' }}>{pct}% — {label}</p>

        <div className="quiz-result-stats" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ color: 'var(--color-success)', fontWeight: 700 }}>
            {score} صحيحة
          </div>
          <div style={{ color: 'var(--color-error)', fontWeight: 700 }}>
            {TOTAL - score} خاطئة
          </div>
        </div>

        <div className="quiz-result-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={handleStart}>
            <RotateCcw size={18} />
            إعادة الاختبار
          </button>
          <Link to="/dashboard" className="btn btn-outline">
            <Home size={18} />
            لوحة التحكم
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-progress-header">
        <span>السؤال {currentIndex + 1} من {TOTAL}</span>
        <span className="quiz-score-badge">النقاط: {score}</span>
      </div>

      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="quiz-card">
        <div className="quiz-question-number">س {currentIndex + 1}</div>
        <h2 className="quiz-question-text">{current.question}</h2>

        <div className="quiz-options">
          {current.options.map((opt, i) => (
            <button
              key={i}
              className={getOptionClass(i)}
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
            >
              <span className="quiz-option-letter">
                {['أ', 'ب', 'ج', 'د'][i]}
              </span>
              <span className="quiz-option-text">{opt}</span>
              {isAnswered && i === current.correctAnswer && (
                <CheckCircle size={20} className="quiz-option-icon" style={{ color: 'var(--color-success)', marginRight: 'auto' }} />
              )}
              {isAnswered && i === selectedAnswer && i !== current.correctAnswer && (
                <XCircle size={20} className="quiz-option-icon" style={{ color: 'var(--color-error)', marginRight: 'auto' }} />
              )}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className={`quiz-explanation ${selectedAnswer === current.correctAnswer ? 'quiz-explanation--correct' : 'quiz-explanation--wrong'}`}>
            <div className="quiz-explanation-header">
              {selectedAnswer === current.correctAnswer ? 'إجابة صحيحة! 🎉' : `الإجابة الصحيحة هي: ${current.options[current.correctAnswer]}`}
            </div>
            <p className="quiz-explanation-text">{current.explanation}</p>
          </div>
        )}
      </div>

      <div className="quiz-nav">
        <Link to="/dashboard" className="btn btn-outline">
          <ChevronRight size={18} />
          خروج
        </Link>
        {isAnswered && (
          <button className="btn btn-primary" onClick={handleNext}>
            {currentIndex + 1 >= TOTAL ? 'عرض النتيجة' : 'السؤال التالي'}
            <ChevronLeft size={18} style={{ marginRight: '8px' }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
