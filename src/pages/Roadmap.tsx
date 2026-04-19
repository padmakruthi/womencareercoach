import React, { useState, useMemo } from 'react';
import { CheckCircle, Circle, Clock, Award, Briefcase, ChevronDown, ChevronUp, Map } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';
import { careerRoadmaps } from '../data/roadmaps';
import { getProgressForField, toggleSkill, addActivity } from '../utils/storage';
import { getAssessment } from '../utils/storage';
import { CareerRoadmap } from '../data/types';

const difficultyColor: Record<string, string> = {
  Beginner: 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30',
  Intermediate: 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30',
  Advanced: 'text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30',
};
const priorityColor: Record<string, string> = {
  High: 'text-rose-500', Medium: 'text-amber-500', Low: 'text-gray-400',
};

const Roadmap: React.FC = () => {
  const { darkMode } = useApp();
  const assessment = getAssessment();
  const defaultId = careerRoadmaps.find(r => r.field === assessment?.careerField)?.id || careerRoadmaps[0].id;
  const [selectedId, setSelectedId] = useState(defaultId);
  const [expandedSection, setExpandedSection] = useState<string>('skills');
  const [, forceUpdate] = useState(0);

  const roadmap = useMemo(() => careerRoadmaps.find(r => r.id === selectedId)!, [selectedId]);
  const progress = getProgressForField(selectedId);
  const completedIds = progress?.completedSkillIds || [];
  const completedCount = completedIds.length;
  const totalCount = roadmap.skills.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  const handleToggle = (skillId: string, skillName: string) => {
    toggleSkill(selectedId, skillId);
    const wasCompleted = completedIds.includes(skillId);
    if (!wasCompleted) addActivity({ type: 'skill', description: `Completed skill: ${skillName} in ${roadmap.field}` });
    forceUpdate(n => n + 1);
  };

  const Section = ({ id, title, icon: Icon, children }: any) => (
    <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
      <button onClick={() => setExpandedSection(expandedSection === id ? '' : id)}
        className={`w-full flex items-center justify-between p-5 text-left transition-colors ${darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-rose-500 to-violet-600 flex items-center justify-center">
            <Icon size={16} className="text-white" />
          </div>
          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</span>
        </div>
        {expandedSection === id ? <ChevronUp size={18} className="text-rose-500" /> : <ChevronDown size={18} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />}
      </button>
      {expandedSection === id && <div className="px-5 pb-5">{children}</div>}
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className={`font-display font-bold text-3xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Career Roadmap</h1>
          <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your step-by-step guide to becoming a {roadmap.title}</p>
        </div>

        {/* Field selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {careerRoadmaps.map(r => (
            <button key={r.id} onClick={() => { setSelectedId(r.id); setExpandedSection('skills'); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap border transition-all flex-shrink-0 ${
                selectedId === r.id
                  ? 'bg-gradient-to-r from-rose-500 to-violet-600 text-white border-transparent shadow-lg shadow-rose-200/50'
                  : darkMode ? 'border-gray-700 text-gray-400 hover:border-rose-500/50' : 'border-gray-200 text-gray-700 hover:border-rose-300 bg-white'
              }`}>
              <span>{r.icon}</span> {r.field}
            </button>
          ))}
        </div>

        {/* Roadmap hero */}
        <div className={`rounded-2xl p-6 bg-gradient-to-r ${roadmap.color} text-white relative overflow-hidden`}>
          <div className="absolute right-6 top-6 text-6xl opacity-20">{roadmap.icon}</div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl">{roadmap.icon}</span>
                  <h2 className="font-display font-bold text-2xl">{roadmap.title}</h2>
                </div>
                <p className="text-white/80 text-sm max-w-lg">{roadmap.description}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5 bg-white/20 rounded-xl px-3 py-1.5">
                <Clock size={14} /> {roadmap.totalWeeks} weeks timeline
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 rounded-xl px-3 py-1.5">
                <CheckCircle size={14} /> {completedCount}/{totalCount} skills done
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 rounded-xl px-3 py-1.5">
                <Map size={14} /> {roadmap.projects.length} projects
              </div>
            </div>
            {/* Progress */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/80">Overall Progress</span>
                <span className="font-bold">{percent}%</span>
              </div>
              <div className="h-2 bg-white/30 rounded-full">
                <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Skills section */}
        <Section id="skills" title={`Skills to Learn (${completedCount}/${totalCount})`} icon={CheckCircle}>
          <div className="space-y-2 mt-2">
            {roadmap.skills.map(skill => {
              const done = completedIds.includes(skill.id);
              return (
                <div key={skill.id} onClick={() => handleToggle(skill.id, skill.name)}
                  className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                    done
                      ? darkMode ? 'bg-emerald-900/20 border-emerald-800/40' : 'bg-emerald-50 border-emerald-200'
                      : darkMode ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-700/50' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}>
                  {done
                    ? <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />
                    : <Circle size={20} className={`${darkMode ? 'text-gray-600' : 'text-gray-300'} flex-shrink-0`} />
                  }
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-medium ${done ? (darkMode ? 'text-emerald-400 line-through' : 'text-emerald-700 line-through') : (darkMode ? 'text-white' : 'text-gray-900')}`}>
                        {skill.name}
                      </p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[skill.difficulty]}`}>{skill.difficulty}</span>
                    </div>
                    <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{skill.category} · ~{skill.estimatedWeeks}w</p>
                    {skill.resources && (
                      <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>📚 {skill.resources.join(', ')}</p>
                    )}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-lg flex-shrink-0 ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                    {skill.estimatedWeeks}w
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Projects section */}
        <Section id="projects" title="Projects to Build" icon={Briefcase}>
          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            {roadmap.projects.map(p => (
              <div key={p.id} className={`p-4 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{p.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[p.difficulty]}`}>{p.difficulty}</span>
                </div>
                <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{p.description}</p>
                <div className="flex flex-wrap gap-1">
                  {p.skills.map(s => (
                    <span key={s} className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-white text-gray-600 border border-gray-200'}`}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Certifications */}
        <Section id="certs" title="Recommended Certifications" icon={Award}>
          <div className="space-y-3 mt-2">
            {roadmap.certifications.map(c => (
              <div key={c.id} className={`flex items-center justify-between p-4 rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-100 bg-gray-50'}`}>
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{c.name}</p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>by {c.provider}</p>
                </div>
                <span className={`text-xs font-semibold ${priorityColor[c.priority]}`}>{c.priority} Priority</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </DashboardLayout>
  );
};

export default Roadmap;
