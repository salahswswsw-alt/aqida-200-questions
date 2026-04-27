import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, RotateCcw, Trophy, ChevronLeft, ChevronRight, Home, ShieldCheck } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { useNotification } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t, language, dir } = useLanguage();

  const current = quizQuestions[currentIndex];
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
        title: t('quiz.completed'),
        message: t('quiz.completed_msg').replace('{score}', score.toString()).replace('{total}', TOTAL.toString())
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
    if (pct >= 90) return { label: t('quiz.score_excellent'), color: '#22c55e' };
    if (pct >= 75) return { label: t('quiz.score_very_good'), color: '#0ea5e9' };
    if (pct >= 60) return { label: t('quiz.score_good'), color: '#f59e0b' };
    return { label: t('quiz.score_needs_review'), color: '#ef4444' };
  };

  const ArrowIconNext = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const ArrowIconExit = dir === 'rtl' ? ChevronRight : ChevronLeft;

  const getTranslatedQuestion = () => {
    if (language === 'ar') return {
      question: current.question,
      options: current.options,
      explanation: current.explanation
    };

    // Placeholder for translated quiz content
    // In a real app, this would come from a translated JSON or API
    return {
      question: `Question ${current.id}: (Translated Content Available in Arabic)`,
      options: current.options.map((_, i) => `Option ${['A', 'B', 'C', 'D'][i]}`),
      explanation: "Detailed explanation is available in the Arabic version."
    };
  };

  const translated = getTranslatedQuestion();

  if (phase === 'start') {
    return (
      <div className="quiz-start" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <div className="auth-icon-wrapper" style={{ width: '80px', height: '80px', marginBottom: '2rem', margin: '0 auto 2rem' }}>
          <ShieldCheck size={42} />
        </div>
        <h1 className="auth-title">{t('dash.quiz_title')}</h1>
        <p className="auth-subtitle" style={{ maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          {t('dash.quiz_desc')}
        </p>
        <div className="stats-container" style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <div className="stat-item">
            <div className="stat-number">{TOTAL}</div>
            <div className="stat-label">{t('quiz.questions')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">{t('quiz.options')}</div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleStart} style={{ padding: '1.25rem 3.5rem', fontSize: '1.2rem', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck size={22} />
          {t('dash.quiz_cta')}
        </button>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/dashboard" className="auth-link">{t('questions.back_to_dashboard') || (language === 'ar' ? 'العودة للوحة التحكم' : 'Back to Dashboard')}</Link>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const { label, color } = getScoreLabel();
    const pct = Math.round((score / TOTAL) * 100);
    return (
      <div className="quiz-result" style={{ textAlign: 'center' }}>
        <div className="quiz-result-trophy" style={{ color, margin: '0 auto 2rem' }}>
          <Trophy size={64} />
        </div>
        <h1 className="auth-title">{t('quiz.finished')}</h1>
        <div className="quiz-result-score-ring" style={{ borderColor: color, margin: '2rem auto' }}>
          <span className="quiz-result-score-num" style={{ color }}>{score}</span>
          <span className="quiz-result-score-total">/{TOTAL}</span>
        </div>
        <p style={{ fontSize: '1.5rem', fontWeight: 800, color, marginBottom: '2rem' }}>{pct}% — {label}</p>

        <div className="quiz-result-stats" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ color: 'var(--color-success)', fontWeight: 700 }}>
            {t('quiz.correct_count').replace('{count}', score.toString())}
          </div>
          <div style={{ color: 'var(--color-error)', fontWeight: 700 }}>
            {t('quiz.wrong_count').replace('{count}', (TOTAL - score).toString())}
          </div>
        </div>

        <div className="quiz-result-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={handleStart} style={{ gap: '0.5rem' }}>
            <RotateCcw size={18} />
            {t('quiz.restart')}
          </button>
          <Link to="/dashboard" className="btn btn-outline" style={{ gap: '0.5rem' }}>
            <Home size={18} />
            {t('nav.dashboard')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-progress-header" style={{ flexDirection: dir === 'rtl' ? 'row' : 'row' }}>
        <span>{t('quiz.question_label')} {currentIndex + 1} {t('quiz.out_of')} {TOTAL}</span>
        <span className="quiz-score-badge">{t('quiz.points')}: {score}</span>
      </div>

      <div className="quiz-progress-bar" style={{ direction: 'ltr' }}>
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="quiz-card" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
        <div className="quiz-question-number" style={{ [dir === 'rtl' ? 'right' : 'left']: '-1rem' } as any}>
          {language === 'ar' ? 'س' : 'Q'} {currentIndex + 1}
        </div>
        <h2 className="quiz-question-text">{translated.question}</h2>

        {language === 'en' && (
          <p style={{ direction: 'rtl', textAlign: 'right', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
            {current.question}
          </p>
        )}

        <div className="quiz-options">
          {translated.options.map((opt, i) => (
            <button
              key={i}
              className={getOptionClass(i)}
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
              style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
            >
              <span className="quiz-option-letter">
                {language === 'ar' ? ['أ', 'ب', 'ج', 'د'][i] : ['A', 'B', 'C', 'D'][i]}
              </span>
              <span className="quiz-option-text">{opt}</span>
              {isAnswered && i === current.correctAnswer && (
                <CheckCircle size={20} className="quiz-option-icon" style={{ color: 'var(--color-success)', [dir === 'rtl' ? 'marginRight' : 'marginLeft']: 'auto' } as any} />
              )}
              {isAnswered && i === selectedAnswer && i !== current.correctAnswer && (
                <XCircle size={20} className="quiz-option-icon" style={{ color: 'var(--color-error)', [dir === 'rtl' ? 'marginRight' : 'marginLeft']: 'auto' } as any} />
              )}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className={`quiz-explanation ${selectedAnswer === current.correctAnswer ? 'quiz-explanation--correct' : 'quiz-explanation--wrong'}`} style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
            <div className="quiz-explanation-header">
              {selectedAnswer === current.correctAnswer ? t('quiz.correct_answer') : `${t('quiz.correct_is')} ${translated.options[current.correctAnswer]}`}
            </div>
            <p className="quiz-explanation-text">{translated.explanation}</p>
            {language === 'en' && (
              <p style={{ direction: 'rtl', textAlign: 'right', fontSize: '0.85rem', marginTop: '1rem', opacity: 0.8 }}>
                {current.explanation}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="quiz-nav" style={{ flexDirection: dir === 'rtl' ? 'row' : 'row' }}>
        <Link to="/dashboard" className="btn btn-outline" style={{ gap: '0.5rem' }}>
          <ArrowIconExit size={18} />
          {t('quiz.exit')}
        </Link>
        {isAnswered && (
          <button className="btn btn-primary" onClick={handleNext} style={{ gap: '0.5rem' }}>
            {currentIndex + 1 >= TOTAL ? t('quiz.show_result') : t('questions.next')}
            <ArrowIconNext size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
