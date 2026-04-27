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
          <Link to="/login" className="footer-link">{t('nav.login')}</Link>
          <Link to="/register" className="footer-link">{t('nav.register')}</Link>
          <Link to="/dashboard" className="footer-link">{t('nav.dashboard')}</Link>
          <a href="mailto:info@aqida.com" className="footer-link">info@aqida.com</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer.rights').replace('{year}', new Date().getFullYear().toString())}</p>
      </div>
    </footer>
  );
};

export default Footer;
