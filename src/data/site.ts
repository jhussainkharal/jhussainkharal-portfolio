/**
 * Central content configuration.
 * Everything editable (name, links, projects, copy) lives here —
 * components never hard-code content.
 */

import apexRacing from "@/assets/apex-racing.jpg";
import cookingStore from "@/assets/cooking-store.jpg";
import pmsa from "@/assets/pmsa.jpg";
import portrait from "@/assets/portrait.jpg";
import stockcounter from "@/assets/stockcounter.jpg";

export const identity = {
  brand: "JHUSSAINKHARAL",
  monogram: "JH",
  fullName: "Rai Jawad Hussain Kharal",
  title: "Web Designer / AI Creative",
  location: "Punjab, Pakistan",
  statement:
    "I design websites, build digital experiences, and explore what's possible with AI.",
  email: "g.global.commerce.track@gmail.com",
  instagram: {
    handle: "jhussainkharal",
    url: "https://instagram.com/jhussainkharal",
  },
  portrait,
  portraitAlt:
    "Portrait of Rai Jawad Hussain Kharal seated in low blue light",
};

export const navItems = [
  { label: "WORK", href: "#work" },
  { label: "CAPABILITIES", href: "#capabilities" },
  { label: "AI LAB", href: "#ai-lab" },
  { label: "STORY", href: "#story" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export const intro = {
  statement: ["THE WEB IS", "MORE THAN", "A PAGE."],
  lines: ["It's an introduction.", "An identity.", "An experience."],
  body: "A website is a digital introduction — an announcer of who a person or a business is, long before the first conversation happens.",
};

export type BuildCategory = {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  tags: string[];
};

export const buildCategories: BuildCategory[] = [
  {
    id: "web",
    index: "01",
    title: "WEB",
    summary: "Premium websites and digital experiences.",
    detail:
      "Design and build of brand-level websites — structure, typography, interaction and the details that make a page feel considered.",
    tags: ["WordPress", "Elementor", "HTML / CSS", "PHP", "UI/UX"],
  },
  {
    id: "ai",
    index: "02",
    title: "AI",
    summary: "Creative AI, AI coding, automation and AI-powered workflows.",
    detail:
      "Using AI as a working instrument: generating and transforming visuals, writing code with it, and wiring it into repeatable workflows.",
    tags: ["Prompt Engineering", "AI Coding", "Automation", "AI Agents"],
  },
  {
    id: "commerce",
    index: "03",
    title: "COMMERCE",
    summary: "E-commerce and product-focused experiences.",
    detail:
      "Storefronts built around product discovery, clarity and conversion — from catalogue structure to checkout flow.",
    tags: ["Product UX", "Catalogue", "Storefront Design", "Responsive"],
  },
  {
    id: "motion",
    index: "04",
    title: "MOTION",
    summary: "3D, animation and interactive web experiences.",
    detail:
      "Scroll choreography, 3D moments and transitions used to carry a narrative rather than decorate a page.",
    tags: ["Web Animation", "3D", "Scroll Narrative", "Transitions"],
  },
  {
    id: "systems",
    index: "05",
    title: "SYSTEMS",
    summary: "Portals, dashboards and structured digital systems.",
    detail:
      "Interfaces for data and operations — dashboards, portals and the logic that keeps them organised.",
    tags: ["Dashboards", "Portals", "Data UI", "Automation Logic"],
  },
];

export type Project = {
  id: string;
  index: string;
  name: string;
  subtitle?: string;
  category: string;
  description: string;
  role: string[];
  tech: string[];
  status: string;
  image: string;
  alt: string;
  link?: string;
};

export const projects: Project[] = [
  {
    id: "stockcounter",
    index: "01",
    name: "STOCKCOUNTER",
    category: "Store Intelligence / Automation / Dashboard",
    description:
      "A working application designed to connect with a user's store and handle store-related information, order calculations and operational data through a graphical interface.",
    role: ["Automation classes", "Structural logic", "Interface direction"],
    tech: ["Dashboard UI", "Automation", "Data Modelling"],
    status: "Working project — currently private",
    image: stockcounter,
    alt: "Stockcounter dashboard interface showing revenue, profit and stock metrics",
  },
  {
    id: "pmsa",
    index: "02",
    name: "PMSA WEBSITE",
    subtitle: "Pak Millat Science Academy",
    category: "Educational Institution / Web Design / Digital Experience",
    description:
      "A sophisticated institutional website experience for Pak Millat Science Academy — built around clear information architecture, editorial typography and a calm, credible tone.",
    role: ["Web design", "Front-end build", "Information architecture"],
    tech: ["WordPress", "Elementor", "Responsive Layout", "Typography"],
    status: "Institutional website",
    image: pmsa,
    alt: "Pak Millat Science Academy website homepage with editorial hero section",
  },
  {
    id: "apex-racing",
    index: "03",
    name: "APEX RACING",
    category: "3D / Motion / Interactive Web Experience",
    description:
      "A motorsport web experience driven by scroll: cinematic imagery, dramatic typography and 3D moments used to pull the visitor through the story of a machine.",
    role: ["Experience design", "Motion direction", "Front-end build"],
    tech: ["3D / WebGL", "Scroll Choreography", "Motion Design"],
    status: "Experimental experience",
    image: apexRacing,
    alt: "Apex Racing website hero with a black race car and bold headline typography",
  },
  {
    id: "cooking-store",
    index: "04",
    name: "COOKING ACCESSORIES",
    subtitle: "Online Store",
    category: "E-commerce / UI/UX / Product Experience",
    description:
      "A product-focused online store: considered product presentation, straightforward discovery and an interface that keeps the path to purchase short.",
    role: ["Store design", "Product UX", "Responsive build"],
    tech: ["E-commerce", "Product UI", "Visual Hierarchy"],
    status: "Commercial store design",
    image: cookingStore,
    alt: "Cooking accessories online store with dark product photography and product grid",
  },
];

export const aiLab = {
  workflow: [
    { step: "CREATE", note: "Ideas, directions, first visual language." },
    { step: "TRANSFORM", note: "Reworking images, assets and references." },
    { step: "GENERATE", note: "Visuals, video, copy structure, components." },
    { step: "AUTOMATE", note: "Repeatable workflows instead of manual work." },
    { step: "BUILD", note: "Everything assembled into a real product." },
  ],
  capabilities: [
    {
      group: "CREATIVE AI",
      items: [
        "Image generation",
        "Image editing",
        "Video generation",
        "Video editing",
      ],
    },
    {
      group: "DEVELOPMENT AI",
      items: [
        "AI coding",
        "AI website generation",
        "AI automation",
        "AI agents",
      ],
    },
    {
      group: "CORE SKILL",
      items: ["Prompt engineering"],
    },
  ],
  tools: ["ChatGPT", "Gemini", "Claude", "Higgsfield", "Midjourney", "Canva"],
  note: "Tools inside a workflow — not credentials.",
};

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export const capabilities: {
  group: string;
  caption: string;
  skills: { name: string; level?: SkillLevel }[];
}[] = [
  {
    group: "WEB",
    caption: "Building and shipping the interface.",
    skills: [
      { name: "WordPress", level: "Advanced" },
      { name: "Elementor", level: "Advanced" },
      { name: "HTML", level: "Intermediate" },
      { name: "CSS", level: "Intermediate" },
      { name: "PHP", level: "Intermediate" },
      { name: "JavaScript", level: "Beginner" },
    ],
  },
  {
    group: "CREATIVE",
    caption: "How it looks, moves and feels.",
    skills: [
      { name: "UI/UX", level: "Advanced" },
      { name: "3D / Web Animation", level: "Advanced" },
      { name: "Visual Design" },
      { name: "Video" },
    ],
  },
  {
    group: "AI",
    caption: "Where the work accelerates.",
    skills: [
      { name: "AI Tools", level: "Advanced" },
      { name: "Prompt Engineering", level: "Advanced" },
      { name: "AI Coding" },
      { name: "AI Website Generation" },
      { name: "AI Automation" },
      { name: "AI Agents" },
    ],
  },
];

export const story = {
  pullQuote:
    "A website can be a digital introduction — a way to communicate who you are before a single conversation begins.",
  paragraphs: [
    "I didn't begin with a traditional professional path.",
    "I started learning about computers during a period when I was distracted by many things around me. Slowly, I learned to focus and began discovering what technology could allow me to create.",
    "I became interested in websites because I saw them as more than pages on a screen. A website can be a digital introduction — a way for a person, creator, or business to communicate who they are before a single conversation begins.",
    "My first experiments with AI began with something simple: writing a prompt to transform an image. That small experiment opened the door to a much larger world of creative and technological possibilities.",
    "I learned WordPress because of its flexibility and the potential it provides to turn ideas into highly customized digital experiences.",
    "My first major project was an online clothing store. Since then, I've continued exploring web design, development, AI, automation, motion and interactive experiences.",
    "I don't come from a traditional professional background, but I don't believe that your starting point has to determine where you finish.",
    "I want to build meaningful things and leave behind a legacy that extends beyond my own work.",
  ],
};

export const contact = {
  heading: ["HAVE SOMETHING", "WORTH BUILDING?"],
  support:
    "Available for freelance websites, digital experiences and AI-assisted builds. Tell me what you're making — I'll tell you how I'd build it.",
};
