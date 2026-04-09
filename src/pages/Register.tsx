import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const Register = () => {
  const { signUpWithEmail, signInWithGoogle, user } = useAuth();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string; email?: string; password?: string; confirmPassword?: string;
  }>({});

  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { level: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const map = [
      { level: 0, label: '', color: '' },
      { level: 1, label: 'ضعيفة', color: '#ef4444' },
      { level: 2, label: 'متوسطة', color: '#f97316' },
      { level: 3, label: 'جيدة', color: '#eab308' },
      { level: 4, label: 'قوية', color: '#22c55e' },
    ];
    return map[score];
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!fullName.trim()) errs.fullName = 'الاسم مطلوب';
    if (!email) errs.email = 'البريد الإلكتروني مطلوب';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'صيغة البريد غير صحيحة';
    if (!password) errs.password = 'كلمة المرور مطلوبة';
    else if (password.length < 6) errs.password = 'كلمة المرور 6 أحرف على الأقل';
    if (password !== confirmPassword) errs.confirmPassword = 'كلمتا المرور غير متطابقتين';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await signUpWithEmail(email, password, fullName);
      addNotification({
        type: 'success',
        title: 'تم إنشاء الحساب',
        message: 'أهلاً بك في منصة العقيدة، تم التسجيل بنجاح'
      });
      navigate('/dashboard');
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: 'خطأ في التسجيل',
        message: err.message || 'حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: 'خطأ في التسجيل',
        message: 'فشل الاتصال بـ Google، حاول مرة أخرى'
      });
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon-wrapper">
            <UserPlus size={28} />
          </div>
          <h1 className="auth-title">إنشاء حساب جديد</h1>
          <p className="auth-subtitle">انضم إلى منصة العقيدة واستفد من محتواها</p>
        </div>

        <button
          type="button"
          className="btn-social"
          onClick={handleGoogle}
          disabled={loading}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
            <path d="m6.306 14.691l6.571 4.819C14.655 15.108 19.000 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
            <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
            <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
          </svg>
          تسجيل بواسطة Google
        </button>

        <div className="auth-divider">
          <span>أو عبر البريد الإلكتروني</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="fullName">الاسم الكامل</label>
            <div className="form-input-wrapper">
              <span className="form-input-icon"><User size={18} /></span>
              <input
                id="fullName"
                type="text"
                className={`auth-input ${errors.fullName ? 'auth-input--error' : ''}`}
                placeholder="اسمك الكامل"
                value={fullName}
                onChange={e => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: undefined })); }}
              />
            </div>
            {errors.fullName && <p className="form-error">{errors.fullName}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="email">البريد الإلكتروني</label>
            <div className="form-input-wrapper">
              <span className="form-input-icon"><Mail size={18} /></span>
              <input
                id="email"
                type="email"
                className={`auth-input ${errors.email ? 'auth-input--error' : ''}`}
                placeholder="example@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                autoComplete="email"
                dir="ltr"
              />
            </div>
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="password">كلمة المرور</label>
            <div className="form-input-wrapper">
              <span className="form-input-icon"><Lock size={18} /></span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`auth-input ${errors.password ? 'auth-input--error' : ''}`}
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
                autoComplete="new-password"
                dir="ltr"
              />
              <button
                type="button"
                className="form-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {password && (
              <div className="password-strength">
                <div className="password-strength-bar">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="password-strength-segment"
                      style={{ background: strength.level >= i ? strength.color : 'rgba(255,255,255,0.1)' }}
                    />
                  ))}
                </div>
                <span className="password-strength-label" style={{ color: strength.color }}>
                  {strength.label}
                </span>
              </div>
            )}
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="confirmPassword">تأكيد كلمة المرور</label>
            <div className="form-input-wrapper">
              <span className="form-input-icon"><Lock size={18} /></span>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                className={`auth-input ${errors.confirmPassword ? 'auth-input--error' : ''}`}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: undefined })); }}
                autoComplete="new-password"
                dir="ltr"
              />
            </div>
            {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : <UserPlus size={18} />}
            {loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب'}
          </button>
        </form>

        <p className="auth-footer-text">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="auth-link">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
