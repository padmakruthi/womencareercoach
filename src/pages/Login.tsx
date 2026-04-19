import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getUserByEmail } from '../utils/storage';
import Navbar from '../components/Navbar';

const Login: React.FC = () => {
  const { darkMode, setUser } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [globalErr, setGlobalErr] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setGlobalErr('');
    await new Promise(r => setTimeout(r, 800));
    const user = getUserByEmail(form.email);
    if (!user || user.password !== form.password) {
      setGlobalErr('Invalid email or password.');
      setLoading(false);
      return;
    }
    setUser(user);
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className={`rounded-3xl p-8 shadow-2xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-violet-600 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={24} className="text-white" />
              </div>
              <h1 className={`font-display font-bold text-3xl mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Welcome Back</h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Continue your career journey</p>
            </div>

            {globalErr && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 dark:bg-rose-900/20 dark:border-rose-800">
                <p className="text-rose-600 dark:text-rose-400 text-sm">{globalErr}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                />
                {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    className="input-field pr-10"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password}</p>}
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                {loading ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</span>
                ) : (
                  <span className="flex items-center gap-2">Sign In <ArrowRight size={16} /></span>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Don't have an account?{' '}
                <Link to="/signup" className="text-rose-500 font-semibold hover:text-rose-600">Create one free</Link>
              </p>
            </div>

            {/* Demo hint */}
            <div className={`mt-4 p-3 rounded-xl text-xs ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
              💡 New here? <Link to="/signup" className="text-rose-500 font-medium">Create a free account</Link> to get started with your personalized roadmap.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
