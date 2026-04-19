import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Target, Map, BarChart2, MessageCircle, FileText, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { testimonials, faqs } from '../data/roadmaps';
import Navbar from '../components/Navbar';

const features = [
  { icon: Target, title: 'Skill Assessment', desc: 'AI-powered quiz that identifies your strengths and gaps in minutes.', color: 'text-rose-500 bg-rose-100' },
  { icon: Map, title: 'Personalized Roadmaps', desc: 'Step-by-step career roadmaps tailored to your goals and experience.', color: 'text-violet-500 bg-violet-100' },
  { icon: BarChart2, title: 'Progress Tracking', desc: 'Visual dashboards to track your learning and celebrate milestones.', color: 'text-blue-500 bg-blue-100' },
  { icon: MessageCircle, title: 'AI Career Coach', desc: '24/7 chatbot for personalized career guidance and advice.', color: 'text-emerald-500 bg-emerald-100' },
  { icon: FileText, title: 'Resume Guidance', desc: 'ATS-optimized resume tips and LinkedIn profile strategies.', color: 'text-orange-500 bg-orange-100' },
  { icon: Sparkles, title: 'Community Network', desc: 'Connect with 12,000+ women navigating similar career journeys.', color: 'text-pink-500 bg-pink-100' },
];

const careers = [
  { icon: '💻', title: 'Web Development', level: '⭐⭐⭐⭐⭐', demand: 'Very High', salary: '₹4–25 LPA' },
  { icon: '🤖', title: 'AI / Machine Learning', level: '⭐⭐⭐⭐⭐', demand: 'Explosive', salary: '₹8–30 LPA' },
  { icon: '📊', title: 'Data Science', level: '⭐⭐⭐⭐', demand: 'Very High', salary: '₹6–20 LPA' },
  { icon: '🎨', title: 'UI/UX Design', level: '⭐⭐⭐⭐', demand: 'High', salary: '₹4–18 LPA' },
  { icon: '📣', title: 'Digital Marketing', level: '⭐⭐⭐', demand: 'High', salary: '₹3–15 LPA' },
  { icon: '🔒', title: 'Cybersecurity', level: '⭐⭐⭐⭐⭐', demand: 'Critical', salary: '₹5–20 LPA' },
];

const Homepage: React.FC = () => {
  const { darkMode, user } = useApp();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-rose-300/30 to-violet-400/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-violet-300/20 to-blue-400/20 blur-3xl" />
          {/* Dot pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, ${darkMode ? 'rgba(244,63,94,0.15)' : 'rgba(244,63,94,0.08)'} 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left content */}
            <div className="flex-1 text-center lg:text-left animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{ background: 'linear-gradient(135deg, rgba(244,63,94,0.1), rgba(139,92,246,0.1))', border: '1px solid rgba(244,63,94,0.2)' }}>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className={darkMode ? 'text-rose-300' : 'text-rose-600'}>AI Mentor Active — 12,000+ Women Coached</span>
              </div>

              <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-tight mb-6">
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>Break Every</span><br />
                <span className="gradient-text">Career Ceiling</span><br />
                <span className={darkMode ? 'text-white' : 'text-gray-900'}>With AI.</span>
              </h1>

              <p className={`text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Real-time voice coaching, personalized roadmaps, and career strategy — built exclusively for ambitious women.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to={user ? '/dashboard' : '/signup'} className="btn-primary text-base px-8 py-4">
                  <Sparkles size={18} />
                  {user ? 'Go to Dashboard' : 'Start Free Today'}
                  <ArrowRight size={16} />
                </Link>
                <Link to="/roadmap" className="btn-secondary text-base px-8 py-4">
                  <Map size={18} />
                  See My Roadmap
                </Link>
              </div>

              <div className={`mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                <span>✅ No credit card</span>
                <span>✅ Free forever</span>
                <span>✅ Built for women</span>
              </div>
            </div>

            {/* Right: Mock phone */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative animate-float">
                <div className="w-64 sm:w-72 bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl shadow-violet-500/20">
                  <div className="bg-gray-800 rounded-[2rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-4 pt-3 pb-2">
                      <span className="text-white text-xs">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-white/60 rounded" />
                        <div className="w-1 h-3 bg-white/40 rounded" />
                        <div className="w-1 h-3 bg-white/20 rounded" />
                      </div>
                    </div>
                    {/* Chat bubble */}
                    <div className="px-4 pb-3">
                      <div className="bg-gradient-to-r from-rose-500 to-violet-600 rounded-2xl rounded-tl-sm p-3 mb-2">
                        <p className="text-white text-xs leading-relaxed">Hi Sarah! Ready for your salary negotiation practice? I've prepped 8 counter-strategies for you 🎯</p>
                      </div>
                      <div className="bg-gray-700 rounded-2xl rounded-bl-sm p-2 mb-3 ml-8">
                        <p className="text-gray-300 text-xs">Yes! Let's go 💪</p>
                      </div>
                      {/* Active track */}
                      <div className="bg-gray-700 rounded-xl p-3">
                        <p className="text-gray-400 text-xs mb-1">ACTIVE TRACK</p>
                        <p className="text-white text-sm font-semibold">Tech Lead Strategy — Week 4</p>
                        <div className="mt-2 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-gradient-to-r from-rose-500 to-violet-600 rounded-full" />
                        </div>
                      </div>
                    </div>
                    {/* Mic button */}
                    <div className="flex flex-col items-center py-4 bg-gray-900">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-500 to-violet-600 flex items-center justify-center shadow-lg shadow-rose-500/40">
                        <span className="text-white text-xl">🎤</span>
                      </div>
                      <p className="text-gray-500 text-xs mt-2">TAP TO SPEAK</p>
                    </div>
                    {/* Bottom nav */}
                    <div className="flex justify-around py-3 border-t border-gray-700 px-6">
                      {['🏠', '💬', '📊', '👤'].map((icon, i) => (
                        <div key={i} className="text-lg">{icon}</div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -left-8 top-1/3 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-xl">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">🎉 Skill Unlocked!</p>
                  <p className="text-xs text-gray-500">React Hooks Mastered</p>
                </div>
                <div className="absolute -right-6 bottom-1/3 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-xl">
                  <p className="text-xs font-bold text-emerald-600">+₹3.5 LPA</p>
                  <p className="text-xs text-gray-500">Salary Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4">
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Everything You Need to</span><br />
              <span className="gradient-text">Accelerate Your Career</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              A complete career coaching platform designed specifically for women entering and growing in tech.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className={`rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100 shadow-sm'
                }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{f.title}</h3>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Career categories */}
      <section id="careers" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl mb-4">
              <span className="gradient-text">6 Career Paths</span>{' '}
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Waiting for You</span>
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Choose your path and get a custom roadmap in seconds.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {careers.map((c, i) => (
              <Link to={user ? '/roadmap' : '/signup'} key={i} className={`group rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                darkMode ? 'bg-gray-800 border border-gray-700 hover:border-rose-500/40' : 'bg-white border border-gray-100 shadow-sm hover:border-rose-300'
              }`}>
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3 className={`font-bold text-lg mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{c.title}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Demand: <span className="text-rose-500 font-medium">{c.demand}</span></span>
                  <span className={`font-semibold ${darkMode ? 'text-violet-400' : 'text-violet-600'}`}>{c.salary}</span>
                </div>
                <div className={`mt-4 flex items-center gap-1 text-sm font-medium ${darkMode ? 'text-gray-500 group-hover:text-rose-400' : 'text-gray-400 group-hover:text-rose-500'} transition-colors`}>
                  Explore roadmap <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-rose-50/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl mb-4">
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Women Who </span>
              <span className="gradient-text">Broke Through</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map(t => (
              <div key={t.id} className={`rounded-2xl p-5 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-sm border border-gray-100'}`}>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.name}</p>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t.role} @ {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-4xl mb-4">
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Got </span>
              <span className="gradient-text">Questions?</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map(faq => (
              <div key={faq.id} className={`rounded-2xl overflow-hidden border transition-all ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100 shadow-sm'
              }`}>
                <button
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className={`font-semibold text-sm pr-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{faq.question}</span>
                  {openFaq === faq.id ? <ChevronUp size={18} className="text-rose-500 flex-shrink-0" /> : <ChevronDown size={18} className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} flex-shrink-0`} />}
                </button>
                {openFaq === faq.id && (
                  <div className="px-5 pb-5">
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-10 text-center" style={{ background: 'linear-gradient(135deg, #f43f5e, #7c3aed)' }}>
            <h2 className="font-display font-black text-4xl text-white mb-4">Your Career Breakthrough Starts Today</h2>
            <p className="text-rose-100 text-lg mb-8">Join 12,000+ ambitious women building their dream careers.</p>
            <Link to={user ? '/dashboard' : '/signup'} className="inline-flex items-center gap-2 bg-white text-rose-600 font-bold px-8 py-4 rounded-xl hover:bg-rose-50 transition-colors">
              <Sparkles size={18} />
              {user ? 'Go to Dashboard' : 'Start Free — No Credit Card'}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-12 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-violet-600 flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>Women<span className="gradient-text">Career</span>Coach</span>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              © 2024 WomenCareerCoach. Built with ❤️ for ambitious women.
            </p>
            <div className="flex gap-6 text-sm">
              {['Privacy', 'Terms', 'Contact'].map(l => (
                <a key={l} href="#" className={`transition-colors ${darkMode ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
