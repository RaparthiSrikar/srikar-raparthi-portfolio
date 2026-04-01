import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Menu,
  X,
  Code2,
  Globe,
  Calendar,
  MessageCircle,
  ArrowLeft,
  Download,
  Monitor,
  Folder,
  FileText,
  Star,
  Award,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

// --- Global Data ---

const projects = [
  {
    slug: 'vedant-high-school',
    title: 'Vedant High School',
    category: 'Education Platform',
    desc: 'Designed and developed a fully responsive school website featuring a custom Node.js backend, TypeScript integration, and advanced SEO optimization for maximum community engagement.',
    tags: ['React.js', 'TypeScript', 'Node.js', 'SEO'],
    image: '/assets/vedant-school.png',
    github: 'https://github.com/RaparthiSrikar/vedant-high-school.git',
    live: 'https://www.vedanthighschoolnalgonda.org/',
    longDesc: 'Vedant High School project was a complete digital transformation for a regional educational institution. The goal was to provide a modern, accessible, and information-rich platform for students and parents alike. I implemented a robust backend using Node.js to handle dynamic content management, ensuring that school administrators can easily update announcements and events.',
    features: ['Custom dynamic events management', 'Direct WhatsApp integration for parental support', 'Fully responsive mobile-first architecture', 'Advanced SEO for regional search visibility']
  },
  {
    slug: 'railway-ticket-booking',
    title: 'Railway Ticket Booking',
    category: 'Modern Web App',
    desc: 'Modernized a legacy Python/Tkinter application into a sleek React/Vite SPA with local persistence using browser storage and responsive glassmorphism UI.',
    tags: ['React', 'Vite', 'Vanilla CSS'],
    image: '/assets/railway-booking.png',
    github: 'https://github.com/RaparthiSrikar/Railway-Ticket-Booking.git',
    live: 'https://railway-ticket-booking-dhkn.vercel.app/',
    longDesc: 'Transitioned a complex ticket booking logic from a desktop-bound Python app to a modern web application. Maintained the original data integrity and logic while drastically improving accessibility.',
    features: ['Local storage persistence for offline use', 'Modern UI design', 'Secure client-side data validation', 'Real-time input masking for ticket IDs']
  },
  {
    slug: 'heema-services',
    title: 'Heema Services',
    category: 'Freelance Solution',
    desc: 'Built high-performance, full-stack web applications using React.js and Node.js for real-world clients, emphasizing scalable API architectures and user-centric design.',
    tags: ['React.js', 'Node.js', 'TypeScript'],
    image: '/assets/heema-services.png',
    github: 'https://github.com/RaparthiSrikar/Heema-services-nlg.git',
    live: 'https://www.heemaservicesnalgonda.com/',
    longDesc: 'Heema Services represents a collection of freelance web solutions tailored for local business automation and marketing.',
    features: ['API-first architecture', 'Real-time client lead synchronization', 'Lightweight, ultra-fast frontend performance', 'Domain-specific SEO strategies']
  },
  {
    slug: 'srujana-dental',
    title: 'Srujana Dental Hospital',
    category: 'Healthcare Platform',
    desc: 'Developed a professional, high-conversion website for Srujana Dental Hospital, featuring specialized treatment modules and regional SEO optimization.',
    tags: ['React', 'Modern UI', 'Healthcare'],
    image: '/assets/srujana-dental.png',
    github: 'https://github.com/RaparthiSrikar',
    live: 'https://srujana-dental-nalgonda.vercel.app/',
    longDesc: 'Srujana Dental Hospital was a comprehensive branding and web development project creating a clean, trustworthy digital presence.',
    features: ['Custom healthcare service modules', 'Automated emergency inquiry system', 'Localized SEO for Nalgonda region', 'High-performance image optimization']
  },
  {
    slug: 'sravanthi-high-school',
    title: 'Sravanthi High School',
    category: 'Education Platform',
    desc: 'An information-rich educational portal featuring dynamic academic calendars, performance tracking modules, and interactive student resources.',
    tags: ['React', 'Node.js', 'Education'],
    image: '/assets/sravanthi-school.png',
    github: 'https://github.com/RaparthiSrikar',
    live: 'https://www.sravanthihighschoolnalgonda.org/',
    longDesc: 'Sravanthi High School portal was designed to bridge the communication gap between faculty and parents.',
    features: ['Academic calendar synchronization', 'Digital resource repository', 'Secure teacher-parent communications', 'Optimized for low-bandwidth environments']
  }
];

const testimonials = [
  {
    name: 'Robert Fox',
    role: 'CEO at TechFlow',
    text: 'Srikar is a professional and highly skilled developer. He really understands the user needs and delivers exceptional results.',
    avatar: 'https://i.pravatar.cc/150?u=robert'
  },
  {
    name: 'Jane Cooper',
    role: 'Product Manager at Innovate',
    text: 'Working with Srikar was a pleasure. He is creative, responsive, and has a great eye for detail. Highly recommended!',
    avatar: 'https://i.pravatar.cc/150?u=jane'
  }
];

// --- Utilities ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Win2K Clock component
const Win2KClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="win-clock text-xs font-sans">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
};

// Win2K Window Title Bar Buttons
const TitleBarButtons = ({ onMinimize, onMaximize, onClose }: { onMinimize?: () => void; onMaximize?: () => void; onClose?: () => void }) => (
  <div className="flex items-center gap-[2px]">
    <button className="win-titlebar-btn" onClick={onMinimize} title="Minimize">_</button>
    <button className="win-titlebar-btn" onClick={onMaximize} title="Maximize">□</button>
    <button className="win-titlebar-btn" onClick={onClose} title="Close" style={{ fontWeight: 'bold' }}>✕</button>
  </div>
);

// Win2K Window wrapper
const Win2KWindow = ({
  title,
  icon,
  children,
  className = '',
  onClose,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}) => (
  <div className={`win-window ${className}`}>
    <div className="win-titlebar">
      <div className="flex items-center gap-1">
        {icon && <span className="text-xs">{icon}</span>}
        <span className="text-xs font-bold">{title}</span>
      </div>
      <TitleBarButtons onClose={onClose} />
    </div>
    {children}
  </div>
);

// WhatsApp FAB - Win2K style
const WhatsAppFAB = () => (
  <a
    href="https://wa.me/917330668526"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-10 right-4 z-[60] win-btn flex items-center gap-1 font-bold"
    style={{ fontSize: 11, padding: '4px 10px' }}
  >
    <MessageCircle size={14} />
    Chat with me!
  </a>
);

// Win2K Navbar / Menu Bar at the top
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Works', href: isHome ? '#works' : '/#works' },
    { name: 'Skills', href: isHome ? '#skills' : '/#skills' },
    { name: 'Testimonials', href: isHome ? '#testimonials' : '/#testimonials' },
    { name: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ];

  return (
    <nav style={{ background: '#d4d0c8', borderBottom: '2px solid #808080', position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Menu bar row */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '2px 4px', gap: 2 }}>
        {/* Logo */}
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ marginRight: 8 }}>
          <div style={{
            width: 24, height: 24, overflow: 'hidden',
            border: '1px solid #808080', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#ffffff'
          }}>
            <img src="/assets/final-brand-icon.png" alt="SR" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
        </Link>
        <span style={{ fontWeight: 'bold', fontSize: 12, marginRight: 12 }}>Srikar Raparthi - Portfolio</span>

        {/* Desktop menu underline links */}
        <div className="hidden md:flex items-center" style={{ gap: 0 }}>
          {navLinks.map(link =>
            link.href.startsWith('#') ? (
              <a
                key={link.name}
                href={link.href}
                className="win-menubar-item"
              >
                <u>{link.name[0]}</u>{link.name.slice(1)}
              </a>
            ) : (
              <Link key={link.name} to={link.href} className="win-menubar-item">
                <u>{link.name[0]}</u>{link.name.slice(1)}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center" style={{ marginLeft: 'auto', gap: 4 }}>
          <a
            href="/assets/resume.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="win-btn flex items-center gap-1"
          >
            <FileText size={12} /> Resume
          </a>
          <a href="#contact" className="win-btn flex items-center gap-1" style={{ background: '#0831a4', color: '#fff', borderColor: '#1055c8 #000080 #000080 #1055c8' }}>
            <Mail size={12} /> Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden win-btn ml-auto" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div style={{ background: '#d4d0c8', borderTop: '1px solid #808080', padding: '4px 8px' }}>
          {navLinks.map(link =>
            link.href.startsWith('#') ? (
              <a key={link.name} href={link.href} className="win-list-item block" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </a>
            ) : (
              <Link key={link.name} to={link.href} className="win-list-item block" style={{ padding: '4px 8px', fontSize: 11 }} onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </Link>
            )
          )}
          <div className="win-divider" />
          <a href="#contact" className="win-btn block text-center mt-1" style={{ fontSize: 11 }} onClick={() => setIsMobileMenuOpen(false)}>Hire Me</a>
        </div>
      )}
    </nav>
  );
};

// Marquee ticker
const MarqueeTicker = () => (
  <div className="win-marquee-container" style={{ padding: '3px 0' }}>
    <marquee behavior="scroll" direction="left" scrollamount={3} style={{ fontSize: 11 }}>
      *** AVAILABLE FOR FREELANCE *** | React.js | Node.js | Python | TypeScript | SQLite | Git | Web Developer | Open to Projects | Contact: srikar.raparthi1026@gmail.com | +91 73306 68526 | Nalgonda, Telangana, India ***
    </marquee>
  </div>
);

// Hero as a Win2K desktop scene
const Hero = () => {
  const [roleIndex, setRoleIndex] = React.useState(0);
  const roles = ['Web Developer', 'Python Developer'];
  const [blink, setBlink] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => setRoleIndex(prev => (prev + 1) % roles.length), 3000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }} id="home">
      {/* Marquee */}
      <MarqueeTicker />

      {/* Main layout */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>

        {/* Desktop icons column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 90 }}>
          {[
            { label: 'My Projects', icon: <Folder size={32} color="#FFD700" />, href: '#works' },
            { label: 'About Me', icon: <Monitor size={32} color="#c8d0e8" />, href: '#skills' },
            { label: 'Contact', icon: <MessageSquare size={32} color="#a0c8e0" />, href: '#contact' },
            { label: 'Resume.jpg', icon: <FileText size={32} color="#ffffff" />, href: '/assets/resume.jpg' },
            { label: 'GitHub', icon: <Github size={32} color="#ffffff" />, href: 'https://github.com/RaparthiSrikar' },
            { label: 'LinkedIn', icon: <Linkedin size={32} color="#0a88cc" />, href: 'https://www.linkedin.com/in/srikarraparthi' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="win-desktop-icon"
            >
              {item.icon}
              <span style={{ fontSize: 11 }}>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Hero window */}
        <div style={{ flex: 1, minWidth: 280 }}>
          <Win2KWindow title="Welcome - Srikar Raparthi.exe" icon={<Monitor size={12} color="#ffffff" />}>
            {/* Menu bar inside window */}
            <div className="win-menubar">
              {['File', 'Edit', 'View', 'Help'].map(m => (
                <span key={m} className="win-menubar-item"><u>{m[0]}</u>{m.slice(1)}</span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
              {/* Photo panel */}
              <div style={{ width: 160, padding: 8, borderRight: '1px solid #808080', flexShrink: 0 }}>
                <div className="win-inset" style={{ padding: 4, marginBottom: 8 }}>
                  <img
                    src="/assets/hero-image.png"
                    alt="Srikar Raparthi"
                    style={{ width: '100%', height: 180, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  />
                </div>
                <div style={{ background: '#0831a4', color: '#fff', padding: '2px 4px', fontSize: 10, textAlign: 'center' }}>
                  Srikar Raparthi
                </div>
                <div style={{ fontSize: 10, color: '#808080', marginTop: 4, textAlign: 'center' }}>
                  Freelance Developer<br />Nalgonda, India
                </div>
              </div>

              {/* Info panel */}
              <div style={{ flex: 1, padding: 12, minWidth: 200 }}>
                {/* Available badge */}
                <div style={{
                  background: '#00aa00', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 8px', fontSize: 10, marginBottom: 10, border: '1px solid #006600'
                }}>
                  <span style={{ width: 8, height: 8, background: '#00ff00', borderRadius: '50%', display: 'inline-block', animation: 'blink 1s step-end infinite' }}></span>
                  AVAILABLE FOR FREELANCE
                </div>

                <div style={{ fontSize: 22, fontWeight: 'bold', color: '#000080', fontFamily: 'Tahoma, Arial', marginBottom: 4, lineHeight: 1.2 }}>
                  Hi, I am<br />
                  <span style={{ color: '#0831a4' }}>Srikar Raparthi</span>
                </div>

                <div style={{ fontSize: 14, fontWeight: 'bold', color: '#000000', marginBottom: 8, fontFamily: 'Courier New', display: 'flex', alignItems: 'center', gap: 4 }}>
                  &gt; {roles[roleIndex]}
                  <span style={{ opacity: blink ? 1 : 0, color: '#000080' }}>_</span>
                </div>

                <div className="win-inset" style={{ padding: 8, marginBottom: 12, fontSize: 11, lineHeight: '16px', color: '#000000' }}>
                  I am an independent freelance developer specialized in designing and building
                  high-impact digital solutions. With multiple successful client deliveries,
                  I focus on creating high-performance applications that drive real-world results.
                </div>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Projects', value: '5+' },
                    { label: 'Clients', value: '4+' },
                    { label: 'Exp', value: '2+ Yrs' },
                  ].map(stat => (
                    <div key={stat.label} className="win-inset" style={{ padding: '4px 10px', textAlign: 'center', flex: 1, minWidth: 60 }}>
                      <div style={{ fontSize: 14, fontWeight: 'bold', color: '#0831a4' }}>{stat.value}</div>
                      <div style={{ fontSize: 9, color: '#808080' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <a href="#contact" className="win-btn flex items-center gap-1">
                    <Mail size={12} /> Hire Me
                  </a>
                  <a href="/assets/resume.jpg" target="_blank" rel="noopener noreferrer" className="win-btn flex items-center gap-1">
                    <Download size={12} /> Resume
                  </a>
                  <a href="https://github.com/RaparthiSrikar" target="_blank" rel="noopener noreferrer" className="win-btn flex items-center gap-1">
                    <Github size={12} /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/srikarraparthi" target="_blank" rel="noopener noreferrer" className="win-btn flex items-center gap-1">
                    <Linkedin size={12} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Status bar */}
            <div className="win-statusbar">
              <div className="win-statusbar-panel">Ready</div>
              <div className="win-statusbar-panel" style={{ flex: 2 }}>Freelance Developer | Nalgonda, India</div>
              <div className="win-statusbar-panel">v2.0.0</div>
            </div>
          </Win2KWindow>
        </div>
      </div>
    </section>
  );
};

// Trusted By ticker
const TrustedBy = () => {
  const companies = ['Vedhant School', 'Sravanthi School', 'Heema Services', 'Srujana Dental'];
  return (
    <div style={{ padding: '0 16px 12px' }}>
      <Win2KWindow title="Trusted_By.txt - Notepad">
        <div style={{ padding: 8 }}>
          <div style={{ fontSize: 10, color: '#808080', marginBottom: 4 }}>// Trusted Brands</div>
          <div className="win-inset" style={{ padding: 6 }}>
            <marquee behavior="scroll" direction="left" scrollamount={4} style={{ fontSize: 13, fontWeight: 'bold', color: '#0831a4' }}>
              {[...companies, ...companies, ...companies].join('   ✦   ')}
            </marquee>
          </div>
        </div>
      </Win2KWindow>
    </div>
  );
};

// Recent Projects section
const RecentProjects = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <section id="works" style={{ padding: '0 16px 16px' }}>
      <Win2KWindow title="My Projects - Windows Explorer" icon={<Folder size={12} color="#FFD700" />}>
        <div className="win-menubar">
          {['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'].map(m => (
            <span key={m} className="win-menubar-item"><u>{m[0]}</u>{m.slice(1)}</span>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', gap: 4, padding: '4px 6px', background: '#d4d0c8', borderBottom: '1px solid #808080', alignItems: 'center' }}>
          <button className="win-btn" style={{ padding: '2px 8px' }} onClick={() => navigate('/')}>
            ← Back
          </button>
          <button className="win-btn" style={{ padding: '2px 8px' }} onClick={() => navigate('/projects')}>
            View All →
          </button>
          <div className="win-inset" style={{ flex: 1, padding: '2px 6px', fontSize: 11 }}>
            C:\Portfolio\Projects\
          </div>
        </div>

        <div style={{ display: 'flex', minHeight: 400 }}>
          {/* Left panel - file tree */}
          <div style={{ width: 160, borderRight: '2px solid #808080', padding: 8, background: '#ece9d8', flexShrink: 0 }}>
            <div style={{ fontWeight: 'bold', fontSize: 11, color: '#0831a4', marginBottom: 8 }}>Folders</div>
            <div className="win-divider" />
            {projects.map((p, i) => (
              <div
                key={i}
                className="win-list-item"
                style={{
                  padding: '3px 4px', fontSize: 11, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4,
                  background: selectedProject === p.slug ? '#0831a4' : 'transparent',
                  color: selectedProject === p.slug ? '#ffffff' : '#000000'
                }}
                onClick={() => setSelectedProject(p.slug === selectedProject ? null : p.slug)}
              >
                <Folder size={12} color={selectedProject === p.slug ? '#FFD700' : '#FFD700'} />
                {p.title}
              </div>
            ))}
          </div>

          {/* Right panel - project grid */}
          <div style={{ flex: 1, padding: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {projects.slice(0, 4).map((project, i) => (
                <div key={i} className="win-panel" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => navigate(`/project/${project.slug}`)}>
                  <div style={{ background: '#0831a4', color: '#fff', padding: '2px 6px', fontSize: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Folder size={10} color="#FFD700" /> {project.category}
                  </div>
                  <div className="win-inset" style={{ margin: 6, overflow: 'hidden', height: 100 }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '4px 8px 6px', fontSize: 11 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: 2 }}>{project.title}</div>
                    <div style={{ color: '#808080', fontSize: 10, marginBottom: 4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {project.desc}
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 4 }}>
                      {project.tags.map(t => (
                        <span key={t} style={{ fontSize: 9, background: '#d4d0c8', border: '1px solid #808080', padding: '1px 4px' }}>{t}</span>
                      ))}
                    </div>
                    <button
                      className="win-btn"
                      style={{ fontSize: 10, padding: '2px 6px' }}
                      onClick={(e) => { e.stopPropagation(); navigate(`/project/${project.slug}`); }}
                    >
                      Open Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="win-statusbar">
          <div className="win-statusbar-panel">{projects.length} object(s)</div>
          <div className="win-statusbar-panel" style={{ flex: 2 }}>Select a project to view details</div>
        </div>
      </Win2KWindow>
    </section>
  );
};

// All Projects Page
const ProjectsPage = () => {
  const navigate = useNavigate();
  return (
    <div className="win-desktop" style={{ padding: 16 }}>
      <Win2KWindow title="All Projects - Windows Explorer" icon={<Folder size={12} color="#FFD700" />}>
        <div className="win-menubar">
          {['File', 'Edit', 'View', 'Help'].map(m => (
            <span key={m} className="win-menubar-item"><u>{m[0]}</u>{m.slice(1)}</span>
          ))}
        </div>
        <div style={{ padding: '4px 6px', display: 'flex', gap: 4, background: '#d4d0c8', borderBottom: '1px solid #808080' }}>
          <button className="win-btn" onClick={() => navigate('/')}>← Back to Home</button>
          <div className="win-inset" style={{ flex: 1, padding: '2px 6px', fontSize: 11 }}>C:\Portfolio\Projects\</div>
        </div>
        <div style={{ padding: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {projects.map((project, i) => (
              <div key={i} className="win-panel" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate(`/project/${project.slug}`)}>
                <div style={{ background: '#0831a4', color: '#fff', padding: '2px 6px', fontSize: 10 }}>
                  {project.category}
                </div>
                <div className="win-inset" style={{ margin: 6, height: 90, overflow: 'hidden' }}>
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '2px 8px 8px', fontSize: 11 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: 2 }}>{project.title}</div>
                  <button className="win-btn" style={{ fontSize: 10, padding: '2px 6px' }}>Open →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="win-statusbar">
          <div className="win-statusbar-panel">{projects.length} object(s)</div>
          <div className="win-statusbar-panel" style={{ flex: 2 }}>All Projects</div>
        </div>
      </Win2KWindow>
    </div>
  );
};

// Project Detail Page
const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === slug);
  if (!project) return null;

  return (
    <div className="win-desktop" style={{ padding: 16 }}>
      <Win2KWindow title={`${project.title} - Properties`} icon={<Folder size={12} color="#FFD700" />}>
        <div style={{ padding: '4px 6px', display: 'flex', gap: 4, background: '#d4d0c8', borderBottom: '1px solid #808080' }}>
          <button className="win-btn" onClick={() => navigate(-1)}>← Back</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', padding: '6px 8px 0', gap: 2 }}>
          <div className="win-tab active">{project.title}</div>
          <div className="win-tab">Details</div>
        </div>

        <div style={{ border: '2px solid #ffffff', borderTop: 'none', background: '#ece9d8', padding: 12 }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {/* Image */}
            <div style={{ flex: '0 0 260px' }}>
              <div className="win-inset" style={{ padding: 4, marginBottom: 8 }}>
                <img src={project.image} alt={project.title} style={{ width: '100%', display: 'block' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="win-btn flex items-center gap-1" style={{ justifyContent: 'center', fontSize: 11 }}>
                  <Globe size={12} /> Launch Live Site
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="win-btn flex items-center gap-1" style={{ justifyContent: 'center', fontSize: 11 }}>
                  <Github size={12} /> GitHub Repository
                </a>
              </div>
            </div>

            {/* Details */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: '#808080', textTransform: 'uppercase', marginBottom: 2 }}>Category:</div>
                <div style={{ fontSize: 11, fontWeight: 'bold', color: '#0831a4' }}>{project.category}</div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: '#808080', textTransform: 'uppercase', marginBottom: 2 }}>Title:</div>
                <div style={{ fontSize: 14, fontWeight: 'bold' }}>{project.title}</div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: '#808080', textTransform: 'uppercase', marginBottom: 2 }}>Description:</div>
                <div className="win-inset" style={{ padding: 6, fontSize: 11, lineHeight: '16px' }}>{project.longDesc}</div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, color: '#808080', textTransform: 'uppercase', marginBottom: 4 }}>Tech Stack:</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {project.tags.map(t => (
                    <span key={t} className="win-panel" style={{ padding: '2px 8px', fontSize: 10 }}>{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: '#808080', textTransform: 'uppercase', marginBottom: 4 }}>Key Features:</div>
                <div className="win-inset" style={{ padding: 6 }}>
                  {project.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 11, marginBottom: 4 }}>
                      <CheckCircle2 size={12} color="#0831a4" style={{ flexShrink: 0, marginTop: 1 }} />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="win-statusbar">
          <div className="win-statusbar-panel">Status: Successfully Live</div>
          <div className="win-statusbar-panel" style={{ flex: 2 }}>{project.tags.join(' | ')}</div>
        </div>
      </Win2KWindow>
    </div>
  );
};

// Experience section
const Experience = () => {
  const education = [
    { company: 'Presidency University, Bengaluru', role: 'B Tech - ECE (6.67 CGPA)', date: '2019 - 2023', desc: 'Electronics & Communication Engineering' },
    { company: 'Sri Chaitanya Junior College, Hyderabad', role: 'Intermediate - MPC (8.1 CGPA)', date: '2017 - 2019', desc: 'Mathematics, Physics, Chemistry' },
    { company: 'Sri Prakash Residential School', role: 'CBSC (6.2 CGPA)', date: '2016 - 2017', desc: 'Secondary School Certificate' }
  ];
  const work = [
    { company: 'Self-Employed', role: 'Freelance Full-Stack Developer', date: '2023 - Present', desc: 'Building and deploying end-to-end digital solutions using MERN stack and Python.' }
  ];

  return (
    <section id="experience" style={{ padding: '0 16px 16px' }}>
      <Win2KWindow title="experience.txt - Notepad" icon={<FileText size={12} color="#ffffff" />}>
        <div className="win-menubar">
          {['File', 'Edit', 'Format', 'Help'].map(m => (
            <span key={m} className="win-menubar-item"><u>{m[0]}</u>{m.slice(1)}</span>
          ))}
        </div>
        <div style={{ padding: 12, background: '#ffffff', minHeight: 200 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Education */}
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 11, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Award size={14} color="#0831a4" /> Education
              </div>
              {education.map((item, i) => (
                <div key={i} className="win-panel" style={{ padding: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 9, color: '#0831a4', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.date}</div>
                  <div style={{ fontWeight: 'bold', fontSize: 11, margin: '2px 0' }}>{item.role}</div>
                  <div style={{ fontSize: 10, color: '#808080' }}>{item.company}</div>
                </div>
              ))}
            </div>
            {/* Work */}
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 11, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle2 size={14} color="#0831a4" /> Experience
              </div>
              {work.map((item, i) => (
                <div key={i} className="win-panel" style={{ padding: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 9, color: '#0831a4', fontWeight: 'bold', textTransform: 'uppercase' }}>{item.date}</div>
                  <div style={{ fontWeight: 'bold', fontSize: 11, margin: '2px 0' }}>{item.role}</div>
                  <div style={{ fontSize: 10, color: '#808080' }}>{item.company}</div>
                  <div style={{ fontSize: 10, marginTop: 4 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="win-statusbar">
          <div className="win-statusbar-panel">Ln 1, Col 1</div>
          <div className="win-statusbar-panel" style={{ flex: 2 }}>Education &amp; Work Experience</div>
        </div>
      </Win2KWindow>
    </section>
  );
};

// Skills section
const Skills = () => {
  const skills = [
    { name: 'React.js', level: 92, image: '/assets/skill-react.png', icon: 'R' },
    { name: 'JavaScript', level: 90, image: '/assets/skill-js.png', icon: 'JS' },
    { name: 'Python', level: 85, image: '/assets/skill-python.png', icon: 'Py' },
    { name: 'Node.js', level: 88, image: '/assets/skill-node.png', icon: 'N' },
    { name: 'SQLite', level: 82, image: '/assets/skill-sqlite.png', icon: 'SQL' },
    { name: 'Git', level: 90, image: '/assets/skill-git.png', icon: 'G' },
  ];

  return (
    <section id="skills" style={{ padding: '0 16px 16px' }}>
      <Win2KWindow title="System Properties - Performance" icon={<Monitor size={12} color="#ffffff" />}>
        <div className="win-menubar">
          {['File', 'Help'].map(m => (
            <span key={m} className="win-menubar-item"><u>{m[0]}</u>{m.slice(1)}</span>
          ))}
        </div>
        <div style={{ padding: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 8 }}>My Skills</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
            {skills.map((skill, i) => (
              <div key={i} className="win-panel" style={{ padding: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                  <div className="win-inset" style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img
                      src={skill.image}
                      alt={skill.name}
                      style={{ width: 20, height: 20, objectFit: 'contain' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const next = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                        if (next) next.style.display = 'block';
                      }}
                    />
                    <span style={{ display: 'none', fontSize: 9, fontWeight: 'bold' }}>{skill.icon}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: 11 }}>{skill.name}</div>
                    <div style={{ fontSize: 9, color: '#808080' }}>{skill.level}%</div>
                  </div>
                </div>
                <div className="win-progress-track">
                  <div
                    className="win-progress-bar"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="win-statusbar">
          <div className="win-statusbar-panel">Performance: Excellent</div>
          <div className="win-statusbar-panel" style={{ flex: 2 }}>Skills loaded successfully</div>
        </div>
      </Win2KWindow>
    </section>
  );
};

// Testimonials
const Testimonials = () => {
  return (
    <section id="testimonials" style={{ padding: '0 16px 16px' }}>
      <Win2KWindow title="Client Testimonials - Message Center" icon={<MessageSquare size={12} color="#ffffff" />}>
        <div className="win-menubar">
          {['File', 'View', 'Help'].map(m => (
            <span key={m} className="win-menubar-item"><u>{m[0]}</u>{m.slice(1)}</span>
          ))}
        </div>
        <div style={{ padding: 12 }}>
          <div style={{ fontWeight: 'bold', fontSize: 11, marginBottom: 8 }}>Client Testimonials</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
            {testimonials.map((t, i) => (
              <div key={i} className="win-inset" style={{ padding: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, borderBottom: '1px solid #d4d0c8', paddingBottom: 6 }}>
                  <div style={{ width: 32, height: 32, border: '1px solid #808080', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: 11 }}>{t.name}</div>
                    <div style={{ fontSize: 9, color: '#808080' }}>{t.role}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, lineHeight: '16px', fontStyle: 'italic', color: '#000000' }}>
                  &quot;{t.text}&quot;
                </div>
                <div style={{ display: 'flex', gap: 2, marginTop: 6 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={10} color="#FFD700" fill="#FFD700" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="win-statusbar">
          <div className="win-statusbar-panel">{testimonials.length} messages</div>
          <div className="win-statusbar-panel" style={{ flex: 2 }}>Inbox</div>
        </div>
      </Win2KWindow>
    </section>
  );
};

// Contact form
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email format';
    if (!formData.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: "YOUR_ACCESS_KEY_HERE", ...formData }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else { alert("Something went wrong. Please try again."); }
    } catch { alert("Submission failed. Please check your connection."); }
    finally { setIsSubmitting(false); }
  };

  return (
    <section id="contact" style={{ padding: '0 16px 16px' }}>
      <Win2KWindow title="Send Message - New Mail" icon={<Mail size={12} color="#ffffff" />}>
        <div className="win-menubar">
          {['File', 'Edit', 'View', 'Insert', 'Help'].map(m => (
            <span key={m} className="win-menubar-item"><u>{m[0]}</u>{m.slice(1)}</span>
          ))}
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', gap: 4, padding: '4px 6px', background: '#d4d0c8', borderBottom: '1px solid #808080', flexWrap: 'wrap' }}>
          <button className="win-btn" style={{ fontSize: 11 }} type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '⏳ Sending...' : '📨 Send'}
          </button>
          <div style={{ borderLeft: '1px solid #808080', borderRight: '1px solid #ffffff', width: 2, margin: '0 2px' }} />
          <a href="mailto:srikar.raparthi1026@gmail.com" className="win-btn" style={{ fontSize: 11 }}>📧 Direct Email</a>
          <a href="https://wa.me/917330668526" target="_blank" rel="noopener noreferrer" className="win-btn" style={{ fontSize: 11 }}>💬 WhatsApp</a>
        </div>

        <div style={{ display: 'flex', gap: 16, padding: 12, flexWrap: 'wrap' }}>
          {/* Contact info */}
          <div style={{ width: 200, flexShrink: 0 }}>
            <div style={{ fontWeight: 'bold', fontSize: 11, marginBottom: 8 }}>Contact Information</div>
            {[
              { icon: <Mail size={12} />, label: 'Email', value: 'srikar.raparthi1026@gmail.com' },
              { icon: <Phone size={12} />, label: 'Phone', value: '+91 73306 68526' },
              { icon: <MapPin size={12} />, label: 'Location', value: 'Nalgonda, Telangana, India' },
            ].map((c, i) => (
              <div key={i} className="win-inset" style={{ padding: 6, marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: '#808080', marginBottom: 2 }}>
                  {c.icon} {c.label}
                </div>
                <div style={{ fontSize: 11, fontWeight: 'bold', wordBreak: 'break-all' }}>{c.value}</div>
              </div>
            ))}

            <div style={{ marginTop: 10 }}>
              <div style={{ fontWeight: 'bold', fontSize: 11, marginBottom: 6 }}>Social Links</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <a href="https://github.com/RaparthiSrikar" target="_blank" rel="noopener noreferrer" className="win-btn flex items-center gap-1" style={{ fontSize: 11, justifyContent: 'flex-start' }}>
                  <Github size={12} /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/srikarraparthi" target="_blank" rel="noopener noreferrer" className="win-btn flex items-center gap-1" style={{ fontSize: 11, justifyContent: 'flex-start' }}>
                  <Linkedin size={12} /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* To / From fields */}
              {[
                { label: 'To:', value: 'srikar.raparthi1026@gmail.com', readOnly: true, name: '', type: 'text' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 50, fontSize: 11, textAlign: 'right', flexShrink: 0 }}>{f.label}</div>
                  <input type="text" readOnly value={f.value} className="win-input" style={{ flex: 1, fontSize: 11 }} />
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 50, fontSize: 11, textAlign: 'right', flexShrink: 0 }}>From:</div>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  placeholder="your@email.com" className="win-input" style={{ flex: 1, fontSize: 11 }}
                />
              </div>
              {errors.email && <div style={{ color: 'red', fontSize: 10, marginLeft: 56 }}>{errors.email}</div>}

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 50, fontSize: 11, textAlign: 'right', flexShrink: 0 }}>Name:</div>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange}
                  placeholder="Your full name" className="win-input" style={{ flex: 1, fontSize: 11 }}
                />
              </div>
              {errors.name && <div style={{ color: 'red', fontSize: 10, marginLeft: 56 }}>{errors.name}</div>}

              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 50, fontSize: 11, textAlign: 'right', flexShrink: 0 }}>Subject:</div>
                <input
                  type="text" name="subject" value={formData.subject} onChange={handleChange}
                  placeholder="Project Inquiry" className="win-input" style={{ flex: 1, fontSize: 11 }}
                />
              </div>

              <div className="win-divider" />

              <textarea
                name="message" value={formData.message} onChange={handleChange}
                rows={6} placeholder="Type your message here..."
                className="win-input"
                style={{ resize: 'none', fontSize: 11, fontFamily: 'Tahoma, Arial, sans-serif', lineHeight: '16px' }}
              />
              {errors.message && <div style={{ color: 'red', fontSize: 10 }}>{errors.message}</div>}

              {isSuccess && (
                <div style={{ background: '#dfffdf', border: '1px solid #006600', color: '#006600', padding: '4px 8px', fontSize: 11 }}>
                  Message sent successfully! I will get back to you soon.
                </div>
              )}

              <div style={{ display: 'flex', gap: 6 }}>
                <button type="submit" className="win-btn" disabled={isSubmitting} style={{ fontSize: 11 }}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                <button type="reset" className="win-btn" style={{ fontSize: 11 }} onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}>
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="win-statusbar">
          <div className="win-statusbar-panel">Ready</div>
          <div className="win-statusbar-panel" style={{ flex: 2 }}>Let&apos;s work together!</div>
        </div>
      </Win2KWindow>
    </section>
  );
};

// Footer / Taskbar
const Win2KTaskbar = () => {
  const [startOpen, setStartOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      {/* Start menu popup */}
      {startOpen && (
        <div style={{
          position: 'fixed', bottom: 30, left: 0, zIndex: 1000,
          width: 200, background: '#d4d0c8',
          border: '2px solid #ffffff', borderRight: '2px solid #808080', borderBottom: '2px solid #808080',
          outline: '1px solid #000000'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(to bottom, #1082d0, #0831a4)',
            color: '#ffffff', padding: '8px 6px', fontWeight: 'bold', fontSize: 12,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <img src="/assets/final-brand-icon.png" alt="SR" style={{ width: 24, height: 24, border: '1px solid #ffffff' }} />
            Srikar Raparthi
          </div>
          <div style={{ padding: 4 }}>
            {[
              { icon: <Folder size={14} color="#FFD700" />, label: 'My Projects', action: () => { navigate(isHome ? '/#works' : '/#works'); setStartOpen(false); } },
              { icon: <Monitor size={14} color="#c0c0c0" />, label: 'My Skills', action: () => { navigate('/'); setStartOpen(false); setTimeout(() => document.getElementById('skills')?.scrollIntoView(), 100); } },
              { icon: <FileText size={14} color="#ffffff" />, label: 'Resume', action: () => { window.open('/assets/resume.jpg', '_blank'); setStartOpen(false); } },
              { icon: <Mail size={14} color="#c0c0ff" />, label: 'Contact Me', action: () => { navigate('/'); setStartOpen(false); setTimeout(() => document.getElementById('contact')?.scrollIntoView(), 100); } },
            ].map((item, i) => (
              <div
                key={i}
                className="win-list-item"
                style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 11 }}
                onClick={item.action}
              >
                {item.icon} {item.label}
              </div>
            ))}
            <div className="win-divider" />
            {[
              { icon: <Github size={14} />, label: 'GitHub', href: 'https://github.com/RaparthiSrikar' },
              { icon: <Linkedin size={14} color="#0a88cc" />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/srikarraparthi' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="win-list-item block"
                style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 11, color: '#000' }}
                onClick={() => setStartOpen(false)}
              >
                {item.icon} {item.label}
              </a>
            ))}
            <div className="win-divider" />
            <div className="win-list-item" style={{ padding: '4px 8px', fontSize: 11, cursor: 'pointer' }} onClick={() => setStartOpen(false)}>
              Close Menu
            </div>
          </div>
        </div>
      )}

      <div className="win-taskbar">
        <button
          className="win-start-btn"
          onClick={() => setStartOpen(!startOpen)}
          style={{ fontWeight: 'bold' }}
        >
          <img src="/assets/final-brand-icon.png" alt="Win" style={{ width: 14, height: 14 }} />
          Start
        </button>

        {/* Divider */}
        <div style={{ borderLeft: '1px solid #808080', borderRight: '1px solid #ffffff', height: 20, margin: '0 4px' }} />

        {/* Quick launch */}
        <div style={{ display: 'flex', gap: 2 }}>
          {[
            { icon: <Monitor size={12} />, label: 'Desktop' },
            { icon: <Globe size={12} />, label: 'Portfolio' },
          ].map((item, i) => (
            <button key={i} className="win-btn" style={{ padding: '2px 6px', height: 22, fontSize: 10, display: 'flex', alignItems: 'center', gap: 2 }}>
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderLeft: '1px solid #808080', borderRight: '1px solid #ffffff', height: 20, margin: '0 4px' }} />

        {/* Active windows */}
        <button className="win-btn" style={{ padding: '2px 8px', height: 22, fontSize: 10 }}>
          <Monitor size={10} style={{ display: 'inline', marginRight: 4 }} />
          Portfolio - Srikar Raparthi
        </button>

        {/* System tray */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
          <div className="win-inset" style={{ padding: '2px 4px', display: 'flex', alignItems: 'center', gap: 4 }}>
            <MessageCircle size={12} />
            <Globe size={12} />
            <Win2KClock />
          </div>
        </div>
      </div>
    </>
  );
};

// Page layouts
const HomePage = () => (
  <main>
    <Hero />
    <TrustedBy />
    <RecentProjects />
    <Experience />
    <Skills />
    <Testimonials />
    <Contact />
    {/* Footer text */}
    <div style={{ padding: '8px 16px', background: '#d4d0c8', borderTop: '2px solid #808080', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: '#808080' }}>
      <span>© {new Date().getFullYear()} Srikar Raparthi. All rights reserved.</span>
      <div style={{ display: 'flex', gap: 12 }}>
        {['Privacy Policy', 'Terms of Service'].map(l => (
          <a key={l} href="#" style={{ color: '#0831a4', fontSize: 10 }}>{l}</a>
        ))}
      </div>
    </div>
  </main>
);

// Main App
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <WhatsAppFAB />
      <div className="win-desktop">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:slug" element={<ProjectDetailPage />} />
        </Routes>
        <Win2KTaskbar />
      </div>
    </Router>
  );
}
