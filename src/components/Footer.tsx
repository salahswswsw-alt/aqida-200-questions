import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t, language } = useLanguage();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column" style={{ maxWidth: '300px' }}>
          <Logo />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '1rem', textAlign: language === 'ar' ? 'right' : 'left' }}>
            {t('footer.description')}
          </p>
        </div>

        <div className="footer-column" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
          <h4>{t('footer.quick_links')}</h4>
          <Link to="/" className="footer-link">{t('nav.home')}</Link>
          <Link to="/questions" className="footer-link">{t('nav.allQuestions')}</Link>
          <Link to="/quiz" className="footer-link">{t('nav.testCreed')}</Link>
          <a href="#about" className="footer-link">{t('nav.about')}</a>
        </div>

        <div className="footer-column" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
          <h4>{t('footer.sections')}</h4>
          <Link to="/questions" className="footer-link">{language === 'ar' ? 'التوحيد' : 'Tawhid'}</Link>
          <Link to="/questions" className="footer-link">{language === 'ar' ? 'أركان الإيمان' : 'Pillars of Faith'}</Link>
          <Link to="/questions" className="footer-link">{language === 'ar' ? 'الأسماء والصفات' : 'Names & Attributes'}</Link>
          <Link to="/questions" className="footer-link">{language === 'ar' ? 'اليوم الآخر' : 'The Last Day'}</Link>
        </div>

        <div className="footer-column" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
          <h4>{t('footer.account')}</h4>
          <Link to="/dashboard" className="footer-link">{t('nav.dashboard')}</Link>
          <a href="mailto:info@aqida.com" className="footer-link">info@aqida.com</a>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="https://www.facebook.com/200qaaqeedah/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'inline-flex', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/200qaaqeedah/" target="_blank" rel="noopener noreferrer" className="footer-link" style={{ display: 'inline-flex', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer.rights').replace('{year}', new Date().getFullYear().toString())}</p>
      </div>
    </footer>
  );
};

export default Footer;
