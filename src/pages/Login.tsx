import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { useLanguage } from '../contexts/LanguageContext';

const Login = () => {
  const { signInWithEmail, signInWithGoogle, user } = useAuth();
  const { addNotification } = useNotification();
  const { t, dir } = useLanguage();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const validate = () => {
    const errs: { email?: string; password?: string } = {};
    if (!email) errs.email = t('auth.email_required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t('auth.email_invalid');
    if (!password) errs.password = t('auth.password_required');
    else if (password.length < 6) errs.password = t('auth.password_short');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      addNotification({
        type: 'success',
        title: t('auth.success_login_title'),
        message: t('auth.success_login_msg')
      });
      navigate('/dashboard');
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: t('auth.error_login_title'),
        message: err.message || t('auth.error_login_title')
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
        title: t('auth.error_login_title'),
        message: t('auth.error_google_msg')
      });
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header" style={{ textAlign: 'center' }}>
          <div className="auth-icon-wrapper" style={{ margin: '0 auto 1rem' }}>
            <LogIn size={28} />
          </div>
          <h1 className="auth-title">{t('auth.login.title')}</h1>
          <p className="auth-subtitle">{t('auth.welcome')}</p>
        </div>

        <button
          type="button"
          className="btn-social"
          onClick={handleGoogle}
          disabled={loading}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" fill="#FFC107" />
            <path d="m6.306 14.691l6.571 4.819C14.655 15.108 19.000 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" fill="#FF3D00" />
            <path d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" fill="#4CAF50" />
            <path d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" fill="#1976D2" />
          </svg>
          {t('auth.login_google')}
        </button>

        <div className="auth-divider">
          <span>{t('auth.or_email')}</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
                autoComplete="current-password"
                dir="ltr"
                style={{ [dir === 'rtl' ? 'paddingRight' : 'paddingLeft']: '3.5rem' } as any}
              />
              <button
                type="button"
                className="form-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="إظهار/إخفاء كلمة المرور"
                style={{ [dir === 'rtl' ? 'left' : 'right']: '1.25rem' } as any}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="form-error" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? <span className="btn-spinner" /> : <LogIn size={18} />}
            {loading ? t('auth.loading') : t('auth.login.button')}
          </button>
        </form>

        <p className="auth-footer-text" style={{ textAlign: 'center' }}>
          {t('auth.no_account')}{' '}
          <Link to="/register" className="auth-link">{t('nav.register')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
