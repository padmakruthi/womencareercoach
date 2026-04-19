import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Target, Zap, CheckCircle, Clock, ArrowRight, TrendingUp, Brain } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';
import { getAssessment, getProgress, getActivities } from '../utils/storage';
import { careerRoadmaps } from '../data/roadmaps';

const weeklyData = [
  { day: 'Mon', skills: 2 }, { day: 'Tue', skills: 4 }, { day: 'Wed', skills: 3 },
  { day: 'Thu', skills: 6 }, { day: 'Fri', skills: 5 }, { day: 'Sat', skills: 8 }, { day: 'Sun', skills: 4 },
];

const Dashboard: React.FC = () => {
  const { user, darkMode } = useApp();
  const assessment = getAssessment();
  const allProgress = getProgress();
  const activities = getActivities();

  const stats = useMemo(() => {
    const totalSkills = allProgress.reduce((sum, p) => {
      const roadmap = careerRoadmaps.find(r => r.id === p.fieldId);
      return sum + (roadmap?.skills.length || 0);
    }, 0);
    const completedSkills = allProgress.reduce((sum, p) => sum + p.completedSkillIds.length, 0);
    const percent = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;
    const activeRoadmap = assessment?.careerField
      ? careerRoadmaps.find(r => r.field === assessment.careerField)
      : careerRoadmaps[0];
    const activeProgress = activeRoadmap ? allProgress.find(p => p.fieldId === activeRoadmap.id) : null;
    const activeCompleted = activeProgress?.completedSkillIds.length || 0;
    const activeTotal = activeRoadmap?.skills.length || 0;
    const activePercent = activeTotal > 0 ? Math.round((activeCompleted / activeTotal) * 100) : 0;
    return { totalSkills, completedSkills, percent, activeRoadmap, activeCompleted, activeTotal, activePercent };
  }, [allProgress, assessment]);

  const radialData = [{ name: 'Progress', value: stats.activePercent, fill: 'url(#progressGradient)' }];

  const statCards = [
    { label: 'Career Goal', value: user?.careerGoal || 'Not set', icon: Target, color: 'from-rose-500 to-pink-500', sub: 'Your target role' },
    { label: 'Skills Completed', value: `${stats.completedSkills}`, icon: CheckCircle, color: 'from-emerald-500 to-teal-500', sub: `of ${stats.totalSkills} total` },
    { label: 'Overall Progress', value: `${stats.percent}%`, icon: TrendingUp, color: 'from-violet-500 to-purple-600', sub: 'Keep going!' },
    { label: 'Active Roadmap', value: stats.activeRoadmap?.field || 'None', icon: Zap, color: 'from-orange-500 to-amber-500', sub: `${stats.activePercent}% complete` },
  ];

  const formatTimeAgo = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className={`font-display font-bold text-3xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          {!assessment && (
            <Link to="/assessment" className="btn-primary">
              <Brain size={16} /> Take Skill Assessment
            </Link>
          )}
        </div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center mb-3`}>
                  <Icon size={18} className="text-white" />
                </div>
                <p className={`text-2xl font-bold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{card.value}</p>
                <p className={`text-xs font-medium mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{card.label}</p>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>{card.sub}</p>
              </div>
            );
          })}
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Activity chart */}
          <div className={`lg:col-span-2 rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Weekly Learning Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f3f4f6'} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: darkMode ? '#1f2937' : '#fff', border: 'none', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="skills" stroke="#f43f5e" strokeWidth={2} fill="url(#areaGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Progress radial */}
          <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Roadmap Progress</h3>
            <div className="relative">
              <ResponsiveContainer width="100%" height={160}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={radialData} startAngle={90} endAngle={-270}>
                  <defs>
                    <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <RadialBar dataKey="value" cornerRadius={8} fill="url(#progressGradient)" background={{ fill: darkMode ? '#374151' : '#f3f4f6' }} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.activePercent}%</span>
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Complete</span>
              </div>
            </div>
            <div className="text-center mt-2">
              <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{stats.activeRoadmap?.field || 'No roadmap'}</p>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stats.activeCompleted}/{stats.activeTotal} skills</p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Recommended roadmap */}
          <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recommended Roadmaps</h3>
              <Link to="/roadmap" className="text-rose-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight size={14} /></Link>
            </div>
            <div className="space-y-3">
              {careerRoadmaps.slice(0, 3).map(r => {
                const prog = allProgress.find(p => p.fieldId === r.id);
                const pct = prog ? Math.round((prog.completedSkillIds.length / r.skills.length) * 100) : 0;
                return (
                  <Link to="/roadmap" key={r.id} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${r.color} flex items-center justify-center text-lg flex-shrink-0`}>{r.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{r.field}</p>
                      <div className={`mt-1.5 h-1.5 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        <div className="progress-bar" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <span className={`text-xs font-medium flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{pct}%</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent activity */}
          <div className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'}`}>
            <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
            {activities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock size={32} className={darkMode ? 'text-gray-600' : 'text-gray-300'} />
                <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No activity yet</p>
                <Link to="/assessment" className="mt-3 text-rose-500 text-sm font-medium">Take your first assessment →</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {activities.slice(0, 5).map(a => (
                  <div key={a.id} className={`flex items-start gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                    <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{a.description}</p>
                      <p className={`text-xs mt-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>{formatTimeAgo(a.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        {!assessment && (
          <div className="rounded-2xl p-6 border-2 border-dashed border-rose-300 dark:border-rose-900/50 text-center">
            <Brain size={32} className="text-rose-500 mx-auto mb-2" />
            <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Complete Your Skill Assessment</h3>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get a personalized roadmap based on your unique skills and goals.</p>
            <Link to="/assessment" className="btn-primary inline-flex">Start Assessment <ArrowRight size={16} /></Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
