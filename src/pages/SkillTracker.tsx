import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CheckCircle, Circle, BarChart2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';
import { getProgress, toggleSkill, addActivity } from '../utils/storage';
import { careerRoadmaps } from '../data/roadmaps';

const COLORS = ['#f43f5e', '#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#64748b'];

const SkillTracker: React.FC = () => {
  const { darkMode } = useApp();
  const [, forceUpdate] = useState(0);
  const allProgress = getProgress();

  const stats = useMemo(() => {
    return careerRoadmaps.map((r, i) => {
      const prog = allProgress.find(p => p.fieldId === r.id);
      const completed = prog?.completedSkillIds.length || 0;
      const total = r.skills.length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { ...r, completed, total, percent, color: COLORS[i] };
    });
  }, [allProgress]);

  const totalCompleted = stats.reduce((s, r) => s + r.completed, 0);
  const totalSkills = stats.reduce((s, r) => s + r.total, 0);
  const overallPct = totalSkills > 0 ? Math.round((totalCompleted / totalSkills) * 100) : 0;

  const barData = stats.map(s => ({ name: s.field.split('/')[0], completed: s.completed, total: s.total }));
  const pieData = stats.filter(s => s.completed > 0).map(s => ({ name: s.field, value: s.completed, color: s.color }));

  const handleToggle = (fieldId: string, skillId: string, skillName: string, field: string) => {
    const prog = allProgress.find(p => p.fieldId === fieldId);
    const wasCompleted = prog?.completedSkillIds.includes(skillId);
    toggleSkill(fieldId, skillId);
    if (!wasCompleted) addActivity({ type: 'skill', description: `Completed: ${skillName} (${field})` });
    forceUpdate(n => n + 1);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className={`font-display font-bold text-3xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>Skill Progress Tracker</h1>
          <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Track your learning across all career paths</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Completed', value: totalCompleted, sub: 'skills', color: 'text-emerald-500' },
            { label: 'Remaining', value: totalSkills - totalCompleted, sub: 'skills', color: 'text-amber-500' },
            { label: 'Overall Progress', value: `${overallPct}%`, sub: 'complete', color: 'text-rose-500' },
          ].map((c, i) => (
            <div key={i} className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
              <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
              <p className={`text-xs font-medium mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{c.label}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>{c.sub}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Skills by Career Path</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f3f4f6'} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: darkMode ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: darkMode ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: darkMode ? '#1f2937' : '#fff', border: 'none', borderRadius: 12 }} />
                <Bar dataKey="completed" fill="#f43f5e" radius={[6, 6, 0, 0]} name="Completed" />
                <Bar dataKey="total" fill={darkMode ? '#374151' : '#e5e7eb'} radius={[6, 6, 0, 0]} name="Total" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Completion Breakdown</h3>
            {pieData.length > 0 ? (
              <div className="flex items-center gap-4">
                <ResponsiveContainer width="55%" height={180}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {pieData.map((d, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: d.color }} />
                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{d.name.split('/')[0]}: {d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-44 text-center">
                <BarChart2 size={32} className={darkMode ? 'text-gray-600' : 'text-gray-300'} />
                <p className={`mt-2 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>Complete skills to see breakdown</p>
              </div>
            )}
          </div>
        </div>

        {/* Per-field progress */}
        {stats.map(r => {
          const prog = allProgress.find(p => p.fieldId === r.id);
          const completedIds = prog?.completedSkillIds || [];
          const roadmap = careerRoadmaps.find(rm => rm.id === r.id)!;
          return (
            <div key={r.id} className={`rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
              {/* Header */}
              <div className="p-5 border-b border-inherit">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{r.field}</h3>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{r.completed}/{r.total} skills · {r.percent}%</p>
                    </div>
                  </div>
                  <span className={`text-lg font-bold ${r.percent === 100 ? 'text-emerald-500' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{r.percent}%</span>
                </div>
                <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="progress-bar transition-all duration-700" style={{ width: `${r.percent}%` }} />
                </div>
              </div>

              {/* Skills grid */}
              <div className="p-5 grid sm:grid-cols-2 gap-2">
                {roadmap.skills.map(skill => {
                  const done = completedIds.includes(skill.id);
                  return (
                    <div key={skill.id} onClick={() => handleToggle(r.id, skill.id, skill.name, r.field)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                        done
                          ? darkMode ? 'bg-emerald-900/20' : 'bg-emerald-50'
                          : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}>
                      {done
                        ? <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                        : <Circle size={16} className={`${darkMode ? 'text-gray-600' : 'text-gray-300'} flex-shrink-0`} />
                      }
                      <span className={`text-sm ${done ? 'line-through text-gray-400' : darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default SkillTracker;
