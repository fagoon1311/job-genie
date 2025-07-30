import { LucideIcon, Search, FileText, Sparkles, Globe } from "lucide-react";

type HowItWorksItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const howItWorks: HowItWorksItem[] = [
  {
    title: "Discover Jobs in One Place",
    description: "Access job listings from top platforms like LinkedIn, Naukri, and more — all in one unified feed.",
    icon: Search,
  },
  {
    title: "Generate AI-Powered Resumes",
    description: "Create tailored, ATS-friendly resumes that align with specific roles and industries.",
    icon: FileText,
  },
  {
    title: "Craft Perfect Cover Letters",
    description: "Use AI to write compelling, personalized cover letters based on your experience and job goals.",
    icon: Sparkles,
  },
  {
    title: "Stay Ahead with Insights",
    description: "Track industry trends, salary benchmarks, and role-specific demands with real-time analytics.",
    icon: Globe,
  },
];
