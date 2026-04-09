import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column" style={{ maxWidth: '300px' }}>
          <Logo />
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '1rem' }}>
            منصة تعليمية تهدف إلى تبسيط وتقريب مسائل العقيدة بأسلوب عصري سهل وفق منهج أهل السنة والجماعة.
          </p>
        </div>

        <div className="footer-column">
          <h4>روابط سريعة</h4>
          <Link to="/" className="footer-link">الرئيسية</Link>
          <Link to="/questions" className="footer-link">استكشف الأسئلة</Link>
          <Link to="/quiz" className="footer-link">اختبر عقيدتك</Link>
          <a href="#about" className="footer-link">عن المنصة</a>
        </div>

        <div className="footer-column">
          <h4>الأقسام</h4>
          <Link to="/questions" className="footer-link">التوحيد</Link>
          <Link to="/questions" className="footer-link">أركان الإيمان</Link>
          <Link to="/questions" className="footer-link">الأسماء والصفات</Link>
          <Link to="/questions" className="footer-link">اليوم الآخر</Link>
        </div>

        <div className="footer-column">
          <h4>الحساب</h4>
          <Link to="/login" className="footer-link">تسجيل الدخول</Link>
          <Link to="/register" className="footer-link">إنشاء حساب</Link>
          <Link to="/dashboard" className="footer-link">لوحة التحكم</Link>
          <a href="mailto:info@aqida.com" className="footer-link">info@aqida.com</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} - العقيدة</p>
      </div>
    </footer>
  );
};

export default Footer;
