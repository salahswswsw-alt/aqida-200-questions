import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LayoutDashboard, ShieldCheck, LogOut, User, ClipboardList } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

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
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>الرئيسية</Link>
          <Link to="/questions" className={`nav-link ${isActive('/question') ? 'active' : ''}`}>جميع الأسئلة</Link>
          <Link to="/exam" className={`nav-link ${isActive('/exam') ? 'active' : ''}`}>
            <ClipboardList size={16} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
            اختبار
          </Link>
          <a href="#about" className="nav-link">عن المنصة</a>
          <a href="#book" className="nav-link">الكتاب</a>
          {user && (
            <Link to="/quiz" className={`nav-link ${isActive('/quiz') ? 'active' : ''}`}>
              <ShieldCheck size={16} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
              اختبر عقيدتك
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="nav-actions desktop-only">
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
              <button className="nav-logout-btn" onClick={handleLogout} title="تسجيل الخروج">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Link to="/login" className="nav-btn nav-btn--outline">
                <LogIn size={16} />
                دخول
              </Link>
              <Link to="/register" className="nav-btn nav-btn--primary">
                إنشاء حساب
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>الرئيسية</Link>
        <Link to="/questions" className={`nav-link ${isActive('/question') ? 'active' : ''}`} onClick={closeMenu}>جميع الأسئلة</Link>
        <Link to="/exam" className={`nav-link ${isActive('/exam') ? 'active' : ''}`} onClick={closeMenu}>
          <ClipboardList size={15} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
          اختبار
        </Link>
        <a href="#about" className="nav-link" onClick={closeMenu}>عن المنصة</a>
        <a href="#book" className="nav-link" onClick={closeMenu}>الكتاب</a>
        {user && (
          <Link to="/quiz" className={`nav-link ${isActive('/quiz') ? 'active' : ''}`} onClick={closeMenu}>
            اختبر عقيدتك
          </Link>
        )}
        <div className="mobile-menu-divider" />
        {user ? (
          <>
            <Link to="/dashboard" className="nav-btn" onClick={closeMenu}
              style={{ background: 'var(--color-sky)', color: '#fff', border: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <LayoutDashboard size={16} />
              لوحة التحكم
            </Link>
            <button onClick={handleLogout} className="nav-btn"
              style={{ background: 'transparent', border: '1px solid var(--color-border)', textAlign: 'center', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <LogOut size={16} />
              تسجيل الخروج
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn" onClick={closeMenu}
              style={{ textAlign: 'center', border: '1px solid var(--color-sky)', color: 'var(--color-sky)', display: 'block' }}>
              تسجيل الدخول
            </Link>
            <Link to="/register" className="nav-btn" onClick={closeMenu}
              style={{ background: 'var(--color-sky)', color: '#fff', border: 'none', textAlign: 'center', display: 'block', marginTop: '0.5rem' }}>
              إنشاء حساب
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
