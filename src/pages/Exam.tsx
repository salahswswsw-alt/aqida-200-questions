import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle, XCircle, RotateCcw, Trophy,
  ChevronLeft, ChevronRight, ClipboardList,
  BookOpen, AlertCircle, Send,
} from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';

type Phase = 'start' | 'exam' | 'result';

const TOTAL = quizQuestions.length;
const LETTERS = ['أ', 'ب', 'ج', 'د'];

const getGrade = (pct: number) => {
  if (pct >= 90) return { label: 'ممتاز 🌟', color: '#16a34a' };
  if (pct >= 75) return { label: 'جيد جداً 👍', color: '#0284c7' };
  if (pct >= 60) return { label: 'جيد', color: '#d97706' };
  if (pct >= 50) return { label: 'مقبول', color: '#f97316' };
  return { label: 'راجع المادة', color: '#dc2626' };
};

const Exam = () => {
  const [phase, setPhase] = useState<Phase>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(TOTAL).fill(null));
  const [submitWarning, setSubmitWarning] = useState(false);

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

  /* ── Start screen ─────────────────────────────── */
  if (phase === 'start') {
    return (
      <div className="exam-start">
        <div className="auth-icon-wrapper" style={{ width: '80px', height: '80px', marginBottom: '1.5rem' }}>
          <ClipboardList size={42} />
        </div>
        <h1 className="auth-title">اختبار العقيدة الإسلامية</h1>
        <p className="auth-subtitle" style={{ maxWidth: '520px', margin: '0 auto 2rem' }}>
          اختبر مستواك في مادة العقيدة بـ <strong>{TOTAL}</strong> سؤالاً من اختيار متعدد.
          ستظهر النتيجة التفصيلية بعد إتمام الاختبار فقط.
        </p>

        <div className="stats-container" style={{ margin: '0 0 2rem' }}>
          <div className="stat-item">
            <div className="stat-number">{TOTAL}</div>
            <div className="stat-label">سؤالاً</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4</div>
            <div className="stat-label">خيارات</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">حر</div>
            <div className="stat-label">التنقل</div>
          </div>
        </div>

        <div className="exam-notice">
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>لن تظهر الإجابات الصحيحة أثناء الاختبار — ستظهر في تقرير النتيجة فقط.</span>
        </div>

        <button className="btn btn-primary" onClick={handleStart} style={{ padding: '1.25rem 3.5rem', fontSize: '1.15rem', marginTop: '1rem' }}>
          <ClipboardList size={20} style={{ marginLeft: '8px' }} />
          ابدأ الاختبار الآن
        </button>

        <div style={{ marginTop: '1.5rem' }}>
          <Link to="/questions" className="auth-link">تصفح الأسئلة والأجوبة</Link>
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
      <div className="exam-result">
        <div style={{ color, marginBottom: '0.5rem' }}>
          <Trophy size={64} />
        </div>
        <h1 className="auth-title">نتيجة الاختبار</h1>

        <div className="exam-result-ring" style={{ color }}>
          <span className="exam-result-num">{score}</span>
          <span className="exam-result-total">من {TOTAL}</span>
        </div>

        <p className="exam-result-pct" style={{ color }}>{pct}%</p>
        <p className="exam-result-grade">{label}</p>

        <div className="exam-result-stats">
          <div className="exam-result-stat exam-result-stat--correct">
            <CheckCircle size={18} />
            {score} صحيحة
          </div>
          <div className="exam-result-stat exam-result-stat--wrong">
            <XCircle size={18} />
            {wrongCount} خاطئة
          </div>
          {skippedCount > 0 && (
            <div className="exam-result-stat exam-result-stat--skip">
              <AlertCircle size={18} />
              {skippedCount} غير مجاب
            </div>
          )}
        </div>

        <div className="exam-result-actions">
          <button className="btn btn-primary" onClick={handleStart}>
            <RotateCcw size={18} />
            إعادة الاختبار
          </button>
          <Link to="/questions" className="btn btn-outline">
            <BookOpen size={18} />
            مراجعة الأجوبة
          </Link>
        </div>

        {/* Detailed review */}
        <div className="exam-review">
          <h2 className="exam-review-title">
            <ClipboardList size={20} style={{ display: 'inline', marginLeft: '8px', verticalAlign: 'middle' }} />
            مراجعة تفصيلية للإجابات
          </h2>

          {quizQuestions.map((q, i) => {
            const userAns = answers[i];
            const isCorrect = userAns === q.correctAnswer;
            const isSkipped = userAns === null;
            let itemClass = 'exam-review-item';
            if (isSkipped) itemClass += ' exam-review-item--skip';
            else if (!isCorrect) itemClass += ' exam-review-item--wrong';

            return (
              <div key={q.id} className={itemClass}>
                <div className="exam-review-num">{i + 1}</div>
                <div className="exam-review-body">
                  <p className="exam-review-q">{q.question}</p>
                  <div className="exam-review-answers">
                    {isSkipped ? (
                      <span className="exam-review-skip">
                        <AlertCircle size={15} /> لم تُجِب على هذا السؤال
                      </span>
                    ) : (
                      <span className={`exam-review-ans ${isCorrect ? 'exam-review-ans--correct' : 'exam-review-ans--wrong'}`}>
                        {isCorrect ? <CheckCircle size={15} /> : <XCircle size={15} />}
                        إجابتك: {q.options[userAns!]}
                      </span>
                    )}
                    {!isCorrect && (
                      <span className="exam-review-ans exam-review-ans--correct">
                        <CheckCircle size={15} />
                        الصحيحة: {q.options[q.correctAnswer]}
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
  return (
    <div className="exam-wrap">

      {/* Submit warning banner */}
      {submitWarning && (
        <div className="exam-warning-banner">
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <strong>لديك {unansweredCount} سؤال لم تُجِب عليه بعد.</strong>
            <span style={{ marginRight: '0.5rem', color: 'var(--color-text-muted)' }}>هل تريد الإنهاء والحصول على نتيجتك؟</span>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }} onClick={handleForceSubmit}>
              إنهاء الآن
            </button>
            <button className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }} onClick={() => setSubmitWarning(false)}>
              متابعة الإجابة
            </button>
          </div>
        </div>
      )}

      {/* Header row */}
      <div className="exam-header">
        <span className="exam-counter">
          السؤال {currentIndex + 1} / {TOTAL}
        </span>
        <span className="exam-category-tag">{current.category}</span>
        <span className="exam-answered-count">
          {answeredCount} / {TOTAL} مُجاب
        </span>
      </div>

      {/* Progress bar */}
      <div className="exam-progress-wrap">
        <div className="exam-progress-bar">
          <div className="exam-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="exam-progress-info">
          <span>{Math.round(progress)}% مكتمل</span>
          <span>{unansweredCount} سؤال متبقٍ</span>
        </div>
      </div>

      {/* Question card */}
      <div className="exam-card">
        <div className="exam-q-badge">
          <ClipboardList size={14} />
          سؤال {currentIndex + 1}
        </div>
        <h2 className="exam-q-text">{current.question}</h2>

        <div className="exam-options">
          {current.options.map((opt, i) => {
            const isSelected = selectedAnswer === i;
            return (
              <button
                key={i}
                className={`exam-option${isSelected ? ' exam-option--selected' : ''}`}
                onClick={() => handleSelect(i)}
              >
                <span className={`exam-option-letter${isSelected ? ' exam-option-letter--selected' : ''}`}>
                  {LETTERS[i]}
                </span>
                <span className="exam-option-text">{opt}</span>
                {isSelected && <CheckCircle size={18} style={{ marginRight: 'auto', color: 'var(--color-sky)', flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dot navigator */}
      <div className="exam-dot-nav">
        {quizQuestions.map((_, i) => {
          let cls = 'exam-dot';
          if (i === currentIndex) cls += ' exam-dot--current';
          else if (answers[i] !== null) cls += ' exam-dot--answered';
          return (
            <button
              key={i}
              className={cls}
              onClick={() => setCurrentIndex(i)}
              title={`السؤال ${i + 1}`}
            />
          );
        })}
      </div>

      {/* Navigation */}
      <div className="exam-nav">
        <button
          className="btn btn-outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ChevronRight size={18} />
          السابق
        </button>

        <button
          className="btn btn-submit"
          onClick={handleSubmitAttempt}
        >
          <Send size={16} style={{ marginLeft: '6px' }} />
          إنهاء وعرض النتيجة
        </button>

        <button
          className="btn btn-primary"
          onClick={handleNext}
          disabled={currentIndex + 1 >= TOTAL}
        >
          التالي
          <ChevronLeft size={18} style={{ marginRight: '8px' }} />
        </button>
      </div>
    </div>
  );
};

export default Exam;
