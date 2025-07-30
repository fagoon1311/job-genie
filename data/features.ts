import {
  LucideIcon,
  FileText,
  PenLine,
  Briefcase,
  BarChart3,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const features: Feature[] = [
  {
    title: "Unified Job Listings",
    description:
      "Browse jobs aggregated from top platforms like LinkedIn, Naukri, and more — all in one place.",
    icon: Briefcase,
  },
  {
    title: "AI Resume Builder",
    description:
      "Generate professional, ATS-friendly resumes in seconds with our smart resume builder.",
    icon: FileText,
  },
  {
    title: "AI Cover Letter Generator",
    description:
      "Instantly craft personalized cover letters tailored to each job using AI assistance.",
    icon: PenLine,
  },

  {
    title: "Industry Insights",
    description:
      "Stay ahead with real-time trends, salary benchmarks, and in-demand skills across industries.",
    icon: BarChart3,
  },
];

