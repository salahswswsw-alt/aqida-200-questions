import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import questions from '../data/questions.json';

const Questions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', ...Array.from(new Set(questions.map(q => q.category)))];

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch = q.question.includes(searchTerm) || q.answer.includes(searchTerm);
      const matchesCategory = selectedCategory === 'الكل' || q.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div>
      <h1 className="section-title">
        جميع <span className="highlight">الأسئلة</span>
      </h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '300px', position: 'relative' }}>
          <div style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-bg-dark)' }}>
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="ابحث في الأسئلة أو الإجابات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 3rem 1rem 1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-border)',
              fontSize: '1rem',
              fontFamily: 'inherit',
              background: 'var(--color-white)',
              color: 'var(--color-bg-dark)'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--color-card-bg)', padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)' }}>
          <Filter size={20} color="var(--color-gold)" />
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
              color: 'var(--color-white)'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat} style={{ color: '#000' }}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="text-center mt-4">
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>لم يتم العثور على نتائج مطابقة لبحثك</p>
        </div>
      ) : (
        <div className="questions-grid">
          {filteredQuestions.map((q) => (
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
      )}
    </div>
  );
};

export default Questions;
