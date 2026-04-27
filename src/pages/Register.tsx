import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';

const Register = () => {
  const { signUpWithEmail, signInWithGoogle, user } = useAuth();
  const { addNotification } = useNotification();
  const { t, language, dir } = useLanguage();
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
      { level: 1, label: t('auth.pwd_weak'), color: '#ef4444' },
      { level: 2, label: t('auth.pwd_medium'), color: '#f97316' },
      { level: 3, label: t('auth.pwd_good'), color: '#eab308' },
      { level: 4, label: t('auth.pwd_strong'), color: '#22c55e' },
    ];
    return map[score];
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!fullName.trim()) errs.fullName = t('auth.name_required');
    if (!email) errs.email = t('auth.email_required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t('auth.email_invalid');
    if (!password) errs.password = t('auth.password_required');
    else if (password.length < 6) errs.password = t('auth.password_short');
    if (password !== confirmPassword) errs.confirmPassword = t('auth.passwords_not_match');
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
        title: t('auth.success_reg_title'),
        message: t('auth.success_reg_msg')
      });
      navigate('/dashboard');
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: t('auth.error_reg_title'),
        message: err.message || t('auth.error_reg_title')
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
        title: t('auth.error_reg_title'),
        message: t('auth.error_google_msg')
      });
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header" style={{ textAlign: 'center' }}>
          <div className="auth-icon-wrapper" style={{ margin: '0 auto 1rem' }}>
            <UserPlus size={28} />
          </div>
          <h1 className="auth-title">{t('auth.register.title')}</h1>
          <p className="auth-subtitle">{t('auth.register.subtitle') || (language === 'ar' ? 'انضم إلى منصة العقيدة واستفد من محتواها' : 'Join the Aqida platform and benefit from its content')}</p>
        </div>

        <button
          type="button"
          className="btn-social"
          onClick={handleGoogle}
          disabled={loading}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107"/>
            <path d="m6.306 14.691l6.571 4.819C14.655 15.108 19.000 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00"/>
            <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50"/>
            <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2"/>
          </svg>
          {t('auth.login_google')}
        </button>

        <div className="auth-divider">
          <span>{t('auth.or_email')}</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="fullName" style={{ textAlign: dir === 'rtl' ? 'right' : 'left', display: 'block' }}>
              {t('auth.register.name') || (language === 'ar' ? 'الاسم الكامل' : 'Full Name')}
            </label>
            <div className="form-input-wrapper">
              <span className="form-input-icon" style={{ [dir === 'rtl' ? 'right' : 'left']: '1.25rem' } as any}>
                <User size={18} />
              </span>
              <input
                id="fullName"
                type="text"
                className={`auth-input ${errors.fullName ? 'auth-input--error' : ''}`}
                placeholder={language === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                value={fullName}
                onChange={e => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: undefined })); }}
                style={{ [dir === 'rtl' ? 'paddingRight' : 'paddingLeft']: '3.5rem' } as any}
              />
            </div>
            {errors.fullName && <p className="form-error" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{errors.fullName}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="email" style={{ textAlign: dir === 'rtl' ? 'right' : 'left', display: 'block' }}>
              {t('auth.login.email')}
            </label>
            <div className="form-input-wrapper">
              <span className="form-input-icon" style={{ [dir === 'rtl' ? 'right' : 'left']: '1.25rem' } as any}>
                <Mail size={18} />
              </span>
              <input
                id="email"
                type="email"
                className={`auth-input ${errors.email ? 'auth-input--error' : ''}`}
                placeholder="example@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                autoComplete="email"
                dir="ltr"
                style={{ [dir === 'rtl' ? 'paddingRight' : 'paddingLeft']: '3.5rem' } as any}
              />
            </div>
            {errors.email && <p className="form-error" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{errors.email}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="password" style={{ textAlign: dir === 'rtl' ? 'right' : 'left', display: 'block' }}>
              {t('auth.login.password')}
            </label>
            <div className="form-input-wrapper">
              <span className="form-input-icon" style={{ [dir === 'rtl' ? 'right' : 'left']: '1.25rem' } as any}>
                <Lock size={18} />
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`auth-input ${errors.password ? 'auth-input--error' : ''}`}
                placeholder="••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
                autoComplete="new-password"
                dir="ltr"
                style={{ [dir === 'rtl' ? 'paddingRight' : 'paddingLeft']: '3.5rem' } as any}
              />
              <button
                type="button"
                className="form-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{ [dir === 'rtl' ? 'left' : 'right']: '1.25rem' } as any}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {password && (
              <div className="password-strength">
                <div className="password-strength-bar" style={{ direction: 'ltr' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="password-strength-segment"
                      style={{ background: strength.level >= i ? strength.color : 'rgba(255,255,255,0.1)' }}
                    />
                  ))}
                </div>
                <span className="password-strength-label" style={{ color: strength.color, textAlign: dir === 'rtl' ? 'right' : 'left', display: 'block' }}>
                  {strength.label}
                </span>
              </div>
            )}
            {errors.password && <p className="form-error" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{errors.password}</p>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="confirmPassword" style={{ textAlign: dir === 'rtl' ? 'right' : 'left', display: 'block' }}>
              {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
            </label>
            <div className="form-input-wrapper">
              <span className="form-input-icon" style={{ [dir === 'rtl' ? 'right' : 'left']: '1.25rem' } as any}>
                <Lock size={18} />
              </span>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                className={`auth-input ${errors.confirmPassword ? 'auth-input--error' : ''}`}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setErrors(p => ({ ...p, confirmPassword: undefined })); }}
                autoComplete="new-password"
                dir="ltr"
                style={{ [dir === 'rtl' ? 'paddingRight' : 'paddingLeft']: '3.5rem' } as any}
              />
            </div>
            {errors.confirmPassword && <p className="form-error" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{errors.confirmPassword}</p>}
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? <span className="btn-spinner" /> : <UserPlus size={18} />}
            {loading ? t('auth.loading') : t('auth.register.button')}
          </button>
        </form>

        <p className="auth-footer-text" style={{ textAlign: 'center' }}>
          {t('auth.have_account')}{' '}
          <Link to="/login" className="auth-link">{t('nav.login')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
