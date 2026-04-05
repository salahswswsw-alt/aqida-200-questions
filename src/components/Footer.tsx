import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column" style={{ maxWidth: '300px' }}>
          <Logo className="mb-2" />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            منصة تعليمية تهدف إلى تبسيط وتقريب مسائل العقيدة بأسلوب عصري سهل وفق منهج أهل السنة والجماعة.
          </p>
        </div>
        
        <div className="footer-column">
          <h4>روابط سريعة</h4>
          <Link to="/" className="footer-link">الرئيسية</Link>
          <Link to="/questions" className="footer-link">استكشف الأسئلة</Link>
          <a href="#about" className="footer-link">عن المنصة</a>
        </div>
        
        <div className="footer-column">
          <h4>الأقسام</h4>
          <Link to="/questions" className="footer-link">التوحيد</Link>
          <Link to="/questions" className="footer-link">أركان الإيمان</Link>
          <Link to="/questions" className="footer-link">العبادة</Link>
        </div>

        <div className="footer-column">
          <h4>تواصل معنا</h4>
          <a href="mailto:info@aqida.com" className="footer-link">info@aqida.com</a>
          <a href="#" className="footer-link">تويتر (X)</a>
          <a href="#" className="footer-link">تليجرام</a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - العقيدة</p>
      </div>
    </footer>
  );
};

export default Footer;
