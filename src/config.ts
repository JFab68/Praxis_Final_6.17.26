export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavLink {
  label: string
  targetId: string
}

export interface NavigationConfig {
  brandMark: string
  links: NavLink[]
}

export interface HeroConfig {
  wordmarkText: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
  descriptionLine1: string
  descriptionLine2: string
  ctaText: string
  ctaTargetId: string
}

export interface PhilosophyConfig {
  eyebrow: string
  title: string
  body: string
  rollingWords: string[]
}

export interface ProjectMeta {
  label: string
  value: string
}

export interface ProjectData {
  id: string
  title: string
  location: string
  year: string
  image: string
  subtitle: string
  meta: ProjectMeta[]
  paragraphs: string[]
}

export interface GalleryConfig {
  sectionLabel: string
  title: string
  projects: ProjectData[]
}

export interface MediumItem {
  cn: string
  en: string
  description: string
}

export interface MediumsConfig {
  sectionLabel: string
  items: MediumItem[]
}

export interface FooterEntry {
  text: string
  href?: string
}

export interface FooterColumn {
  heading: string
  entries: FooterEntry[]
}

export interface FooterConfig {
  visionText: string
  brandName: string
  columns: FooterColumn[]
  copyright: string
  videoPath: string
}

export interface ProjectDetailConfig {
  backLabel: string
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Praxis Initiative | Arizona Criminal Legal System Reform",
  siteDescription: "Praxis Initiative is a 100% system-impacted Arizona nonprofit advancing independent prison oversight, criminal legal system reform, overdose prevention, civic advocacy training, and arts in prison programming.",
}

export const navigationConfig: NavigationConfig = {
  brandMark: "PI",
  links: [
    { label: "About", targetId: "about" },
    { label: "Programs", targetId: "programs" },
    { label: "Impact", targetId: "impact" },
    { label: "Contact", targetId: "footer" },
  ],
}

export const heroConfig: HeroConfig = {
  wordmarkText: "PRAXIS",
  eyebrow: "ARIZONA REFORM",
  titleLine1: "Without Us,",
  titleLine2: "There Is No Justice.",
  descriptionLine1: "System-impacted leadership transforming",
  descriptionLine2: "Arizona's criminal legal system.",
  ctaText: "Join Us",
  ctaTargetId: "philosophy",
}

export const philosophyConfig: PhilosophyConfig = {
  eyebrow: "What We Do",
  title: "Reform in Action",
  body: "Praxis Initiative advances independent prison oversight, criminal legal system reform, skills training for returning citizens, and arts programming inside Arizona prisons.",
  rollingWords: ["OVERSIGHT", "REFORM", "TRAINING", "ARTS"],
}

export const galleryConfig: GalleryConfig = {
  sectionLabel: "FEATURED CAMPAIGNS / 001",
  title: "Active Campaigns",
  projects: [
    {
      id: "OVERSIGHT",
      title: "Fund Oversight",
      location: "Arizona",
      year: "2025",
      image: "images/oversight-spotlight.jpg",
      subtitle: "Ensuring Arizona's Office of Correctional Oversight is funded and effective.",
      meta: [
        { label: "STATUS", value: "Active Campaign" },
        { label: "BUDGET", value: "$1.5M Annual" },
        { label: "IMPACT", value: "Statewide" },
      ],
      paragraphs: [
        "Creating an office on paper is not enough. Without funding, staffing, authority, reporting infrastructure, and public access, oversight becomes symbolic.",
        "Praxis is working to ensure Arizona funds and implements a real office, not a hollow title. For every $1,200 spent on the corrections status quo, $1 would support independent oversight.",
        "Join us in telling Arizona leaders: fund independent prison oversight now.",
      ],
    },
    {
      id: "REFORM",
      title: "Sentencing Reform",
      location: "Arizona",
      year: "2025",
      image: "images/policy-documents.jpg",
      subtitle: "Reducing unnecessary incarceration and expanding second chances.",
      meta: [
        { label: "FOCUS", value: "Legislative" },
        { label: "SCOPE", value: "Statewide" },
        { label: "TYPE", value: "Bipartisan" },
      ],
      paragraphs: [
        "Praxis works to reduce unnecessary incarceration, expand second chances, improve sentencing policy, support home confinement reform, and challenge practices that keep people trapped in cycles of punishment without improving public safety.",
        "We work with lawmakers, families, directly impacted people, attorneys, advocates, and bipartisan partners to move practical reforms that can survive contact with reality.",
      ],
    },
    {
      id: "HOME",
      title: "Home Confinement",
      location: "Arizona",
      year: "2025",
      image: "images/home-confinement.jpg",
      subtitle: "Supporting home confinement as a public safety strategy.",
      meta: [
        { label: "STATUS", value: "Advocacy" },
        { label: "FOCUS", value: "Reentry" },
        { label: "TYPE", value: "Policy" },
      ],
      paragraphs: [
        "Home confinement is a public safety strategy that allows eligible individuals to transition back to their communities under supervision while maintaining family connections and employment.",
        "Praxis advocates for expanding home confinement opportunities as a smart, cost-effective alternative to unnecessary incarceration.",
      ],
    },
    {
      id: "PREVENT",
      title: "Overdose Prevention",
      location: "Arizona",
      year: "2025",
      image: "images/overdose-prevention.jpg",
      subtitle: "Drug policy that reduces death, not recycles people through jail.",
      meta: [
        { label: "STATUS", value: "Active" },
        { label: "FOCUS", value: "Harm Reduction" },
        { label: "TYPE", value: "Education + Policy" },
      ],
      paragraphs: [
        "Praxis supports pragmatic, health-centered approaches to overdose prevention and drug policy. We advocate for policies that reduce death, reduce stigma, and connect people to support instead of cycling them through jail and prison.",
        "Our work includes overdose prevention education, harm reduction policy advocacy, community education, legislative strategy, and coalition partnership.",
      ],
    },
  ],
}

export const mediumsConfig: MediumsConfig = {
  sectionLabel: "PROGRAM AREAS",
  items: [
    {
      cn: "Oversight",
      en: "PRISON OVERSIGHT",
      description: "Independent prison oversight ensures accountability, transparency, and public safety by monitoring conditions inside correctional facilities and reporting findings to the public and lawmakers.",
    },
    {
      cn: "Reform",
      en: "LEGAL REFORM",
      description: "Criminal legal system reform reduces unnecessary incarceration, expands second chances, improves sentencing policy, and challenges practices that keep people trapped in cycles of punishment.",
    },
    {
      cn: "Training",
      en: "SKILLS TRAINING",
      description: "Skills training empowers returning citizens with digital literacy, civic advocacy knowledge, and modern workforce skills including AI literacy for opportunity and civic engagement.",
    },
    {
      cn: "Arts",
      en: "ARTS IN PRISON",
      description: "Arts programming inside prisons helps people build identity, connection, emotional regulation, and purpose through music, movement, creativity, and disciplined practice.",
    },
  ],
}

export const footerConfig: FooterConfig = {
  visionText: "Praxis Initiative is a 100% system-impacted nonprofit organization transforming Arizona's criminal legal system through independent prison oversight, reform, overdose prevention, civic advocacy training, and arts in prison programming.",
  brandName: "PRAXIS",
  columns: [
    {
      heading: "NAVIGATE",
      entries: [
        { text: "About", href: "/about" },
        { text: "Programs", href: "/programs" },
        { text: "Oversight", href: "/oversight" },
        { text: "Policy", href: "/policy" },
        { text: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "ACTION",
      entries: [
        { text: "Donate", href: "/donate" },
        { text: "Join the Movement", href: "/contact" },
        { text: "News & Updates", href: "/news" },
        { text: "Resources", href: "/resources" },
      ],
    },
    {
      heading: "CONTACT",
      entries: [
        { text: "Praxis Initiative\nPhoenix, Arizona", href: "" },
        { text: "info@praxisinitiative.org", href: "mailto:info@praxisinitiative.org" },
      ],
    },
  ],
  copyright: "© 2025 Praxis Initiative. 501(c)(3) nonprofit.",
  videoPath: "",
}

export const projectDetailConfig: ProjectDetailConfig = {
  backLabel: "← Back",
}

export function getProjectById(id: string): ProjectData | undefined {
  return galleryConfig.projects.find((p) => p.id === id)
}
