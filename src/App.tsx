import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Figma,
  Layout,
  Smartphone,
  Palette,
  Code,
  Award,
  CheckCircle2,
  ArrowRight,
  Download,
  ArrowLeft,
  Code2,
  Globe,
  Calendar,
  MessageSquare,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Global Data ---

const projects = [
  {
    slug: 'luxe-table',
    title: 'Luxe Table - Sri Restaurant',
    category: 'Food & Beverage',
    desc: 'A premium restaurant website for Sri Restaurant, featuring a modern UI, dynamic menu, and reservation system for authentic Indian and Arabian cuisine.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    image: '/assets/luxe-table.png',
    github: 'https://github.com/RaparthiSrikar/sri_restaurant.git',
    live: 'https://sri-restaurant.vercel.app/',
    longDesc: 'Luxe Table is a sophisticated web platform designed for Sri Restaurant to showcase their culinary excellence. The project focuses on high-end aesthetics, featuring smooth animations with Framer Motion, a responsive layout with Tailwind CSS, and a comprehensive menu system. It provides customers with an immersive digital dining experience, from exploring the authentic flavors of Hyderabad to making table reservations.',
    features: ['Dynamic Menu with 100+ items', 'Integrated Table Reservation system', 'High-performance image optimization', 'Smooth parallax and reveal animations']
  },
  {
    slug: 'vedant-high-school',
    title: 'Vedant High School',
    category: 'Education Platform',
    desc: 'Designed and developed a fully responsive school website featuring a custom Node.js backend, TypeScript integration, and advanced SEO optimization for maximum community engagement.',
    tags: ['React.js', 'TypeScript', 'Node.js', 'SEO'],
    image: '/assets/vedant-school.png',
    github: 'https://github.com/RaparthiSrikar/vedant-high-school.git',
    live: 'https://www.vedanthighschoolnalgonda.org/',
    longDesc: 'Vedant High School project was a complete digital transformation for a regional educational institution. The goal was to provide a modern, accessible, and information-rich platform for students and parents alike. I implemented a robust backend using Node.js to handle dynamic content management, ensuring that school administrators can easily update announcements and events. The frontend, built with React and TypeScript, ensures high performance and maintainability.',
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
    longDesc: 'Transitioned a complex ticket booking logic from a desktop-bound Python app to a modern web application. I maintained the original data integrity and logic while drastically improving accessibility and visual hierarchy using modern CSS techniques like glassmorphism and animated transitions.',
    features: ['Local storage persistence for offline use', 'Modern glassmorphism UI design', 'Secure client-side data validation', 'Real-time input masking for ticket IDs']
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
    longDesc: 'Heema Services represents a collection of freelance web solutions tailored for local business automation and marketing. I built these using a unified technology stack that prioritizes load speeds and conversion rates, while providing business owners with a simple, integrated administrative dashboard.',
    features: ['API-first architecture', 'Real-time client lead synchronization', 'Lightweight, ultra-fast frontend performance', 'Domain-specific SEO strategies']
  },
  {
    slug: 'srujana-dental',
    title: 'Srujana Dental Hospital',
    category: 'Healthcare Platform',
    desc: 'Developed a professional, high-conversion website for Srujana Dental Hospital, featuring specialized treatment modules, interactive patient education, and regional SEO optimization.',
    tags: ['React', 'Modern UI', 'Healthcare'],
    image: '/assets/srujana-dental.png',
    github: 'https://github.com/RaparthiSrikar',
    live: 'https://srujana-dental-nalgonda.vercel.app/',
    longDesc: 'Srujana Dental Hospital was a comprehensive branding and web development project. I created a clean, trustworthy digital presence that highlights the clinic\'s expertise in cosmetic dentistry and specialized oral care. The site is optimized for emergency patient inquiries and features a mobile-first appointment booking flow.',
    features: ['Custom healthcare service modules', 'Automated emergency inquiry system', 'Localized SEO for Nalgonda region', 'High-performance image optimization for medical visuals']
  },
  {
    slug: 'sravanthi-high-school',
    title: 'Sravanthi High School',
    category: 'Education Platform',
    desc: 'An information-rich educational portal for Sravanthi High School, featuring dynamic academic calendars, performance tracking modules, and interactive student resources.',
    tags: ['React', 'Node.js', 'Education'],
    image: '/assets/sravanthi-school.png',
    github: 'https://github.com/RaparthiSrikar',
    live: 'https://www.sravanthihighschoolnalgonda.org/',
    longDesc: 'Sravanthi High School portal was designed to bridge the communication gap between faculty and parents. I implemented a secure administrative dashboard for teachers to upload grades and attendance, while creating a user-friendly frontend for students to access digital learning materials.',
    features: ['Academic calendar synchronization', 'Digital resource repository', 'Secure teacher-parent communications', 'Optimized for low-bandwidth environments']
  }
];

const testimonials = [
  {
    name: 'Robert Fox',
    role: 'CEO at TechFlow',
    text: 'Srikar is a professional and highly skilled designer. He really understands the user needs and delivers exceptional results.',
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const WhatsAppFAB = () => {
  return (
    <motion.a
      href="https://wa.me/917330668526"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all group"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20"></div>
      <MessageCircle size={28} />
      <div className="absolute right-full mr-4 bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with me!
      </div>
    </motion.a>
  );
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Works', href: isHome ? '#works' : '/#works' },
    { name: 'Skills', href: isHome ? '#skills' : '/#skills' },
    { name: 'Testimonials', href: isHome ? '#testimonials' : '/#testimonials' },
    { name: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-dark/90 backdrop-blur-lg py-3 shadow-xl' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-5 sm:px-8 flex justify-between items-center">
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group"
        >
          <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden border border-white/5">
            <img
              src="/assets/final-brand-icon.png"
              alt="Srikar Logo"
              className="w-full h-full object-contain mix-blend-screen rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.href.startsWith('#') ? (
              <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-brand transition-colors">
                {link.name}
              </a>
            ) : (
              <Link key={link.name} to={link.href} className="text-sm font-medium text-gray-300 hover:text-brand transition-colors">
                {link.name}
              </Link>
            )
          ))}
          <Link 
            to="/resume"
            className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105"
          >
            Resume
          </Link>
          <a href="#contact" className="bg-brand hover:bg-brand/90 text-white px-6 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105">
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card-dark border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                link.href.startsWith('#') ? (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-gray-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-lg font-medium text-gray-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <a href="#contact" className="bg-brand text-white px-6 py-3 rounded-xl font-bold mt-2 text-center" onClick={() => setIsMobileMenuOpen(false)}>
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const TrustedBy = () => {
  const companies = [
    'Vedhant School', 'Sravanthi School', 'Heema Services', 'Srujana Dental', 'Sri Restaurant'
  ];

  return (
    <section className="py-16 sm:py-24 border-y border-white/5 bg-white/[0.01] overflow-hidden">
      <div className="container mx-auto px-6 sm:px-12 mb-12 text-center">
        <p className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.4em] text-gray-500">-- Trusted brands --</p>
      </div>
      <div className="flex relative">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 sm:gap-32 items-center whitespace-nowrap pr-16 sm:pr-32"
        >
          {[...companies, ...companies, ...companies].map((name, i) => (
            <span
              key={i}
              className="text-2xl sm:text-4xl font-display font-bold tracking-tighter text-white/20 hover:text-brand transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </motion.div>
        {/* Gradient overlays for smooth fade */}
        <div className="absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-bg-dark to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-bg-dark to-transparent z-10"></div>
      </div>
    </section>
  );
};

const Hero = () => {
  const introWords = ["Hi,", "I", "am"];
  const name = "Srikar Raparthi";
  const roles = ["Web Developer", "Python Developer"];
  const [roleIndex, setRoleIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden relative">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-[120px] -z-10"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] -z-10"
      />

      <div className="container mx-auto px-6 sm:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 space-y-6 sm:space-y-10 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-[10px] sm:text-xs font-bold uppercase tracking-widest"
            >
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse"></span>
              Available for Freelance
            </motion.div>

            <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight min-h-[2.4em]">
              <div className="overflow-hidden inline-block text-white">
                {introWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block mr-[0.2em]"
                  >
                    {word}
                  </motion.span>
                ))}
                <span className="text-brand inline-block mr-3">
                  {name.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.05, delay: 0.5 + i * 0.03 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </div>
              <div className="overflow-hidden inline-block align-bottom min-h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roleIndex}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    {roles[roleIndex].split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.1, 
                          delay: i * 0.04,
                          ease: "easeOut"
                        }}
                        className="inline-block text-white/90 whitespace-pre"
                      >
                        {char}
                      </motion.span>
                    ))}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-1 h-[1em] bg-brand ml-1 self-center"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto lg:mx-0 leading-relaxed font-light"
            >
              I am an independent freelance developer specialized in designing and building
              high-impact digital solutions. With multiple successful client deliveries,
              I focus on creating high-performance applications that drive real-world results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 sm:gap-8"
            >
              <a href="#contact" className="w-full sm:w-auto bg-brand hover:bg-brand/90 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand/30 hover:-translate-y-1">
                Hire Me <ChevronRight size={20} />
              </a>
              <Link 
                to="/resume"
                className="w-full sm:w-auto border border-white/10 hover:bg-white/5 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-1"
              >
                Resume <Download size={20} />
              </Link>
              <div className="flex items-center gap-4 sm:gap-5">
                <a href="https://github.com/RaparthiSrikar" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand hover:bg-brand/5 transition-all">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/srikarraparthi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand hover:bg-brand/5 transition-all">
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -15, 0]
            }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 1 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="flex-1 relative w-full max-w-[280px] sm:max-w-md mx-auto lg:mx-0"
          >
            <div className="relative z-10 w-full aspect-[4/5] rounded-[2rem] p-3 overflow-hidden border-2 border-white/5 shadow-2xl bg-white/[0.02]">
              <img
                src="/assets/hero-image.png"
                alt="Srikar Raparthi"
                className="w-full h-full object-cover object-top rounded-2xl sm:rounded-[1.5rem]"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const RecentProjects = () => {
  const navigate = useNavigate();

  return (
    <section id="works" className="py-20 sm:py-32">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-8 sm:mb-16 gap-6">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-display font-bold mb-3 text-white">Recent Projects</h2>
            <p className="text-gray-400 text-xs sm:text-sm font-light">Explore my latest work and case studies.</p>
          </div>
          <button
            onClick={() => navigate('/projects')}
            className="text-brand font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm hover:underline flex items-center gap-2"
          >
            View All Projects <ArrowRight size={16} />
          </button>
        </div>

        <div className="space-y-16 sm:space-y-32">
          {/* Featured Project */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
          >
            <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1 pt-8 sm:pt-12">
              <span className="text-brand font-bold uppercase tracking-[0.3em] text-[9px] sm:text-xs">Featured Project</span>
              <h3 className="text-2xl sm:text-4xl font-display font-bold text-white">{projects[0].title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-lg font-light">{projects[0].desc}</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                {projects[0].tags.map(tag => (
                  <span key={tag} className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-xs font-medium text-gray-300">{tag}</span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
                <button
                  onClick={() => navigate(`/project/${projects[0].slug}`)}
                  className="bg-brand text-white px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-brand/20 hover:-translate-y-1 transition-all text-center"
                >
                  View Details
                </button>
              </div>
            </div>
            <div className="flex-1 w-full order-1 lg:order-2">
              <div className="glass-card p-3 sm:p-4 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden group border-white/5">
                <img
                  src={projects[0].image}
                  alt={projects[0].title}
                  className="w-full rounded-xl sm:rounded-[1.5rem] transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* Grid Projects */}
          <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
            {projects.slice(1, 3).map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card p-2 sm:p-3 rounded-xl sm:rounded-2xl group border-white/5 hover:border-brand/30 transition-colors"
              >
                <div className="overflow-hidden rounded-xl sm:rounded-[1.25rem] mb-4 sm:mb-6 relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 text-white">
                    <div className="w-10 h-10 rounded-full bg-bg-dark/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ExternalLink size={18} />
                    </div>
                  </div>
                </div>
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <span className="text-brand font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">{project.category}</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold mt-2 sm:mt-3 mb-3 sm:mb-4 text-white">{project.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 line-clamp-2 font-light">{project.desc}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] sm:text-xs text-gray-500 font-medium whitespace-nowrap">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/project/${project.slug}`)}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all shadow-inner"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ResumePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6 sm:px-12">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-brand font-bold mb-8 hover:gap-3 transition-all print:hidden"
        >
          <ArrowLeft size={20} /> Back to Portfolio
        </button>

        <div className="bg-white text-black p-8 sm:p-12 rounded-2xl shadow-2xl space-y-10">
          {/* Header */}
          <div className="text-center space-y-4 border-b pb-8">
            <h1 className="text-4xl font-display font-bold uppercase tracking-tight">Srikar Raparthi</h1>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <span className="flex items-center gap-2"><MapPin size={14} /> Nalgonda, Telangana</span>
              <span className="flex items-center gap-2"><Phone size={14} /> +91 73306 68526</span>
              <span className="flex items-center gap-2"><Mail size={14} /> srikar.raparthi1026@gmail.com</span>
            </div>
            <div className="flex justify-center gap-6 text-sm font-bold text-brand">
              <a href="https://github.com/RaparthiSrikar" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
              <a href="https://srikar-raparthi-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Portfolio</a>
              <a href="https://www.linkedin.com/in/srikarraparthi" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold border-b-2 border-brand inline-block pr-4">SUMMARY</h2>
            <p className="text-gray-700 leading-relaxed">
              Full Stack Developer skilled in React.js, Node.js, TypeScript & Python. Delivered 6 live production websites for real clients with SEO, REST APIs & AI features. Focused on building high-performance, user-centric digital solutions.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold border-b-2 border-brand inline-block pr-4 uppercase">Technical Skills</h2>
            <div className="space-y-2 text-sm">
              <p><span className="font-bold">Frontend:</span> HTML5, CSS3, JavaScript (ES6+), React.js, TypeScript, Responsive Design, Tailwind CSS, Framer Motion.</p>
              <p><span className="font-bold">Backend:</span> Node.js, Express.js, REST APIs, Python, Django.</p>
              <p><span className="font-bold">Database:</span> SQL, Firebase, SQLite.</p>
              <p><span className="font-bold">Tools:</span> Git, GitHub, Vercel, Agile, SEO, Digital Marketing, Figma.</p>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold border-b-2 border-brand inline-block pr-4">PROJECTS</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">Sri Restaurant (Luxe Table)</h3>
                <div className="text-xs space-x-2 text-brand">
                  <a href="https://sri-restaurant.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Live</a>
                  <span>|</span>
                  <a href="https://github.com/RaparthiSrikar/sri_restaurant.git" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                </div>
              </div>
              <ul className="list-disc list-outside ml-5 text-sm text-gray-700 space-y-2">
                <li>Built a premium restaurant website with React.js & TypeScript; integrated a dynamic menu system for authentic Indian and Arabian cuisine.</li>
                <li>Implemented smooth animations using Framer Motion and a high-end UI with Tailwind CSS.</li>
                <li>Engineered a custom table reservation system and optimized assets for fast load times.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">Sravanthi High School Website</h3>
                <div className="text-xs space-x-2 text-brand">
                  <a href="https://www.sravanthihighschoolnalgonda.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Live</a>
                  <span>|</span>
                  <a href="https://github.com/RaparthiSrikar" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                </div>
              </div>
              <ul className="list-disc list-outside ml-5 text-sm text-gray-700 space-y-2">
                <li>Built fully responsive school website with React.js + TypeScript; integrated Node.js backend & REST APIs for dynamic content management.</li>
                <li>Implemented SEO best practices & AI-based enhancements — improved search rankings, organic traffic, and user engagement.</li>
                <li>Deployed on Vercel with CI/CD via GitHub for zero-downtime continuous deployments.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">Heema Services Web App</h3>
                <div className="text-xs space-x-2 text-brand">
                  <a href="https://www.heemaservicesnalgonda.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Live</a>
                  <span>|</span>
                  <a href="https://github.com/RaparthiSrikar/Heema-services-nlg.git" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                </div>
              </div>
              <ul className="list-disc list-outside ml-5 text-sm text-gray-700 space-y-2">
                <li>Developed high-performance full-stack web app for real client in services domain; scalable architecture with efficient API integrations.</li>
                <li>Applied SEO strategies & AI-driven features — boosted search visibility, accessibility scores, and user engagement metrics.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">Railway Ticket Booking System</h3>
                <div className="text-xs space-x-2 text-brand">
                  <a href="https://railway-ticket-booking-dhkn.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:underline">Live</a>
                  <span>|</span>
                  <a href="https://github.com/RaparthiSrikar/Railway-Ticket-Booking.git" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                </div>
              </div>
              <ul className="list-disc list-outside ml-5 text-sm text-gray-700 space-y-2">
                <li>Migrated legacy Python (Tkinter/MySQL) desktop app to modern React (Vite/TypeScript) SPA — 100% feature parity with improved accessibility.</li>
                <li>Designed glassmorphism UI with Vanilla CSS; engineered browser storage persistence layer for serverless Vercel deployment.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold border-b-2 border-brand inline-block pr-4">EDUCATION</h2>
            <div className="flex justify-between text-sm">
              <div>
                <p className="font-bold">B.Tech – Electronics & Communication Engineering</p>
                <p className="text-gray-600">Presidency University, Bengaluru</p>
              </div>
              <div className="text-right">
                <p className="font-bold">2019–2023</p>
                <p className="text-gray-600">CGPA: 6.67</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold border-b-2 border-brand inline-block pr-4">CERTIFICATIONS</h2>
            <ul className="list-disc list-outside ml-5 text-sm text-gray-700">
              <li>HTML, CSS & JavaScript — NxtWave</li>
              <li>Python Programming — NxtWave</li>
              <li>Git & Command Line — NxtWave</li>
              <li>Introduction to Cloud Computing— IBM</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center print:hidden">
          <button 
            onClick={() => window.print()}
            className="bg-brand text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            <Download size={20} /> Download PDF (Print)
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-20 px-6 sm:px-12">
      <div className="container mx-auto px-5 sm:px-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-brand font-bold mb-12 hover:gap-3 transition-all"
        >
          <ArrowLeft size={20} /> Back to Home
        </button>

        <div className="mb-16">
          <h1 className="text-4xl sm:text-6xl font-display font-bold mb-6">All Projects</h1>
          <p className="text-gray-400 max-w-2xl font-light">A comprehensive collection of my professional work, research apps, and freelance projects. Each one represents a unique challenge and a specialized solution.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-2 sm:p-3 rounded-xl sm:rounded-2xl group border-white/5 hover:border-brand/30 transition-colors"
            >
              <div className="overflow-hidden rounded-xl sm:rounded-[1.25rem] mb-4 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-4 pb-4">
                <span className="text-brand font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">{project.category}</span>
                <h3 className="text-xl font-display font-bold mt-2 mb-2 text-white">{project.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/project/${project.slug}`)}
                    className="text-brand text-xs font-bold flex items-center gap-1 group/btn"
                  >
                    View Details <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.slug === slug);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white pt-24 sm:pt-32 pb-16 px-6 sm:px-12"
    >
      <div className="container mx-auto max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-brand font-bold mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <span className="text-brand font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                {project.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-display font-bold leading-tight text-white">{project.title}</h1>
              <p className="text-gray-400 text-sm sm:text-lg leading-relaxed font-light">
                {project.longDesc}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map(feature => (
                  <li key={feature} className="flex items-center gap-3 text-gray-400 text-sm">
                    <div className="w-2 h-2 rounded-full bg-brand"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="bg-brand text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-brand/20 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-2">
                Launch Live Site <ExternalLink size={18} />
              </a>
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="border border-white/10 text-white px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all text-center flex items-center justify-center gap-2">
                GitHub Repository <Github size={18} />
              </a>
            </div>
          </div>

          <div className="flex-1 w-full space-y-6">
            <div className="glass-card p-3 sm:p-4 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto rounded-xl sm:rounded-[1.5rem] shadow-2xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <Code2 size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Tech Stack</p>
                  <p className="text-xs font-bold">{project.tags.join(', ')}</p>
                </div>
              </div>
              <div className="glass-card p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Status</p>
                  <p className="text-xs font-bold">Successfully Live</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const education = [
    {
      company: 'Presidency University, Bengaluru',
      role: 'B Tech - ECE (6.67 CGPA)',
      date: '2019 - 2023',
      desc: 'Electronics & Communication Engineering'
    },
    {
      company: 'Sri Chaitanya Junior College, Hyderabad',
      role: 'Intermediate - MPC (8.1 CGPA)',
      date: '2017 - 2019',
      desc: 'Focused on Mathematics, Physics, and Chemistry.'
    },
    {
      company: 'Sri Prakash Residential School, Telangana',
      role: 'CBSC (6.2 CGPA)',
      date: '2016 - 2017',
      desc: 'Secondary School Of Certificate'
    }
  ];

  const work = [
    {
      company: 'Self-Employed',
      role: 'Freelance Full-Stack Developer',
      date: '2023 - Present',
      desc: 'Building and deploying end-to-end digital solutions for diverse clients using the MERN stack and Python.'
    }
  ];

  return (
    <section id="works" className="py-12 sm:py-16 bg-white/[0.02]">
      <div className="container mx-auto px-5 sm:px-8">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-display font-bold mb-4 text-white">Education & Work Experience</h2>
          <div className="w-16 h-1 bg-brand mx-auto rounded-full shadow-lg shadow-brand/20"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 text-white">
          {/* Education */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-3xl font-bold flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                <Award size={20} />
              </div>
              Education
            </h3>
            <div className="space-y-4 sm:space-y-6 relative before:absolute before:left-5 sm:before:left-6 before:top-0 before:bottom-0 before:w-px before:bg-white/10">
              {education.map((item, i) => (
                <div key={i} className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-[1.5rem] relative border-white/5 ml-10 sm:ml-12 hover:border-brand/30 transition-colors">
                  <div className="absolute -left-[2.75rem] sm:-left-[3.25rem] top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-brand shadow-[0_0_15px_rgba(124,58,237,0.5)]"></div>
                  <div className="text-brand font-bold text-[9px] sm:text-xs mb-1.5 sm:mb-2 uppercase tracking-widest">{item.date}</div>
                  <h4 className="text-base sm:text-xl font-bold mb-1">{item.role}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm font-light">{item.company}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Work */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-lg sm:text-2xl font-bold flex items-center gap-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
                <CheckCircle2 size={18} />
              </div>
              Experience
            </h3>
            <div className="space-y-4 sm:space-y-6 relative before:absolute before:left-5 sm:before:left-6 before:top-0 before:bottom-0 before:w-px before:bg-white/10">
              {work.map((item, i) => (
                <div key={i} className="glass-card p-4 sm:p-6 rounded-2xl sm:rounded-[1.5rem] relative border-white/5 ml-10 sm:ml-12 hover:border-brand/30 transition-colors">
                  <div className="absolute -left-[2.75rem] sm:-left-[3.25rem] top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-brand shadow-[0_0_15px_rgba(124,58,237,0.5)]"></div>
                  <div className="text-brand font-bold text-[9px] sm:text-xs mb-1.5 sm:mb-2 uppercase tracking-widest">{item.date}</div>
                  <h4 className="text-base sm:text-xl font-bold mb-1">{item.role}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm font-light">{item.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: 'React.js', level: 92, icon: 'R', image: '/assets/skill-react.png' },
    { name: 'JavaScript', level: 90, icon: 'JS', image: '/assets/skill-js.png' },
    { name: 'Python', level: 85, icon: 'Py', image: '/assets/skill-python.png' },
    { name: 'Node.js', level: 88, icon: 'N', image: '/assets/skill-node.png' },
    { name: 'SQLite', level: 82, icon: 'SQL', image: '/assets/skill-sqlite.png' },
    { name: 'Git', level: 90, icon: 'G', image: '/assets/skill-git.png' },
  ];

  return (
    <section id="skills" className="py-12 sm:py-16">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="text-center mb-6 sm:mb-10 text-white">
          <h2 className="text-xl sm:text-3xl font-display font-bold mb-4">My Skills</h2>
          <p className="text-gray-400 text-xs sm:text-sm font-light">Tools and technologies I use to bring ideas to life.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
                borderColor: 'var(--color-brand)',
                backgroundColor: 'rgba(124, 58, 237, 0.05)'
              }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.05,
                scale: { type: "spring", stiffness: 400, damping: 17 },
                borderColor: { duration: 0.3 },
                backgroundColor: { duration: 0.3 }
              }}
              className="glass-card p-4 sm:p-6 rounded-xl sm:rounded-2xl group border-white/5 cursor-default"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto bg-white/5 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-2xl font-bold mb-4 sm:mb-6 group-hover:bg-brand group-hover:text-white transition-all shadow-inner text-white overflow-hidden relative">
                {skill.image && (
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-contain p-1 sm:p-2 filter grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500 z-10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).classList.add('hidden');
                      const next = (e.target as HTMLImageElement).nextElementSibling;
                      if (next) next.classList.remove('hidden');
                    }}
                  />
                )}
                <span className={skill.image ? 'hidden opacity-40' : ''}>{skill.icon}</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">{skill.name}</span>
                  <span className="text-brand font-display font-bold text-xs sm:text-sm">{skill.level}%</span>
                </div>

                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className="h-full bg-brand rounded-full shadow-[0_0_10px_rgba(124,58,237,0.3)]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-12 sm:py-16">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-display font-bold mb-3 text-white">Clients Testimonials</h2>
          <div className="w-16 h-1 bg-brand mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 sm:p-10 rounded-2xl sm:rounded-3xl relative"
            >
              <div className="text-brand mb-4 sm:mb-6">
                <CheckCircle2 size={32} className="opacity-20" />
              </div>
              <p className="text-gray-300 italic leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">"{t.text}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brand" referrerPolicy="no-referrer" />
                <div className="text-white">
                  <h4 className="font-bold text-sm sm:text-base">{t.name}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // NOTE: Get your free Access Key from https://web3forms.com/
      // Paste your key below to start receiving real emails to srikar.raparthi1026@gmail.com
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Something went wrong. Please check your Access Key or try again.");
      }
    } catch (err) {
      alert("Submission failed. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 px-6 sm:px-12 text-white">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="glass-card p-6 sm:p-10 rounded-[1.5rem] overflow-hidden relative border-white/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/10 blur-[100px] rounded-full -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full -z-10"></div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="flex-1 space-y-8 sm:space-y-12 text-center lg:text-left">
              <div className="space-y-4">
                <h2 className="text-xl sm:text-3xl font-display font-bold leading-tight">Let's work <br className="hidden sm:block" /> together!</h2>
                <p className="text-gray-400 max-w-md mx-auto lg:mx-0 text-xs sm:text-sm font-light">
                  I'm currently available for freelance work. If you have a project
                  that you want to get started, or just want to say hello, get in touch.
                </p>
              </div>

              <div className="space-y-5 sm:space-y-8 text-left max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center gap-4 sm:gap-6 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all shadow-inner">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-0.5 sm:mb-1">Email Me</p>
                    <p className="text-sm sm:text-base font-bold break-all">srikar.raparthi1026@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all shadow-inner">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-0.5 sm:mb-1">Call / WhatsApp Me</p>
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base font-bold">+91 73306 68526</p>
                      <a href="https://wa.me/917330668526" target="_blank" rel="noopener noreferrer" className="text-brand text-[10px] font-bold hover:underline flex items-center gap-1.5"><MessageCircle size={12} /> Direct WhatsApp</a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all shadow-inner">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] mb-0.5 sm:mb-1">Location</p>
                    <p className="text-sm sm:text-base font-bold">Nalgonda, Telangana, India</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-start gap-4 sm:gap-5 pt-2 sm:pt-4">
                <a href="https://github.com/RaparthiSrikar" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-brand hover:border-brand hover:bg-brand/5 transition-all">
                  <Github size={18} />
                </a>
                <a href="https://www.linkedin.com/in/srikarraparthi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand transition-colors"><Linkedin size={18} /></a>
              </div>
            </div>

            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 bg-white/2 p-6 sm:p-10 rounded-[2rem] border border-white/5">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-brand transition-all text-sm placeholder:text-gray-600 text-white`}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] ml-2">{errors.name}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-brand transition-all text-sm placeholder:text-gray-600 text-white`}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] ml-2">{errors.email}</p>}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand transition-all text-sm placeholder:text-gray-600 text-white"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project..."
                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:border-brand transition-all resize-none text-sm placeholder:text-gray-600 text-white`}
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-[10px] ml-2">{errors.message}</p>}
                </div>

                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-500/10 border border-green-500/20 text-green-500 px-6 py-4 rounded-2xl text-sm text-center"
                    >
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-8 sm:py-10 border-t border-white/5 bg-bg-dark text-white">
      <div className="container mx-auto px-6 sm:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group"
          >
            <div className="w-14 h-14 sm:w-24 sm:h-24 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden">
              <img
                src="/assets/final-brand-icon.png"
                alt="Srikar Logo"
                className="w-full h-full object-contain mix-blend-screen"
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <a key={link} href="#" className="text-xs sm:text-sm text-gray-500 hover:text-brand transition-colors font-medium">{link}</a>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-gray-600 text-center font-light">
            © {new Date().getFullYear()} Srikar Raparthi. <br className="sm:hidden" /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- Page Layouts ---

const HomePage = () => {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <RecentProjects />
      <Experience />
      <Skills />
      <Testimonials />
      <Contact />
    </main>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <WhatsAppFAB />
      <div className="min-h-screen bg-black text-white selection:bg-brand selection:text-white overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:slug" element={<ProjectDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
