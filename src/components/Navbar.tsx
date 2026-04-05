import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <Logo />
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>الرئيسية</Link>
          <Link to="/questions" className={`nav-link ${location.pathname.includes('/question') ? 'active' : ''}`}>جميع الأسئلة</Link>
          <a href="#about" className="nav-link">عن المعلم</a>
          <a href="#book" className="nav-link">الكتاب</a>
        </div>
        <div>
          <a href="#contact" className="nav-btn" style={{ background: 'var(--color-gold)', color: 'var(--color-bg-dark)', border: 'none' }}>
            تواصل معنا
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
