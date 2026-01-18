
export interface CISet {
  id: number;
  colors: string[];
  fonts: string[]; // [Heading, Body, Accent]
}

export type BusinessNiche = 
  | "AI Automation & Intelligent Systems"
  | "Software Development & SaaS Platforms"
  | "Cybersecurity & IT Risk Management"
  | "Web Hosting, Domains & Cloud Services"
  | "Fintech & Digital Financial Services"
  | "Airport Shuttle & Passenger Transport"
  | "Logistics, Courier & Fleet Management"
  | "Construction & Infrastructure Development"
  | "Manufacturing, Fabrication & Industrial Services"
  | "Property Management & Real Estate Services"
  | "Renewable Energy & Solar Installations"
  | "Smart Building & Facilities Management"
  | "Business Consulting & Strategy Firms"
  | "Legal, Compliance & Business Advisory"
  | "Remote Admin, Virtual Assistants & BPO"
  | "Branding, Digital Marketing & Creative Agencies"
  | "Healthcare & Private Medical Services"
  | "Education, Training & Skills Development"
  | "Security, Surveillance & Armed Response"
  | "Hospitality, Travel & Tourism Operators";

export type BusinessStage = "Startup" | "Growing" | "Established";
export type VisualStyle = "Professional / Corporate" | "Modern / Tech / SaaS" | "Luxury / Premium" | "Creative / Bold / Digital" | "Minimal / Swiss";

export interface UserInput {
  businessName: string;
  niche: BusinessNiche;
  stage: BusinessStage;
  location: string;
  address: string;
  cta: string;
  email: string;
  phone: string;
  website: string;
  socials: {
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  targetAudience: string;
  clientIndustries: string;
  problemSolved: string;
  visualStyle: VisualStyle;
  ciSetId: number | 'auto';
  services: string[];
  vision: string;
  mission: string;
  uniqueValue: string;
  advantages: string;
  process: string;
  whyChooseUs: string;
  notes?: string;
}

export interface RefinedPortfolio {
  hero: { title: string; subtitle: string; description: string };
  about: { vision: string; mission: string; valueProp: string };
  services: { title: string; description: string }[];
  audience: { description: string; problemSolved: string };
  process: string[];
  advantages: string[];
  whyUs: string[];
  contact: { text: string };
}
