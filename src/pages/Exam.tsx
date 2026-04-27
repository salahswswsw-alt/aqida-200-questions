import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle, XCircle, RotateCcw, Trophy,
  ChevronLeft, ChevronRight, ClipboardList,
  BookOpen, AlertCircle, Send,
} from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { useLanguage } from '../contexts/LanguageContext';

type Phase = 'start' | 'exam' | 'result';

const TOTAL = quizQuestions.length;

const Exam = () => {
  const { t, language, dir } = useLanguage();
  const [phase, setPhase] = useState<Phase>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(TOTAL).fill(null));
  const [submitWarning, setSubmitWarning] = useState(false);

  const LETTERS = language === 'ar' ? ['أ', 'ب', 'ج', 'د'] : ['A', 'B', 'C', 'D'];

  const getGrade = (pct: number) => {
    if (pct >= 90) return { label: t('quiz.score_excellent') + ' 🌟', color: '#16a34a' };
    if (pct >= 75) return { label: t('quiz.score_very_good') + ' 👍', color: '#0284c7' };
    if (pct >= 60) return { label: t('quiz.score_good'), color: '#d97706' };
    if (pct >= 50) return { label: 'مقبول', color: '#f97316' }; // Defaulting to Arabic for 'Pass' if no key
    return { label: t('quiz.score_needs_review'), color: '#dc2626' };
  };

  const current = quizQuestions[currentIndex];
  const answeredCount = answers.filter(a => a !== null).length;
  const unansweredCount = TOTAL - answeredCount;
  const progress = (answeredCount / TOTAL) * 100;
  const selectedAnswer = answers[currentIndex];

  const score = answers.reduce<number>((acc, ans, i) => {
    return acc + (ans !== null && ans === quizQuestions[i].correctAnswer ? 1 : 0);
  }, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase, currentIndex]);

  const handleStart = () => {
    setPhase('exam');
    setCurrentIndex(0);
    setAnswers(Array(TOTAL).fill(null));
    setSubmitWarning(false);
  };

  const handleSelect = useCallback((optionIndex: number) => {
    setAnswers(prev => {
      const next = [...prev];
      next[currentIndex] = optionIndex;
      return next;
    });
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex + 1 < TOTAL) setCurrentIndex(i => i + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  const handleSubmitAttempt = () => {
    if (unansweredCount > 0) {
      setSubmitWarning(true);
      window.scrollTo(0, 0);
      return;
    }
    setPhase('result');
  };

  const handleForceSubmit = () => {
    setSubmitWarning(false);
    setPhase('result');
  };

  const ArrowNext = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const ArrowPrev = dir === 'rtl' ? ChevronRight : ChevronLeft;

  const getTranslatedQuestion = (q: typeof current) => {
    if (language === 'ar') return {
      question: q.question,
      options: q.options,
      category: q.category
    };
    return {
      question: `Question ${q.id}: (In Arabic: ${q.question})`,
      options: q.options.map((opt, idx) => `${LETTERS[idx]}) ${opt}`),
      category: "Category Placeholder"
    };
  };

  /* ── Start screen ─────────────────────────────── */
  if (phase === 'start') {
    return (
      <div className="exam-start" style={{ textAlign: 'center' }}>
        <div className="auth-icon-wrapper" style={{ width: '80px', height: '80px', marginBottom: '1.5rem', margin: '0 auto 1.5rem' }}>
          <ClipboardList size={42} />
        </div>
        <h1 className="auth-title">{t('exam.title')}</h1>
        <p className="auth-subtitle" style={{ maxWidth: '520px', margin: '0 auto 2rem' }}>
          {t('exam.subtitle').replace('{total}', TOTAL.toString())}
          <br />
          {t('exam.result_msg')}
        </p>

        <div className="stats-container" style={{ margin: '0 0 2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <div className="stat-item">
            <div className="stat-number">{TOTAL}</div>
            <div className="stat-label">{t('quiz.questions')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">{t('quiz.options')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{t('exam.nav_free')}</div>
            <div className="stat-label">{t('exam.navigation')}</div>
          </div>
        </div>

        <div className="exam-notice" style={{ justifyContent: 'center' }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{t('exam.notice')}</span>
        </div>

        <button className="btn btn-primary" onClick={handleStart} style={{ padding: '1.25rem 3.5rem', fontSize: '1.15rem', marginTop: '1rem', margin: '1rem auto 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ClipboardList size={20} />
          {t('dash.quiz_cta')}
        </button>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/questions" className="auth-link">{t('questions.browse') || (language === 'ar' ? 'تصفح الأسئلة والأجوبة' : 'Browse Questions')}</Link>
        </div>
      </div>
    );
  }

  /* ── Result screen ────────────────────────────── */
  if (phase === 'result') {
    const pct = Math.round((score / TOTAL) * 100);
    const { label, color } = getGrade(pct);
    const wrongCount = answers.filter((a, i) => a !== null && a !== quizQuestions[i].correctAnswer).length;
    const skippedCount = answers.filter(a => a === null).length;

    return (
      <div className="exam-result" style={{ textAlign: 'center' }}>
        <div style={{ color, marginBottom: '0.5rem', margin: '0 auto' }}>
          <Trophy size={64} />
        </div>
        <h1 className="auth-title">{t('exam.result_title')}</h1>

        <div className="exam-result-ring" style={{ color, margin: '1.5rem auto' }}>
          <span className="exam-result-num">{score}</span>
          <span className="exam-result-total">{t('quiz.out_of')} {TOTAL}</span>
        </div>

        <p className="exam-result-pct" style={{ color }}>{pct}%</p>
        <p className="exam-result-grade">{label}</p>

        <div className="exam-result-stats" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <div className="exam-result-stat exam-result-stat--correct">
            <CheckCircle size={18} />
            {t('quiz.correct_count').replace('{count}', score.toString())}
          </div>
          <div className="exam-result-stat exam-result-stat--wrong">
            <XCircle size={18} />
            {t('quiz.wrong_count').replace('{count}', wrongCount.toString())}
          </div>
          {skippedCount > 0 && (
            <div className="exam-result-stat exam-result-stat--skip">
              <AlertCircle size={18} />
              {t('exam.skipped')}: {skippedCount}
            </div>
          )}
        </div>

        <div className="exam-result-actions" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn btn-primary" onClick={handleStart} style={{ gap: '0.5rem' }}>
            <RotateCcw size={18} />
            {t('quiz.restart')}
          </button>
          <Link to="/questions" className="btn btn-outline" style={{ gap: '0.5rem' }}>
            <BookOpen size={18} />
            {t('exam.review_answers')}
          </Link>
        </div>

        {/* Detailed review */}
        <div className="exam-review" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
          <h2 className="exam-review-title">
            <ClipboardList size={20} style={{ display: 'inline', [dir === 'rtl' ? 'marginLeft' : 'marginRight']: '8px', verticalAlign: 'middle' } as any} />
            {t('exam.detailed_review')}
          </h2>

          {quizQuestions.map((q, i) => {
            const userAns = answers[i];
            const isCorrect = userAns === q.correctAnswer;
            const isSkipped = userAns === null;
            let itemClass = 'exam-review-item';
            if (isSkipped) itemClass += ' exam-review-item--skip';
            else if (!isCorrect) itemClass += ' exam-review-item--wrong';

            const transQ = getTranslatedQuestion(q);

            return (
              <div key={q.id} className={itemClass}>
                <div className="exam-review-num">{i + 1}</div>
                <div className="exam-review-body">
                  <p className="exam-review-q">{transQ.question}</p>
                  <div className="exam-review-answers">
                    {isSkipped ? (
                      <span className="exam-review-skip">
                        <AlertCircle size={15} /> {t('exam.not_answered_msg')}
                      </span>
                    ) : (
                      <span className={`exam-review-ans ${isCorrect ? 'exam-review-ans--correct' : 'exam-review-ans--wrong'}`}>
                        {isCorrect ? <CheckCircle size={15} /> : <XCircle size={15} />}
                        {t('exam.your_answer')} {transQ.options[userAns!]}
                      </span>
                    )}
                    {!isCorrect && (
                      <span className="exam-review-ans exam-review-ans--correct">
                        <CheckCircle size={15} />
                        {t('exam.correct_is')} {transQ.options[q.correctAnswer]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ── Exam phase ───────────────────────────────── */
  const transCurrent = getTranslatedQuestion(current);

  return (
    <div className="exam-wrap">

      {/* Submit warning banner */}
      {submitWarning && (
        <div className="exam-warning-banner" style={{ flexDirection: dir === 'rtl' ? 'row' : 'row' }}>
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <strong>{t('exam.warning_unanswered').replace('{count}', unansweredCount.toString())}</strong>
            <span style={{ [dir === 'rtl' ? 'marginRight' : 'marginLeft']: '0.5rem', color: 'var(--color-text-muted)' } as any}>{t('exam.warning_prompt')}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }} onClick={handleForceSubmit}>
              {t('exam.finish_now')}
            </button>
            <button className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }} onClick={() => setSubmitWarning(false)}>
              {t('exam.continue_answering')}
            </button>
          </div>
        </div>
      )}

      {/* Header row */}
      <div className="exam-header" style={{ flexDirection: dir === 'rtl' ? 'row' : 'row' }}>
        <span className="exam-counter">
          {t('quiz.question_label')} {currentIndex + 1} / {TOTAL}
        </span>
        <span className="exam-category-tag">{transCurrent.category}</span>
        <span className="exam-answered-count">
          {answeredCount} / {TOTAL} {t('exam.answered')}
        </span>
      </div>

      {/* Progress bar */}
      <div className="exam-progress-wrap">
        <div className="exam-progress-bar" style={{ direction: 'ltr' }}>
          <div className="exam-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="exam-progress-info" style={{ flexDirection: dir === 'rtl' ? 'row' : 'row' }}>
          <span>{Math.round(progress)}% {t('exam.completed')}</span>
          <span>{unansweredCount} {t('exam.remaining')}</span>
        </div>
      </div>

      {/* Question card */}
      <div className="exam-card" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
        <div className="exam-q-badge" style={{ [dir === 'rtl' ? 'right' : 'left']: '1.5rem' } as any}>
          <ClipboardList size={14} />
          {t('quiz.question_label')} {currentIndex + 1}
        </div>
        <h2 className="exam-q-text">{transCurrent.question}</h2>

        <div className="exam-options">
          {transCurrent.options.map((opt, i) => {
            const isSelected = selectedAnswer === i;
            return (
              <button
                key={i}
                className={`exam-option${isSelected ? ' exam-option--selected' : ''}`}
                onClick={() => handleSelect(i)}
                style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
              >
                <span className={`exam-option-letter${isSelected ? ' exam-option-letter--selected' : ''}`}>
                  {LETTERS[i]}
                </span>
                <span className="exam-option-text">{opt}</span>
                {isSelected && <CheckCircle size={18} style={{ [dir === 'rtl' ? 'marginRight' : 'marginLeft']: 'auto', color: 'var(--color-sky)', flexShrink: 0 } as any} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dot navigator */}
      <div className="exam-dot-nav" style={{ direction: 'ltr' }}>
        {quizQuestions.map((_, i) => {
          let cls = 'exam-dot';
          if (i === currentIndex) cls += ' exam-dot--current';
          else if (answers[i] !== null) cls += ' exam-dot--answered';
          return (
            <button
              key={i}
              className={cls}
              onClick={() => setCurrentIndex(i)}
              title={`${t('quiz.question_label')} ${i + 1}`}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <div className="exam-nav" style={{ flexDirection: dir === 'rtl' ? 'row' : 'row' }}>
        <button
          className="btn btn-outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{ gap: '0.5rem' }}
        >
          <ArrowPrev size={18} />
          {t('questions.prev')}
        </button>

        <button
          className="btn btn-submit"
          onClick={handleSubmitAttempt}
          style={{ gap: '0.5rem' }}
        >
          <Send size={16} />
          {t('exam.finished_cta')}
        </button>

        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={currentIndex + 1 >= TOTAL}
          style={{ gap: '0.5rem' }}
        >
          {t('questions.next')}
          <ArrowNext size={18} />
        </button>
      </div>
    </div>
  );
};

export default Exam;
