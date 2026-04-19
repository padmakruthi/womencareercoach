import { User, AssessmentData, ProgressData, ChatMessage, Activity } from '../data/types';

// Keys
const KEYS = {
  USERS: 'wcc_users',
  CURRENT_USER: 'wcc_current_user',
  ASSESSMENT: 'wcc_assessment',
  PROGRESS: 'wcc_progress',
  CHAT_HISTORY: 'wcc_chat_history',
  ACTIVITIES: 'wcc_activities',
  DARK_MODE: 'wcc_dark_mode',
};

// Generic helpers
const get = <T>(key: string): T | null => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch { return null; }
};

const set = <T>(key: string, value: T): void => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

// User management
export const getUsers = (): User[] => get<User[]>(KEYS.USERS) || [];
export const saveUser = (user: User): void => {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id);
  if (idx >= 0) users[idx] = user;
  else users.push(user);
  set(KEYS.USERS, users);
};
export const getUserByEmail = (email: string): User | null =>
  getUsers().find(u => u.email === email) || null;

export const getCurrentUser = (): User | null => get<User>(KEYS.CURRENT_USER);
export const setCurrentUser = (user: User | null): void => set(KEYS.CURRENT_USER, user);
export const updateCurrentUser = (updates: Partial<User>): void => {
  const user = getCurrentUser();
  if (!user) return;
  const updated = { ...user, ...updates };
  setCurrentUser(updated);
  saveUser(updated);
};

// Assessment
export const getAssessment = (): AssessmentData | null => get<AssessmentData>(KEYS.ASSESSMENT);
export const saveAssessment = (data: AssessmentData): void => set(KEYS.ASSESSMENT, data);

// Progress
export const getProgress = (): ProgressData[] => get<ProgressData[]>(KEYS.PROGRESS) || [];
export const getProgressForField = (fieldId: string): ProgressData | null =>
  getProgress().find(p => p.fieldId === fieldId) || null;
export const saveProgress = (progress: ProgressData): void => {
  const all = getProgress();
  const idx = all.findIndex(p => p.fieldId === progress.fieldId);
  if (idx >= 0) all[idx] = progress;
  else all.push(progress);
  set(KEYS.PROGRESS, all);
};
export const toggleSkill = (fieldId: string, skillId: string): void => {
  const prog = getProgressForField(fieldId) || { fieldId, completedSkillIds: [], lastUpdated: '' };
  const ids = prog.completedSkillIds;
  const idx = ids.indexOf(skillId);
  if (idx >= 0) ids.splice(idx, 1);
  else ids.push(skillId);
  prog.lastUpdated = new Date().toISOString();
  saveProgress(prog);
};

// Chat history
export const getChatHistory = (): ChatMessage[] => get<ChatMessage[]>(KEYS.CHAT_HISTORY) || [];
export const saveChatMessage = (msg: ChatMessage): void => {
  const history = getChatHistory();
  history.push(msg);
  if (history.length > 100) history.splice(0, history.length - 100);
  set(KEYS.CHAT_HISTORY, history);
};
export const clearChatHistory = (): void => set(KEYS.CHAT_HISTORY, []);

// Activities
export const getActivities = (): Activity[] => get<Activity[]>(KEYS.ACTIVITIES) || [];
export const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>): void => {
  const activities = getActivities();
  activities.unshift({ ...activity, id: Date.now().toString(), timestamp: new Date().toISOString() });
  if (activities.length > 20) activities.pop();
  set(KEYS.ACTIVITIES, activities);
};

// Dark mode
export const getDarkMode = (): boolean => get<boolean>(KEYS.DARK_MODE) ?? false;
export const setDarkMode = (val: boolean): void => set(KEYS.DARK_MODE, val);

// Logout
export const logout = (): void => {
  localStorage.removeItem(KEYS.CURRENT_USER);
};

// Generate unique ID
export const generateId = (): string => Date.now().toString(36) + Math.random().toString(36).substr(2);
