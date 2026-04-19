// All TypeScript interfaces for the app

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  careerGoal?: string;
  joinedAt: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  darkMode: boolean;
  notifications: boolean;
  emailUpdates: boolean;
}

export interface AssessmentData {
  interests: string[];
  currentSkills: string[];
  careerField: string;
  goals: string;
  experienceLevel: string;
  completedAt?: string;
}

export interface RoadmapSkill {
  id: string;
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedWeeks: number;
  completed: boolean;
  resources?: string[];
}

export interface RoadmapProject {
  id: string;
  title: string;
  description: string;
  skills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  link?: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface CareerRoadmap {
  id: string;
  field: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  totalWeeks: number;
  skills: RoadmapSkill[];
  projects: RoadmapProject[];
  certifications: Certification[];
}

export interface ProgressData {
  fieldId: string;
  completedSkillIds: string[];
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
}

export interface Activity {
  id: string;
  type: 'skill' | 'assessment' | 'roadmap' | 'chat';
  description: string;
  timestamp: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  text: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
