import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, ShieldCheck, LogOut, User, ClipboardList, Languages } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleLogout = async () => {
    closeMenu();
    await signOut();
    navigate('/');
  };

  const displayName =
    user?.user_metadata?.full_name?.split(' ')[0] ||
    user?.user_metadata?.name?.split(' ')[0] ||
    user?.email?.split('@')[0] ||
    '';

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" onClick={closeMenu}>
          <Logo />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>{t('nav.home')}</Link>
          <Link to="/questions" className={`nav-link ${isActive('/question') ? 'active' : ''}`}>{t('nav.allQuestions')}</Link>
          <Link to="/exam" className={`nav-link ${isActive('/exam') ? 'active' : ''}`}>
            <ClipboardList size={16} style={{ display: 'inline', margin: '0 4px', verticalAlign: 'middle' }} />
            {t('nav.exam')}
          </Link>
          <a href="#about" className="nav-link">{t('nav.about')}</a>
          <a href="#book" className="nav-link">{t('nav.book')}</a>
          {user && (
            <Link to="/quiz" className={`nav-link ${isActive('/quiz') ? 'active' : ''}`}>
              <ShieldCheck size={16} style={{ display: 'inline', margin: '0 4px', verticalAlign: 'middle' }} />
              {t('nav.testCreed')}
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="nav-actions desktop-only">
          <button 
            onClick={toggleLanguage} 
            className="nav-lang-btn"
            title={language === 'ar' ? 'English' : 'العربية'}
          >
            <Languages size={18} />
            <span>{language === 'ar' ? 'EN' : 'AR'}</span>
          </button>

          {user ? (
            <div className="nav-user-menu">
              <Link to="/dashboard" className="nav-user-btn">
                <div className="nav-avatar">
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="" />
                  ) : (
                    <User size={16} />
                  )}
                </div>
                <span>{displayName}</span>
                <LayoutDashboard size={16} />
              </Link>
              <button className="nav-logout-btn" onClick={handleLogout} title={t('nav.logout')}>
                <LogOut size={18} />
              </button>
            </div>
          ) : null}
        </div>

        {/* Mobile Toggle */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} className="mobile-only">
          <button 
            onClick={toggleLanguage} 
            className="nav-lang-btn"
            style={{ padding: '0.5rem', borderRadius: '8px' }}
          >
            <Languages size={20} />
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{language === 'ar' ? 'EN' : 'AR'}</span>
          </button>
          <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.home')}</Link>
        <Link to="/questions" className={`nav-link ${isActive('/question') ? 'active' : ''}`} onClick={closeMenu}>{t('nav.allQuestions')}</Link>
        <Link to="/exam" className={`nav-link ${isActive('/exam') ? 'active' : ''}`} onClick={closeMenu}>
          <ClipboardList size={15} style={{ display: 'inline', margin: '0 4px', verticalAlign: 'middle' }} />
          {t('nav.exam')}
        </Link>
        <a href="#about" className="nav-link" onClick={closeMenu}>{t('nav.about')}</a>
        <a href="#book" className="nav-link" onClick={closeMenu}>{t('nav.book')}</a>
        {user && (
          <Link to="/quiz" className={`nav-link ${isActive('/quiz') ? 'active' : ''}`} onClick={closeMenu}>
            {t('nav.testCreed')}
          </Link>
        )}
        <div className="mobile-menu-divider" />
        {user ? (
          <>
            <Link to="/dashboard" className="nav-btn" onClick={closeMenu}
              style={{ background: 'var(--color-sky)', color: '#fff', border: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <LayoutDashboard size={16} />
              {t('nav.dashboard')}
            </Link>
            <button onClick={handleLogout} className="nav-btn"
              style={{ background: 'transparent', border: '1px solid var(--color-border)', textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <LogOut size={16} />
              {t('nav.logout')}
            </button>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
