type TestimonialItem = {
  quote: string;
  author: string;
  image: string;
  role: string;
  company: string;
};

export const testimonial: TestimonialItem[] = [
  {
    quote:
      "The unified job search saved me countless hours. I applied to 10 top roles from one dashboard and finally got hired!",
    author: "Sarah Chen",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    role: "Software Engineer",
    company: "Tech Giant Co.",
  },
  {
    quote:
      "The industry insights helped me pivot my career successfully. The salary data was spot-on!",
    author: "Michael Rodriguez",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    role: "Product Manager",
    company: "StartUp Inc.",
  },
  {
    quote:
      "My resume's ATS score improved significantly. Got more interviews in two weeks than in six months!",
    author: "Priya Patel",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    role: "Marketing Director",
    company: "Global Corp",
  },
];
