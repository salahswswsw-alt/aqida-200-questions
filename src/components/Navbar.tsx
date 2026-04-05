import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" onClick={closeMenu}>
          <Logo />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>الرئيسية</Link>
          <Link to="/questions" className={`nav-link ${location.pathname.includes('/question') ? 'active' : ''}`}>جميع الأسئلة</Link>
          <a href="#about" className="nav-link">عن المنصة</a>
          <a href="#book" className="nav-link">الكتاب</a>
        </div>

        <div className="nav-actions desktop-only">
          <a href="#contact" className="nav-btn" style={{ background: 'var(--color-gold)', color: 'var(--color-bg-dark)', border: 'none' }}>
            تواصل معنا
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>الرئيسية</Link>
        <Link to="/questions" className={`nav-link ${location.pathname.includes('/question') ? 'active' : ''}`} onClick={closeMenu}>جميع الأسئلة</Link>
        <a href="#about" className="nav-link" onClick={closeMenu}>عن المنصة</a>
        <a href="#book" className="nav-link" onClick={closeMenu}>الكتاب</a>
        <a href="#contact" className="nav-btn" onClick={closeMenu} style={{ background: 'var(--color-gold)', color: 'var(--color-bg-dark)', border: 'none', textAlign: 'center', marginTop: '1rem' }}>
          تواصل معنا
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
