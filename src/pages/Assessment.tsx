import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, Brain } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';
import { saveAssessment, addActivity } from '../utils/storage';
import { AssessmentData } from '../data/types';

const steps = [
  { title: 'Your Interests', subtitle: 'What topics excite you most?' },
  { title: 'Current Skills', subtitle: 'What do you already know?' },
  { title: 'Career Field', subtitle: 'Which direction calls you?' },
  { title: 'Goals & Timeline', subtitle: 'Where do you want to be?' },
  { title: 'Experience Level', subtitle: 'Where are you starting from?' },
];

const interestOptions = ['Problem Solving', 'Creative Design', 'Data & Numbers', 'Writing & Content', 'Building Products', 'Helping People', 'Research', 'Teaching', 'Business Strategy', 'Coding & Tech'];
const skillOptions = ['Python', 'JavaScript', 'HTML/CSS', 'SQL', 'Figma', 'Excel/Sheets', 'Communication', 'Project Management', 'Social Media', 'No technical skills yet'];
const careerOptions = ['Web Development', 'AI/ML', 'Data Science', 'UI/UX', 'Digital Marketing', 'Cybersecurity'];
const goalOptions = ['Get my first tech job', 'Career switch into tech', 'Get promoted', 'Freelance/Start a business', 'Learn for personal growth', 'Upskill in current role'];
const experienceOptions = [
  { value: 'beginner', label: 'Complete Beginner', desc: 'Just starting out, no tech background' },
  { value: 'some', label: 'Some Experience', desc: '1-2 years of learning/projects' },
  { value: 'intermediate', label: 'Intermediate', desc: '2-4 years, some work experience' },
  { value: 'experienced', label: 'Experienced', desc: '4+ years in a related field' },
];

const Assessment: React.FC = () => {
  const { darkMode } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<AssessmentData>>({
    interests: [], currentSkills: [], careerField: '', goals: '', experienceLevel: ''
  });
  const [saving, setSaving] = useState(false);

  const toggleMulti = (key: 'interests' | 'currentSkills', val: string) => {
    setData(prev => {
      const arr = prev[key] || [];
      return { ...prev, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
    });
  };

  const canProceed = () => {
    if (step === 0) return (data.interests?.length || 0) > 0;
    if (step === 1) return (data.currentSkills?.length || 0) > 0;
    if (step === 2) return !!data.careerField;
    if (step === 3) return !!data.goals;
    if (step === 4) return !!data.experienceLevel;
    return false;
  };

  const handleFinish = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    const assessment: AssessmentData = {
      interests: data.interests || [],
      currentSkills: data.currentSkills || [],
      careerField: data.careerField || '',
      goals: data.goals || '',
      experienceLevel: data.experienceLevel || '',
      completedAt: new Date().toISOString(),
    };
    saveAssessment(assessment);
    addActivity({ type: 'assessment', description: 'Completed skill assessment — roadmap generated!' });
    navigate('/roadmap');
  };

  const MultiSelect = ({ options, selected, onToggle }: { options: string[], selected: string[], onToggle: (v: string) => void }) => (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt} onClick={() => onToggle(opt)}
          className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
            selected.includes(opt)
              ? 'bg-gradient-to-r from-rose-500 to-violet-600 text-white border-transparent'
              : darkMode ? 'border-gray-700 text-gray-400 hover:border-rose-500/50 hover:text-rose-400' : 'border-gray-200 text-gray-700 hover:border-rose-300 hover:text-rose-600'
          }`}>
          {opt}
        </button>
      ))}
    </div>
  );

  const SingleSelect = ({ options, selected, onSelect }: { options: string[], selected: string, onSelect: (v: string) => void }) => (
    <div className="grid sm:grid-cols-2 gap-3">
      {options.map(opt => (
        <button key={opt} onClick={() => onSelect(opt)}
          className={`px-4 py-3 rounded-xl text-sm font-medium border text-left transition-all ${
            selected === opt
              ? 'bg-gradient-to-r from-rose-500 to-violet-600 text-white border-transparent'
              : darkMode ? 'border-gray-700 text-gray-400 hover:border-rose-500/50' : 'border-gray-200 text-gray-700 hover:border-rose-300'
          }`}>
          {opt}
        </button>
      ))}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-violet-600 flex items-center justify-center mx-auto mb-4">
            <Brain size={24} className="text-white" />
          </div>
          <h1 className={`font-display font-bold text-3xl mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Skill Assessment</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>5 quick steps to your personalized career roadmap</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
              i < step ? 'bg-gradient-to-r from-rose-500 to-violet-600' :
              i === step ? 'bg-gradient-to-r from-rose-400 to-violet-500' :
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
          ))}
        </div>

        {/* Card */}
        <div className={`rounded-3xl p-8 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-xl border border-gray-100'}`}>
          <div className="mb-6">
            <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${darkMode ? 'text-rose-400' : 'text-rose-500'}`}>
              Step {step + 1} of {steps.length}
            </div>
            <h2 className={`font-display font-bold text-2xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>{steps[step].title}</h2>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{steps[step].subtitle}</p>
          </div>

          <div className="min-h-48">
            {step === 0 && (
              <MultiSelect options={interestOptions} selected={data.interests || []} onToggle={v => toggleMulti('interests', v)} />
            )}
            {step === 1 && (
              <MultiSelect options={skillOptions} selected={data.currentSkills || []} onToggle={v => toggleMulti('currentSkills', v)} />
            )}
            {step === 2 && (
              <SingleSelect options={careerOptions} selected={data.careerField || ''} onSelect={v => setData(p => ({ ...p, careerField: v }))} />
            )}
            {step === 3 && (
              <SingleSelect options={goalOptions} selected={data.goals || ''} onSelect={v => setData(p => ({ ...p, goals: v }))} />
            )}
            {step === 4 && (
              <div className="space-y-3">
                {experienceOptions.map(opt => (
                  <button key={opt.value} onClick={() => setData(p => ({ ...p, experienceLevel: opt.value }))}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                      data.experienceLevel === opt.value
                        ? 'bg-gradient-to-r from-rose-500/10 to-violet-600/10 border-rose-500'
                        : darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-200 hover:border-rose-300'
                    }`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      data.experienceLevel === opt.value ? 'border-rose-500 bg-rose-500' : darkMode ? 'border-gray-600' : 'border-gray-300'
                    }`}>
                      {data.experienceLevel === opt.value && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{opt.label}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                step === 0 ? 'opacity-30 cursor-not-allowed' : darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}>
              <ArrowLeft size={16} /> Back
            </button>

            {step < steps.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button onClick={handleFinish} disabled={!canProceed() || saving} className="btn-primary disabled:opacity-40">
                {saving ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating Roadmap...</span>
                ) : (
                  <span className="flex items-center gap-2"><CheckCircle size={16} /> Get My Roadmap</span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Skippable hint */}
        <p className={`text-center text-xs mt-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
          You can retake this assessment anytime from Settings
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Assessment;
