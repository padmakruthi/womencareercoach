import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, Sparkles, LogOut, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { logout } from '../utils/storage';

const Navbar: React.FC = () => {
  const { user, darkMode, toggleDarkMode, setUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDashboard = location.pathname.startsWith('/dashboard') ||
    ['/roadmap', '/skills', '/resume', '/chatbot', '/settings', '/assessment'].some(p => location.pathname.startsWith(p));

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-100'
    } border-b backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-violet-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className={darkMode ? 'text-white' : 'text-gray-900'}>
              Women<span className="gradient-text">Career</span>Coach
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {!isDashboard && (
              <>
                <Link to="/#features" className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Features</Link>
                <Link to="/#careers" className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Careers</Link>
                <Link to="/#faq" className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>FAQ</Link>
              </>
            )}
            {user && isDashboard && (
              <Link to="/dashboard" className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Dashboard</Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className={`hidden md:flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className={`text-sm font-medium px-4 py-2 rounded-xl transition-colors ${
                  darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}>Sign In</Link>
                <Link to="/signup" className="btn-primary text-sm py-2">Join Free</Link>
              </div>
            )}

            {/* Mobile menu */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 flex items-center justify-center">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className={`md:hidden border-t px-4 py-4 space-y-2 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className={`block py-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Dashboard</Link>
              <Link to="/roadmap" onClick={() => setMobileOpen(false)} className={`block py-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Roadmap</Link>
              <Link to="/chatbot" onClick={() => setMobileOpen(false)} className={`block py-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>AI Coach</Link>
              <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block w-full text-left py-2 text-sm font-medium text-rose-500">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileOpen(false)} className={`block py-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Sign In</Link>
              <Link to="/signup" onClick={() => setMobileOpen(false)} className="block py-2 text-sm font-medium text-rose-500">Join Free</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
