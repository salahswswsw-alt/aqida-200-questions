import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import questions from '../data/questions.json';
import { useLanguage } from '../contexts/LanguageContext';

const Questions = () => {
  const { t, language, dir } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t('questions.all'));

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
      'الكل': 'All',
    };
    return mapping[cat] || cat;
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(questions.map(q => q.category)));
    return [t('questions.all'), ...cats];
  }, [t]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch = q.question.includes(searchTerm) || q.answer.includes(searchTerm);
      const matchesCategory = selectedCategory === t('questions.all') || q.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, t]);

  return (
    <div>
      <h1 className="section-title">
        {language === 'ar' ? <>جميع <span className="highlight">الأسئلة</span></> : <>All <span className="highlight">Questions</span></>}
      </h1>
      
      <div className="controls-container">
        <div className="search-wrapper">
          <div style={{ 
            position: 'absolute', 
            [dir === 'rtl' ? 'right' : 'left']: '1.25rem', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            color: 'var(--color-bg-dark)', 
            zIndex: 1 
          } as any}>
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder={t('questions.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ [dir === 'rtl' ? 'paddingRight' : 'paddingLeft']: '3.5rem' } as any}
          />
        </div>
        
        <div className="filter-wrapper">
          <Filter size={20} color="var(--color-sky)" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '1rem',
              fontFamily: 'inherit',
              cursor: 'pointer',
              outline: 'none',
              color: 'var(--color-white)',
              padding: '0.25rem'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat} style={{ color: '#000' }}>
                {cat === t('questions.all') ? cat : translateCategory(cat)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="text-center mt-4">
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>{t('questions.no_results')}</p>
        </div>
      ) : (
        <div className="questions-grid">
          {filteredQuestions.map((q) => (
            <Link to={`/question/${q.id}`} key={q.id} className="question-card">
              <div className="question-header" style={{ justifyContent: 'space-between' }}>
                <span className="question-category">{translateCategory(q.category)}</span>
                <div className="question-badge">{q.id}</div>
              </div>
              <h3 className="question-title">{language === 'ar' ? q.question : `Question ${q.id}: (Detailed Translation Available)`}</h3>
              <p className="question-excerpt">{language === 'ar' ? q.answer : "Please select the question to view more details."}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;
