import { Link } from 'react-router-dom';
import { Target, Layers, Layout, Compass, Users, CheckCircle, Video, Book } from 'lucide-react';
import questions from '../data/questions.json';

const Home = () => {
  const previewQuestions = questions.slice(0, 6);

  return (
    <>
      <div className="bg-pattern"></div>
      
      {/* Hero */}
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="hero-badge">
          منهج أهل السنة والجماعة
        </div>
        <h1 className="hero-title">
          تعلّم <span className="text-gold">العقيدة</span><br />
          بأسلوب مبتكر
        </h1>
        <p className="hero-subtitle">
          منهج تعليمي منظم لعرض مئتي سؤال وجواب في العقيدة الإسلامية الصحيحة<br/>
          مقسمة إلى أقسام متعددة لتسهيل الفهم والمراجعة.
        </p>
        <div className="hero-buttons">
          <Link to="/questions" className="btn btn-primary">
            ابدأ التعلّم الآن
          </Link>
          <a 
            href="https://drive.google.com/file/d/1EAf3Al8XSZjza1KNJ04-cFgnPtAdYd0F/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Book size={20} />
            تحميل الكتاب PDF
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-container">
        <div className="stat-item">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-number">+10K</div>
          <div className="stat-label">مستفيد</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><Layers size={24} /></div>
          <div className="stat-number">+5</div>
          <div className="stat-label">أقسام شاملة</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><Video size={24} /></div>
          <div className="stat-number">+150</div>
          <div className="stat-label">دقيقة مرئية</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon"><CheckCircle size={24} /></div>
          <div className="stat-number">+200</div>
          <div className="stat-label">سؤال وجواب</div>
        </div>
      </section>

      {/* Features - لماذا يشرح */}
      <section className="mb-2" id="about">
        <h2 className="section-title">
          لماذا <span className="highlight">يُشرح؟</span>
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Target size={24} /></div>
            <div className="feature-content">
              <h3>شرح واقعي حي</h3>
              <p>طرح معاصر يربط مسائل الاعتقاد بواقع المسلم العملي وتحديات العصر الحالية.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Layout size={24} /></div>
            <div className="feature-content">
              <h3>تصميم عصري</h3>
              <p>واجهة مريحة بصرياً مدعومة بألوان وإضافات تساعد على التركيز في التعلم.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Compass size={24} /></div>
            <div className="feature-content">
              <h3>بحث متقدم</h3>
              <p>إمكانية البحث في الأسئلة والإجابات للوصول المباشر للمعلومة.</p>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper"><Book size={24} /></div>
            <div className="feature-content">
              <h3>محتوى موثوق</h3>
              <p>مراجعة دقيقة لجميع المسائل لتتوافق مع المصادر الأصلية للاعتقاد.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Questions */}
      <section className="mb-2">
        <h2 className="section-title">
          استكشف <span className="highlight">الأسئلة</span>
        </h2>
        
        {/* categories mockup */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <span style={{ background: 'var(--color-gold)', color: 'var(--color-bg-dark)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold' }}>الكل</span>
          <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>المقدمات</span>
          <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>التوحيد</span>
          <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer' }}>العبادة</span>
        </div>

        <div className="questions-grid">
          {previewQuestions.map((q) => (
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
        
        <div className="text-center mt-4">
          <Link to="/questions" className="btn btn-outline" style={{ padding: '0.75rem 3rem' }}>
            تصفح جميع الأسئلة
          </Link>
        </div>
      </section>

      {/* Book Info Section */}
      <section className="book-section" id="book">
        <div className="book-image">
          <div className="book-mockup">
            <div className="book-number">٢٠٠</div>
            <div className="book-text">سؤال وجواب<br/>في العقيدة</div>
          </div>
        </div>
        <div className="book-content">
          <h2>عن كتاب <span className="text-gold">200 سؤال وجواب</span></h2>
          <p>
            تأليف العلامة حافظ بن أحمد الحكمي، وهو من أعظم المختصرات التي جمعت أصول الدين 
            بأسلوب السؤال والجواب، مما يسهل على طالب العلم والمسلم العامي استيعابها وفهمها.
          </p>
          <a 
            href="https://drive.google.com/file/d/1EAf3Al8XSZjza1KNJ04-cFgnPtAdYd0F/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary" 
            style={{ display: 'inline-flex', gap: '0.5rem' }}
          >
            <Book size={20} />
            تحميل الكتاب PDF
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <h2 className="section-title">
          تواصل <span className="highlight">معنا</span>
        </h2>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <input type="text" className="form-input" placeholder="الاسم الكريم" />
            <input type="email" className="form-input" placeholder="البريد الإلكتروني" />
          </div>
          <input type="text" className="form-input" placeholder="الموضوع" />
          <textarea className="form-input" rows={5} placeholder="الرسالة..."></textarea>
          <button type="submit" className="btn btn-blue" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem', borderRadius: 'var(--radius-md)' }}>
            إرسال الرسالة
          </button>
        </form>
      </section>
    </>
  );
};

export default Home;
