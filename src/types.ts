export interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  role: string;
  year: string;
  category: string;
  achievements: string[];
  stats?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; info?: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  type: 'Full-Time' | 'Contract' | 'Freelance';
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  likes: number;
}
