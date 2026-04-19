import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getUserByEmail, saveUser, setCurrentUser, generateId } from '../utils/storage';
import { User } from '../data/types';
import Navbar from '../components/Navbar';

const careerGoals = [
  'Web Developer', 'AI/ML Engineer', 'Data Scientist',
  'UI/UX Designer', 'Digital Marketer', 'Cybersecurity Analyst', 'Not sure yet'
];

const Signup: React.FC = () => {
  const { darkMode, setUser } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', careerGoal: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    else if (getUserByEmail(form.email)) errs.email = 'Email already registered';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Minimum 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep1();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const user: User = {
      id: generateId(),
      name: form.name.trim(),
      email: form.email,
      password: form.password,
      careerGoal: form.careerGoal || undefined,
      joinedAt: new Date().toISOString(),
      preferences: { darkMode: false, notifications: true, emailUpdates: true },
    };
    saveUser(user);
    setUser(user);
    navigate('/assessment');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-md">
          <div className={`rounded-3xl p-8 shadow-2xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-violet-600 flex items-center justify-center mx-auto mb-4">
                <Sparkles size={24} className="text-white" />
              </div>
              <h1 className={`font-display font-bold text-3xl mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {step === 1 ? 'Create Account' : 'Your Career Goal'}
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {step === 1 ? 'Join 12,000+ women building their dream careers' : 'Help us personalize your roadmap'}
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2].map(s => (
                <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${s <= step ? 'bg-gradient-to-r from-rose-500 to-violet-600' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              ))}
            </div>

            {step === 1 ? (
              <form onSubmit={handleStep1} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                  <input className="input-field" placeholder="Priya Sharma" value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  {errors.name && <p className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                  <input type="email" className="input-field" placeholder="you@example.com" value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                  {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} className="input-field pr-10" placeholder="Min 6 characters"
                      value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm Password</label>
                  <input type="password" className="input-field" placeholder="Repeat password"
                    value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))} />
                  {errors.confirmPassword && <p className="mt-1 text-xs text-rose-500">{errors.confirmPassword}</p>}
                </div>

                <button type="submit" className="btn-primary w-full justify-center py-3.5 mt-2">
                  Continue <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Which career are you most interested in?</p>
                <div className="grid grid-cols-2 gap-2">
                  {careerGoals.map(goal => (
                    <button key={goal} onClick={() => setForm(p => ({ ...p, careerGoal: goal }))}
                      className={`p-3 rounded-xl text-sm font-medium text-left transition-all border ${
                        form.careerGoal === goal
                          ? 'bg-gradient-to-r from-rose-500 to-violet-600 text-white border-transparent'
                          : darkMode ? 'border-gray-700 text-gray-400 hover:border-rose-500/50' : 'border-gray-200 text-gray-700 hover:border-rose-300'
                      } ${goal === 'Not sure yet' ? 'col-span-2' : ''}`}>
                      {goal}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">Back</button>
                  <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 justify-center">
                    {loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating...</span>
                      : <span className="flex items-center gap-2">Start My Journey <Sparkles size={14} /></span>}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Already have an account?{' '}
                <Link to="/login" className="text-rose-500 font-semibold hover:text-rose-600">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
