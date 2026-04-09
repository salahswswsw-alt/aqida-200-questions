import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useNotification } from './NotificationContext';

const IS_PLACEHOLDER = import.meta.env.VITE_SUPABASE_URL?.includes('placeholder');

// Local auth storage helpers
interface LocalUser { id: string; email: string; full_name: string; password: string; }
const LOCAL_USERS_KEY = 'aqida_local_users';
const LOCAL_SESSION_KEY = 'aqida_local_session';

function getLocalUsers(): LocalUser[] {
  try { return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) || '[]'); } catch { return []; }
}
function saveLocalUsers(users: LocalUser[]) {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}
function getLocalSession(): LocalUser | null {
  try { return JSON.parse(localStorage.getItem(LOCAL_SESSION_KEY) || 'null'); } catch { return null; }
}
function saveLocalSession(user: LocalUser | null) {
  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(user));
}
function localUserToUser(u: LocalUser): User {
  return { id: u.id, email: u.email, user_metadata: { full_name: u.full_name } } as unknown as User;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    if (IS_PLACEHOLDER) {
      // Restore local session if exists
      const stored = getLocalSession();
      if (stored) setUser(localUserToUser(stored));
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(err => {
      console.error('Supabase getSession error:', err);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    if (IS_PLACEHOLDER) {
      const users = getLocalUsers();
      const found = users.find(u => u.email === email && u.password === password);
      if (!found) {
        addNotification({ type: 'error', title: 'خطأ في تسجيل الدخول', message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة.' });
        throw new Error('Invalid credentials');
      }
      saveLocalSession(found);
      setUser(localUserToUser(found));
      addNotification({ type: 'success', title: 'أهلاً وسهلاً!', message: 'تم تسجيل الدخول بنجاح.' });
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      addNotification({ type: 'error', title: 'خطأ في تسجيل الدخول', message: translateError(error.message) });
      throw error;
    }
    addNotification({ type: 'success', title: 'أهلاً وسهلاً!', message: 'تم تسجيل الدخول بنجاح.' });
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    if (IS_PLACEHOLDER) {
      const users = getLocalUsers();
      if (users.find(u => u.email === email)) {
        addNotification({ type: 'error', title: 'خطأ', message: 'هذا البريد الإلكتروني مسجل مسبقاً.' });
        throw new Error('User already registered');
      }
      const newUser: LocalUser = { id: crypto.randomUUID(), email, full_name: fullName, password };
      saveLocalUsers([...users, newUser]);
      saveLocalSession(newUser);
      setUser(localUserToUser(newUser));
      addNotification({ type: 'success', title: 'تم إنشاء الحساب!', message: `أهلاً بك ${fullName}، تم التسجيل بنجاح.` });
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) {
      addNotification({ type: 'error', title: 'خطأ في إنشاء الحساب', message: translateError(error.message) });
      throw error;
    }
    addNotification({ type: 'success', title: 'تم إنشاء الحساب!', message: 'يرجى التحقق من بريدك الإلكتروني لتفعيل الحساب.' });
  };

  const signInWithGoogle = async () => {
    if (IS_PLACEHOLDER) {
      addNotification({ type: 'error', title: 'غير متاح', message: 'تسجيل الدخول بـ Google يحتاج إعداد Supabase. استخدم البريد الإلكتروني.' });
      throw new Error('Google sign-in not available in local mode');
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) {
      addNotification({ type: 'error', title: 'خطأ', message: translateError(error.message) });
      throw error;
    }
  };

  const signOut = async () => {
    if (IS_PLACEHOLDER) {
      saveLocalSession(null);
      setUser(null);
      addNotification({ type: 'info', title: 'تم تسجيل الخروج', message: 'نراك قريباً!' });
      return;
    }
    await supabase.auth.signOut();
    addNotification({ type: 'info', title: 'تم تسجيل الخروج', message: 'نراك قريباً!' });
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function translateError(msg: string): string {
  if (msg.includes('Invalid login credentials')) return 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
  if (msg.includes('Email not confirmed')) return 'يرجى تأكيد بريدك الإلكتروني أولاً.';
  if (msg.includes('User already registered')) return 'هذا البريد الإلكتروني مسجل مسبقاً.';
  if (msg.includes('Password should be at least')) return 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.';
  if (msg.includes('Unable to validate email')) return 'صيغة البريد الإلكتروني غير صحيحة.';
  return msg;
}
