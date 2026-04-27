import { Link } from 'react-router-dom';
import { Target, Layers, Layout, Compass, Users, CheckCircle, Video, Book, ClipboardList } from 'lucide-react';
import questions from '../data/questions.json';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { t, language } = useLanguage();
  const previewQuestions = questions.slice(0, 6);

  // Simple category translation helper
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

  return (
    <>
      <div className="bg-pattern"></div>
      
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-badge">
          {t('home.hero.badge')}
        </div>
        <h1 className="hero-title">
          {t('home.hero.title_part1')}<span className="text-sky">{t('home.hero.title_part2')}</span><br />
          {t('home.hero.title_part3')}
        </h1>
        <p className="hero-subtitle">
          {t('home.hero.subtitle')}
        </p>
        <div className="hero-buttons">
          <Link to="/questions" className="btn btn-primary">
            {t('home.hero.start')}
          </Link>
          <Link
            to="/exam"
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ClipboardList size={20} />
            {t('home.hero.exam')}
          </Link>
          <a
            href="https://drive.google.com/file/d/1EAf3Al8XSZjza1KNJ04-cFgnPtAdYd0F/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Book size={20} />
            {t('home.hero.download')}
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-container">
        <div className="stat-item">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-number">+10K</div>
          <div className="stat-label">{t('home.stats.users')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><Layers size={24} /></div>
          <div className="stat-number">+5</div>
          <div className="stat-label">{t('home.stats.sections')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><Video size={24} /></div>
          <div className="stat-number">+150</div>
          <div className="stat-label">{t('home.stats.minutes')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><CheckCircle size={24} /></div>
          <div className="stat-number">+200</div>
          <div className="stat-label">{t('home.stats.questions')}</div>
        </div>
      </section>

      {/* Features */}
      <section className="mb-2" id="about">
        <h2 className="section-title">
          {t('home.features.title')}<span className="highlight">{t('home.features.title_highlight')}</span>
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Target size={24} /></div>
            <div className="feature-content">
              <h3>{t('home.features.f1.title')}</h3>
              <p>{t('home.features.f1.desc')}</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Layout size={24} /></div>
            <div className="feature-content">
              <h3>{t('home.features.f2.title')}</h3>
              <p>{t('home.features.f2.desc')}</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Compass size={24} /></div>
            <div className="feature-content">
              <h3>{t('home.features.f3.title')}</h3>
              <p>{t('home.features.f3.desc')}</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Book size={24} /></div>
            <div className="feature-content">
              <h3>{t('home.features.f4.title')}</h3>
              <p>{t('home.features.f4.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Questions */}
      <section className="mb-2">
        <h2 className="section-title">
          {t('home.explore.title')}<span className="highlight">{t('home.explore.title_highlight')}</span>
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--color-sky)', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)', fontWeight: 'bold', boxShadow: 'var(--shadow-glow)' }}>
            {t('home.explore.all')}
          </span>
          <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)', cursor: 'pointer', border: '1px solid var(--color-border)' }}>
            {t('home.explore.intro')}
          </span>
          <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)', cursor: 'pointer', border: '1px solid var(--color-border)' }}>
            {t('home.explore.tawhid')}
          </span>
          <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)', cursor: 'pointer', border: '1px solid var(--color-border)' }}>
            {t('home.explore.worship')}
          </span>
        </div>

        <div className="questions-grid">
          {previewQuestions.map((q) => (
            <Link to={`/question/${q.id}`} key={q.id} className="question-card">
              <div className="question-header" style={{ justifyContent: 'space-between' }}>
                <span className="question-category">{translateCategory(q.category)}</span>
                <div className="question-badge">{q.id}</div>
              </div>
              <h3 className="question-title">{language === 'ar' ? q.question : `Question ${q.id}: (Translated Content Available in Detail)`}</h3>
              <p className="question-excerpt">{language === 'ar' ? q.answer : "Tap to read the detailed answer in Arabic or explore available English summaries."}</p>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <Link to="/questions" className="btn btn-outline" style={{ padding: '0.75rem 3rem' }}>
            {t('home.explore.browse_all')}
          </Link>
        </div>
      </section>

      {/* Book Info Section */}
      <section className="book-section" id="book">
        <div className="book-image">
          <div className="book-mockup" style={{ background: 'linear-gradient(135deg, var(--color-sky) 0%, #0369a1 100%)' }}>
            <div className="book-number">200</div>
            <div className="book-text">{language === 'ar' ? <>سؤال وجواب<br/>في العقيدة</> : <>Questions & Answers<br/>in Creed</>}</div>
          </div>
        </div>
        <div className="book-content">
          <h2>{t('home.book.title')}<span className="text-sky">{t('home.book.title_highlight')}</span></h2>
          <p>{t('home.book.desc')}</p>
          <a 
            href="https://drive.google.com/file/d/1EAf3Al8XSZjza1KNJ04-cFgnPtAdYd0F/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary" 
            style={{ display: 'inline-flex', gap: '0.5rem' }}
          >
            <Book size={20} />
            {t('home.hero.download')}
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <h2 className="section-title">
          {t('home.contact.title')}<span className="highlight">{t('home.contact.title_highlight')}</span>
        </h2>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <input type="text" className="form-input" placeholder={t('home.contact.name')} />
            <input type="email" className="form-input" placeholder={t('home.contact.email')} />
          </div>
          <input type="text" className="form-input" placeholder={t('home.contact.subject')} />
          <textarea className="form-input" rows={5} placeholder={t('home.contact.message')}></textarea>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.1rem', marginTop: '1rem' }}>
            {t('home.contact.send')}
          </button>
        </form>
      </section>
    </>
  );
};

export default Home;
