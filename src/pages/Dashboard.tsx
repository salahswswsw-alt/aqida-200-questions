import { Link } from 'react-router-dom';
import { Brain, BookOpen, Star, LogOut, User, ChevronLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'زائر';

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <div className="dashboard-avatar">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="صورة المستخدم" />
            ) : (
              <User size={28} />
            )}
          </div>
          <div>
            <p className="dashboard-greeting">أهلاً وسهلاً،</p>
            <h1 className="dashboard-username">{displayName}</h1>
          </div>
        </div>
        <button className="btn btn-outline dashboard-logout" onClick={signOut}>
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>

      {/* Stats Row */}
      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <BookOpen size={22} />
          </div>
          <div>
            <p className="dashboard-stat-number">200</p>
            <p className="dashboard-stat-label">سؤال وجواب</p>
          </div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <Brain size={22} />
          </div>
          <div>
            <p className="dashboard-stat-number">50</p>
            <p className="dashboard-stat-label">سؤال اختبار</p>
          </div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon">
            <Star size={22} />
          </div>
          <div>
            <p className="dashboard-stat-number">11</p>
            <p className="dashboard-stat-label">قسمًا شاملًا</p>
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
          <div className="dashboard-feature-body">
            <h2 className="dashboard-feature-title">اختبر عقيدتك</h2>
            <p className="dashboard-feature-desc">
              اختبر معلوماتك وعلمك بالعقيدة الإسلامية بأسلوب السؤال والجواب المتعدد.
            </p>
            <span className="dashboard-feature-cta">
              ابدأ الاختبار الآن
              <ChevronLeft size={18} />
            </span>
          </div>
        </Link>

        {/* Questions Card */}
        <Link to="/questions" className="dashboard-feature-card">
          <div className="dashboard-feature-icon">
            <BookOpen size={36} />
          </div>
          <div className="dashboard-feature-body">
            <h2 className="dashboard-feature-title">استكشف الأسئلة</h2>
            <p className="dashboard-feature-desc">
              تصفَّح مئتي سؤال وجواب في العقيدة الإسلامية مقسَّمة إلى أقسام متعددة
              مع إمكانية البحث والتصفية.
            </p>
            <span className="dashboard-feature-cta">
              تصفح الأسئلة
              <ChevronLeft size={18} />
            </span>
          </div>
        </Link>
      </div>

      {/* Quick Links */}
      <div className="dashboard-quick-links">
        <h3 className="dashboard-section-title">روابط سريعة</h3>
        <div className="dashboard-links-grid">
          <Link to="/" className="dashboard-quick-link">
            الصفحة الرئيسية
          </Link>
          <Link to="/questions" className="dashboard-quick-link">
            جميع الأسئلة
          </Link>
          <Link to="/quiz" className="dashboard-quick-link">
            الاختبار التفاعلي
          </Link>
          <a
            href="https://drive.google.com/file/d/1EAf3Al8XSZjza1KNJ04-cFgnPtAdYd0F/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="dashboard-quick-link"
          >
            تحميل الكتاب PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
