import { Link } from 'react-router-dom';
import { Brain, BookOpen, Star, LogOut, User, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { t, language, dir } = useLanguage();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    t('dash.visitor');

  const ArrowIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header" style={{ flexDirection: dir === 'rtl' ? 'row' : 'row' }}>
        <div className="dashboard-welcome" style={{ flexDirection: dir === 'rtl' ? 'row' : 'row' }}>
          <div className="dashboard-avatar">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt={language === 'ar' ? "صورة المستخدم" : "User avatar"} />
            ) : (
              <User size={28} />
            )}
          </div>
          <div style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
            <p className="dashboard-greeting">{t('dash.welcome')}</p>
            <h1 className="dashboard-username">{displayName}</h1>
          </div>
        </div>
        <button className="btn btn-outline dashboard-logout" onClick={signOut} style={{ gap: '0.5rem' }}>
          <LogOut size={18} />
          {t('dash.logout')}
        </button>
      </div>

      {/* Stats Row */}
      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <BookOpen size={22} />
          </div>
          <div style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
            <p className="dashboard-stat-number">200</p>
            <p className="dashboard-stat-label">{t('dash.stat_qa')}</p>
          </div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <Brain size={22} />
          </div>
          <div style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
            <p className="dashboard-stat-number">50</p>
            <p className="dashboard-stat-label">{t('dash.stat_quiz')}</p>
          </div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <Star size={22} />
          </div>
          <div style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
            <p className="dashboard-stat-number">11</p>
            <p className="dashboard-stat-label">{t('dash.stat_sections')}</p>
          </div>
        </div>
      </div>

      {/* Main Cards */}
      <div className="dashboard-cards">
        {/* Quiz Card */}
        <Link to="/quiz" className="dashboard-feature-card dashboard-feature-card--primary">
          <div className="dashboard-feature-icon">
            <ShieldCheck size={36} />
          </div>
          <div className="dashboard-feature-body" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
            <h2 className="dashboard-feature-title">{t('dash.quiz_title')}</h2>
            <p className="dashboard-feature-desc">
              {t('dash.quiz_desc')}
            </p>
            <span className="dashboard-feature-cta" style={{ justifyContent: language === 'ar' ? 'flex-start' : 'flex-end' }}>
              {t('dash.quiz_cta')}
              <ArrowIcon size={18} />
            </span>
          </div>
        </Link>

        {/* Questions Card */}
        <Link to="/questions" className="dashboard-feature-card">
          <div className="dashboard-feature-icon">
            <BookOpen size={36} />
          </div>
          <div className="dashboard-feature-body" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>
            <h2 className="dashboard-feature-title">{t('dash.browse_title')}</h2>
            <p className="dashboard-feature-desc">
              {t('dash.browse_desc')}
            </p>
            <span className="dashboard-feature-cta" style={{ justifyContent: language === 'ar' ? 'flex-start' : 'flex-end' }}>
              {t('dash.browse_cta')}
              <ArrowIcon size={18} />
            </span>
          </div>
        </Link>
      </div>

      {/* Quick Links */}
      <div className="dashboard-quick-links">
        <h3 className="dashboard-section-title" style={{ textAlign: language === 'ar' ? 'right' : 'left' }}>{t('dash.quick_links')}</h3>
        <div className="dashboard-links-grid">
          <Link to="/" className="dashboard-quick-link">
            {t('dash.home')}
          </Link>
          <Link to="/questions" className="dashboard-quick-link">
            {t('nav.allQuestions')}
          </Link>
          <Link to="/quiz" className="dashboard-quick-link">
            {t('dash.interactive')}
          </Link>
          <a
            href="https://drive.google.com/file/d/1EAf3Al8XSZjza1KNJ04-cFgnPtAdYd0F/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-quick-link"
          >
            {t('dash.download')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
