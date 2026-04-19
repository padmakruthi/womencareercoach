import React, { useState } from 'react';
import { Save, Moon, Sun, Bell, Mail, User, Target, Trash2, CheckCircle } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';
import { updateCurrentUser, saveAssessment, getAssessment } from '../utils/storage';

const careerGoals = ['Web Developer', 'AI/ML Engineer', 'Data Scientist', 'UI/UX Designer', 'Digital Marketer', 'Cybersecurity Analyst', 'Other'];

const Settings: React.FC = () => {
  const { user, darkMode, toggleDarkMode, refreshUser } = useApp();
  const [name, setName] = useState(user?.name || '');
  const [careerGoal, setCareerGoal] = useState(user?.careerGoal || '');
  const [notifications, setNotifications] = useState(user?.preferences?.notifications ?? true);
  const [emailUpdates, setEmailUpdates] = useState(user?.preferences?.emailUpdates ?? true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!user) return;
    updateCurrentUser({
      name: name.trim() || user.name,
      careerGoal,
      preferences: { darkMode, notifications, emailUpdates },
    });
    refreshUser();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetAssessment = () => {
    if (window.confirm('Reset your skill assessment? Your roadmap progress will be kept.')) {
      localStorage.removeItem('wcc_assessment');
    }
  };

  const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</span>
      <button onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-gradient-to-r from-rose-500 to-violet-600' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );

  const Section = ({ title, icon: Icon, children }: any) => (
    <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 flex items-center justify-center">
          <Icon size={18} className="text-white" />
        </div>
        <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`font-display font-bold text-3xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Manage your account and preferences</p>
          </div>
          <button onClick={handleSave} className={`btn-primary ${saved ? '!from-emerald-500 !to-teal-500' : ''}`}>
            {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
          </button>
        </div>

        {/* Profile */}
        <Section title="Profile" icon={User}>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
            <input className="input-field" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <input className="input-field" value={user?.email || ''} disabled placeholder="Email" style={{ opacity: 0.6, cursor: 'not-allowed' }} />
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>Email cannot be changed</p>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Member Since</label>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'}
            </p>
          </div>
        </Section>

        {/* Career Goal */}
        <Section title="Career Goal" icon={Target}>
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Career Goal</label>
            <div className="grid grid-cols-2 gap-2">
              {careerGoals.map(goal => (
                <button key={goal} onClick={() => setCareerGoal(goal)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium border text-left transition-all ${
                    careerGoal === goal
                      ? 'bg-gradient-to-r from-rose-500 to-violet-600 text-white border-transparent'
                      : darkMode ? 'border-gray-700 text-gray-400 hover:border-rose-500/50' : 'border-gray-200 text-gray-700 hover:border-rose-300'
                  } ${goal === 'Other' ? 'col-span-2' : ''}`}>
                  {goal}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* Appearance */}
        <Section title="Appearance" icon={darkMode ? Moon : Sun}>
          <Toggle checked={darkMode} onChange={toggleDarkMode} label="Dark Mode" />
          <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {darkMode ? '🌙 Dark mode is active — easy on the eyes at night.' : '☀️ Light mode is active — clean and bright.'}
            </p>
          </div>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" icon={Bell}>
          <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} label="Push Notifications" />
          <Toggle checked={emailUpdates} onChange={() => setEmailUpdates(!emailUpdates)} label="Email Updates" />
        </Section>

        {/* Danger zone */}
        <div className={`rounded-2xl p-6 border-2 border-dashed ${darkMode ? 'border-rose-900/50 bg-rose-900/10' : 'border-rose-200 bg-rose-50/50'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Trash2 size={18} className="text-rose-500" />
            <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Danger Zone</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Reset Skill Assessment</p>
                <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Retake the assessment to update your roadmap</p>
              </div>
              <button onClick={handleResetAssessment} className="px-4 py-2 rounded-xl text-sm font-medium border border-rose-300 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-colors">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Save footer */}
        <div className="flex justify-end pb-6">
          <button onClick={handleSave} className={`btn-primary ${saved ? '!from-emerald-500 !to-teal-500' : ''}`}>
            {saved ? <><CheckCircle size={16} /> Changes Saved!</> : <><Save size={16} /> Save All Changes</>}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
