import React, { useState } from 'react';
import { FileText, CheckCircle, AlertCircle, Link2, Download, Star, ChevronDown, ChevronUp } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';

const resumeTips = [
  { icon: '🎯', title: 'Tailor to Each Job', desc: 'Customize your resume for every application. Match keywords from the job description—ATS systems scan for exact terms.' },
  { icon: '📊', title: 'Quantify Your Impact', desc: 'Replace vague phrases with numbers. "Improved performance" → "Reduced load time by 40%, increasing user retention by 25%"' },
  { icon: '📝', title: 'Strong Summary Statement', desc: 'Lead with a 2-3 sentence career summary that instantly communicates who you are, what you do, and what you bring.' },
  { icon: '⚡', title: 'Action Verbs First', desc: 'Start every bullet with a power verb: Built, Led, Designed, Implemented, Optimized, Automated, Launched, Reduced.' },
  { icon: '📏', title: 'Length Rules', desc: 'Under 5 years experience: 1 page max. 5-10 years: 1-2 pages. Never go beyond 2 pages for non-executive roles.' },
  { icon: '🔍', title: 'ATS Optimization', desc: 'Use standard section headers, avoid tables/columns/graphics, save as PDF or .docx, include skills section with relevant keywords.' },
];

const portfolioTips = [
  { icon: '🌐', title: 'Build a Personal Site', desc: 'Use GitHub Pages, Vercel, or Netlify for free hosting. Your domain: yourname.com or yourname.dev' },
  { icon: '📂', title: 'Case Studies', desc: 'For each project, document the Problem → Process → Solution → Results. This shows how you think, not just what you built.' },
  { icon: '⭐', title: 'Quality over Quantity', desc: '3-4 outstanding projects beat 10 mediocre ones. Recruiters spend ~90 seconds on a portfolio.' },
  { icon: '🔗', title: 'GitHub Profile', desc: 'Pin your best repos, write clear READMEs, keep green contribution graph. Recruiters will check this.' },
];

const linkedinTips = [
  '📸 Professional photo — profiles with photos get 21x more views',
  '🎯 Headline: not just your title. "Aspiring ML Engineer | Python | TensorFlow | Open to Opportunities"',
  '✍️ Write your About section in first person — tell your story with passion',
  '💼 Add all projects with descriptions, technologies, and links',
  '⭐ Request 5+ recommendations from colleagues, professors, or mentors',
  '🤝 Connect with 5 people in your target field every week',
  '📢 Post about your learning journey — builds in-public credibility',
];

const mistakes = [
  { icon: '❌', mistake: 'Generic objective statement', fix: 'Use a specific, value-driven summary instead' },
  { icon: '❌', mistake: 'Listing duties, not achievements', fix: 'Show impact with metrics and outcomes' },
  { icon: '❌', mistake: 'Fancy templates with graphics', fix: 'Use clean, ATS-friendly single-column format' },
  { icon: '❌', mistake: 'Including photos or age/gender', fix: 'Keep it professional and bias-proof' },
  { icon: '❌', mistake: 'Typos and grammatical errors', fix: 'Use Grammarly and ask someone to proofread' },
  { icon: '❌', mistake: 'Email like "partygirl99@..."', fix: 'Use firstname.lastname@gmail.com' },
];

const ResumeGuide: React.FC = () => {
  const { darkMode } = useApp();
  const [activeTab, setActiveTab] = useState<'resume' | 'portfolio' | 'linkedin' | 'mistakes'>('resume');

  const tabs = [
    { id: 'resume', label: '📄 Resume Tips', icon: FileText },
    { id: 'portfolio', label: '🌐 Portfolio', icon: Star },
    { id: 'linkedin', label: '💼 LinkedIn', icon: Link2 },
    { id: 'mistakes', label: '⚠️ Mistakes', icon: AlertCircle },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className={`font-display font-bold text-3xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Resume Guidance</h1>
            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>ATS-optimized tips to land more interviews</p>
          </div>
          {/* Download card */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-rose-300 dark:border-rose-800 text-rose-500 text-sm font-medium hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-colors">
            <Download size={16} /> Resume Template
          </button>
        </div>

        {/* ATS score card */}
        <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.08), rgba(124,58,237,0.08))', border: '1px solid rgba(244,63,94,0.2)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-rose-500 to-violet-600 flex items-center justify-center">
              <CheckCircle size={18} className="text-white" />
            </div>
            <div>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>ATS Compatibility Checklist</h3>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Make sure your resume passes automated screening</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2 mt-4">
            {['Standard section headers (Experience, Education, Skills)', 'No tables, columns, or text boxes', 'Saved as PDF or .docx', 'Contact info at top (email, phone, LinkedIn, city)', 'Skills section with relevant keywords', 'Consistent date formatting (MM/YYYY)'].map((item, i) => (
              <div key={i} className={`flex items-center gap-2 text-sm p-2 rounded-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <CheckCircle size={14} className="text-emerald-500 flex-shrink-0" /> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex gap-1 p-1 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-medium transition-all truncate ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-rose-500 to-violet-600 text-white shadow-sm'
                  : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'resume' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {resumeTips.map((tip, i) => (
              <div key={i} className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
                <div className="text-2xl mb-3">{tip.icon}</div>
                <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tip.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tip.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {portfolioTips.map((tip, i) => (
                <div key={i} className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
                  <div className="text-2xl mb-3">{tip.icon}</div>
                  <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{tip.title}</h3>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tip.desc}</p>
                </div>
              ))}
            </div>
            <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-rose-50 border border-rose-100'}`}>
              <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>📸 What to Show in Each Case Study</h3>
              <div className="space-y-2">
                {['🔍 Problem: What challenge were you solving?', '💡 Process: How did you approach it? What decisions did you make?', '🛠️ Solution: What did you build/design/analyze?', '📊 Results: Measurable impact (users, revenue, performance, etc.)', '💭 Reflections: What would you do differently?'].map((s, i) => (
                  <p key={i} className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{s}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'linkedin' && (
          <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>LinkedIn Optimization Guide</h3>
            <div className="space-y-3">
              {linkedinTips.map((tip, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                  <CheckCircle size={16} className="text-rose-500 mt-0.5 flex-shrink-0" />
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{tip}</p>
                </div>
              ))}
            </div>
            <div className={`mt-5 p-4 rounded-xl border ${darkMode ? 'border-violet-800 bg-violet-900/20' : 'border-violet-200 bg-violet-50'}`}>
              <p className={`text-sm font-medium ${darkMode ? 'text-violet-300' : 'text-violet-700'}`}>💡 Pro Tip</p>
              <p className={`text-sm mt-1 ${darkMode ? 'text-violet-400' : 'text-violet-600'}`}>Turn on "Open to Work" with specific job titles. LinkedIn shows this badge to recruiters, and profiles with it get 40% more recruiter messages.</p>
            </div>
          </div>
        )}

        {activeTab === 'mistakes' && (
          <div className={`rounded-2xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'} overflow-hidden`}>
            <div className={`p-5 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Common Resume Mistakes to Avoid</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {mistakes.map((m, i) => (
                <div key={i} className="p-5 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-sm flex-shrink-0">{m.icon}</div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{m.mistake}</p>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>✅ Instead: {m.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resume template card */}
        <div className={`rounded-2xl p-6 border-2 border-dashed ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}>
          <Download size={32} className={`mx-auto mb-3 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>ATS-Friendly Resume Template</h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Clean, professional template designed to pass ATS screening</p>
          <button className="btn-primary mx-auto">
            <Download size={16} /> Download Template
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ResumeGuide;
