// ─── Site-wide Constants ───────────────────────────────────────────

export const SITE = {
    name: 'Surya',
    email: 'suryadevprojects@gmail.com',
    location: 'Odisha, India',
    github: 'https://github.com/SSuryaRao',
    telegram: 'https://t.me/SuryaDev_AutoBot',
} as const

// ─── Navigation ────────────────────────────────────────────────────

export const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
] as const

// ─── About Section ─────────────────────────────────────────────────

export interface SkillCategory {
    label: string
    skills: string[]
}

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        label: 'Frontend',
        skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Three.js'],
    },
    {
        label: 'Backend',
        skills: ['Node.js', 'Python', 'Supabase', 'PostgreSQL'],
    },
    {
        label: 'AI & Tools',
        skills: ['OpenAI', 'LangChain', 'Git', 'Figma', 'WebGL/GLSL'],
    },
]

export interface Stat {
    value: string
    label: string
}

export const STATS: Stat[] = [
    { value: '2+', label: 'Years Experience' },
    { value: '10+', label: 'Projects' },
    { value: '3', label: 'Awards' },
]

// ─── Services Section ──────────────────────────────────────────────

export interface Service {
    title: string
    description: string
    iconId: 'code' | 'automation' | 'performance'
    hoverBorder: string
    gradientFrom: string
    gradientTo: string
}

export const SERVICES: Service[] = [
    {
        title: 'Custom Web Development',
        description: 'Scalable, high-performance web applications built with Next.js and React. Tailored to your business needs.',
        iconId: 'code',
        hoverBorder: 'hover:border-cyan-500/50',
        gradientFrom: 'from-cyan-600/10',
        gradientTo: 'to-cyan-400/10',
    },
    {
        title: 'Business Automation',
        description: 'Automate repetitive tasks with Python scripts and AI Agents (OpenAI/LangChain). Save time and reduce errors.',
        iconId: 'automation',
        hoverBorder: 'hover:border-violet-500/50',
        gradientFrom: 'from-violet-600/10',
        gradientTo: 'to-violet-400/10',
    },
    {
        title: 'Performance Optimization',
        description: 'Enhance SEO, load speeds, and user experience. Ensure your digital presence is fast, accessible, and visible.',
        iconId: 'performance',
        hoverBorder: 'hover:border-emerald-500/50',
        gradientFrom: 'from-emerald-600/10',
        gradientTo: 'to-emerald-400/10',
    },
]

// ─── Projects Section ──────────────────────────────────────────────

export interface ProjectTag {
    label: string
    colorClass: string
}

export interface Project {
    title: string
    description: string
    tags: ProjectTag[]
    iconId: 'graduation' | 'gamepad'
    accentFrom: string
    accentTo: string
    hoverBorder: string
    liveUrl: string
    githubUrl: string
}

export const PROJECTS: Project[] = [
    {
        title: 'Digital Guidance Platform',
        description: 'A one-stop tailored guidance platform for students — aptitude quizzes, course recommendations, college search with nearby government institutions, and deadline tracking for admissions and scholarships. Built for SIH 2025.',
        tags: [
            { label: 'Next.js', colorClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
            { label: 'SIH 2025', colorClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
        ],
        iconId: 'graduation',
        accentFrom: 'from-blue-600/20',
        accentTo: 'to-emerald-600/20',
        hoverBorder: 'hover:border-blue-500/50',
        liveUrl: 'https://sih-2025-indol.vercel.app/',
        githubUrl: '',
    },
    {
        title: 'BGMI Store',
        description: 'A digital marketplace for premium BGMI gaming assets. Buy UC, battle passes, elite passes, and exclusive skins with instant delivery, verified sellers, and 24/7 support.',
        tags: [
            { label: 'Next.js', colorClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
            { label: 'Tailwind CSS', colorClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
            { label: 'Auth', colorClass: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
        ],
        iconId: 'gamepad',
        accentFrom: 'from-orange-600/20',
        accentTo: 'to-red-600/20',
        hoverBorder: 'hover:border-orange-500/50',
        liveUrl: 'https://bgmistore.vercel.app/',
        githubUrl: '',
    },
]

// ─── Viksit Bharat Journey ─────────────────────────────────────────

export interface JourneyStage {
    title: string
    description: string
    colorClass: string
    isHighlighted?: boolean
}

export const VIKSIT_BHARAT_STAGES: JourneyStage[] = [
    {
        title: 'Stage 1: The Quiz',
        description: 'Selected among top performers in the initial screening.',
        colorClass: 'text-yellow-400',
    },
    {
        title: 'Stage 2: The Essay',
        description: "Drafted a vision for India's future, selected for state representation.",
        colorClass: 'text-orange-400',
    },
    {
        title: 'Stage 3: State Level',
        description: 'Presented the proposal at the state symposium, winning 3rd prize.',
        colorClass: 'text-red-400',
    },
    {
        title: 'Stage 4: National Finals',
        description: 'Represented Odisha at Bharat Mandapam, New Delhi.',
        colorClass: 'text-white',
        isHighlighted: true,
    },
]
