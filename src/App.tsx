/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Check,
  Sparkles,
  BookOpen,
  Briefcase,
  Code,
  Layers,
  ArrowUp,
  Cpu,
  GraduationCap,
  Copy,
  Terminal,
  Box,
  FileText,
  Download,
  Award,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import ThreePortfolio from './ThreePortfolio';

// Interactive CSS 3D Tilt Card Component (inspired by the sample portfolio)
function TiltCard({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6.5;
    const rotateY = ((x - centerX) / centerX) * 6.5;
    setTransform(
      `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    );
  };

  const handleMouseLeave = () => {
    setTransform('perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
      }}
      className={className}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [emailInput, setEmailInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [resumeViewTab, setResumeViewTab] = useState<'summary' | 'pdf'>('summary');

  // Monitor scroll for nav styling and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', '3d-portfolio', 'about', 'projects', 'skills', 'certifications', 'experience', 'contact'];
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll only when mobile drawer or modals are open
  useEffect(() => {
    if (mobileMenuOpen || resumeModalOpen || pdfModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen, resumeModalOpen, pdfModalOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      showToast(`Thank you! Reach out directly at anuvidmishra200417@gmail.com`);
      window.location.href = `mailto:anuvidmishra200417@gmail.com?subject=Connecting%20via%20Nexum%20Portfolio&body=Hi%20Anuvid,%0A%0AMy%20email%20is%20${encodeURIComponent(emailInput.trim())}.%20Let's%20connect!`;
      setEmailInput('');
    } else {
      window.location.href = `mailto:anuvidmishra200417@gmail.com?subject=Let's%20Connect&body=Hi%20Anuvid,`;
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('anuvidmishra200417@gmail.com');
    setCopied(true);
    showToast('Copied anuvidmishra200417@gmail.com to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const copy3DPortfolioLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#3d-portfolio`;
    navigator.clipboard.writeText(url);
    showToast('Copied 3D Portfolio Link for placement drives!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: '3d-portfolio', label: '3D Model', badge: 'Interactive' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects', hasChevron: true },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications', badge: '5' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="relative min-h-screen w-full bg-black select-none overflow-x-hidden font-sans">
      {/* Background Video (Fixed across all sections for continuous cinematic feel) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 h-full w-full object-cover -z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
      />

      {/* Persistent Sticky / Fixed Glass Top Bar Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
            ? 'bg-black/50 backdrop-blur-xl border-b border-white/10 py-3.5 px-5 sm:px-8 lg:px-12 shadow-xl'
            : 'bg-transparent py-5 sm:py-6 px-5 sm:px-8 lg:px-12'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo icon + name: #F5F0E6 */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 cursor-pointer group transition-opacity hover:opacity-85 text-left"
          >
            {/* Nexum Geometric Logo SVG in #F5F0E6 */}
            <svg
              className="w-6 h-6 text-[#F5F0E6] fill-[#F5F0E6] drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 256 256"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z" />
            </svg>
            <span className="text-lg font-bold tracking-tight text-[#F5F0E6] drop-shadow-sm">
              Anuvid Mishra.
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Light nav pill container with #171717 navigation links & White on Black active */}
            <nav className="flex items-center gap-1 rounded-full px-1.5 py-1.5 backdrop-blur-xl bg-white/80 border border-white/60 shadow-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${isActive
                        ? 'bg-[#171717] text-[#FFFFFF] font-bold shadow-sm'
                        : 'text-[#171717] hover:bg-black/10'
                      }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase bg-amber-200 text-[#171717]">
                        3D
                      </span>
                    )}
                    {item.hasChevron && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 ${isActive ? 'text-[#FFFFFF]' : 'text-[#171717]'}`}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Resume Button */}
            <button
              onClick={() => setResumeModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold bg-white/80 hover:bg-white text-[#171717] border border-white/60 transition-all cursor-pointer shadow-sm"
              title="View Technical Resume"
            >
              <FileText className="w-3.5 h-3.5 text-[#171717]" />
              <span>Resume</span>
            </button>

            {/* Separate Primary CTA Pill with CTA text: #FFFFFF */}
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center justify-center rounded-full px-4.5 py-2 text-xs sm:text-sm font-semibold bg-[#171717] text-[#FFFFFF] hover:bg-black transition-all cursor-pointer border border-white/20 shadow-md"
            >
              Let's Connect
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => scrollToSection('3d-portfolio')}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#171717] text-[#F5F0E6] border border-amber-400/40 shadow-sm"
            >
              <Box className="w-3.5 h-3.5 text-amber-300" />
              <span>3D</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="relative h-10 w-10 rounded-full backdrop-blur-xl bg-white/80 border border-white/60 flex items-center justify-center z-50 cursor-pointer overflow-hidden text-[#171717] shadow-sm"
            >
              <Menu
                className={`w-5 h-5 absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
                  }`}
              />
              <X
                className={`w-5 h-5 absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Glass Overlay + Slide-in Drawer */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      />

      <aside
        className={`fixed right-0 top-0 z-40 h-full w-72 bg-white/95 backdrop-blur-2xl border-l border-white/60 flex flex-col md:hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="px-6 pt-24 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                transitionDelay: mobileMenuOpen ? `${(index + 1) * 40}ms` : '0ms',
              }}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${activeSection === item.id
                  ? 'bg-[#171717] text-[#FFFFFF] font-bold shadow-sm'
                  : 'text-[#171717] hover:bg-black/10'
                } ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'}`}
            >
              <span className="flex items-center gap-2">
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-amber-300 text-black">
                    3D Model
                  </span>
                )}
              </span>
              {item.hasChevron && (
                <ChevronDown className={`w-4 h-4 ${activeSection === item.id ? 'text-[#FFFFFF]' : 'text-[#171717]'}`} />
              )}
            </button>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setResumeModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider bg-white border border-black/20 text-[#171717] shadow-sm mt-1"
          >
            <FileText className="w-4 h-4 text-[#171717]" />
            <span>View Technical Resume</span>
          </button>
        </div>

        <div className="mt-auto px-6 pb-10">
          <button
            onClick={() => scrollToSection('contact')}
            className={`w-full rounded-full py-3.5 text-sm font-semibold bg-[#171717] text-[#FFFFFF] hover:bg-black transition-all duration-400 shadow-lg ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            Let's Connect
          </button>
        </div>
      </aside>

      {/* Main Sections Container */}
      <main className="relative z-10 flex flex-col w-full">
        {/* ========================================================= */}
        {/* SECTION 1: HERO LANDING */}
        {/* ========================================================= */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-between pt-28 pb-14 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full"
        >
          <div className="hidden lg:block h-4" />

          {/* Bottom-Anchored Hero Content */}
          <div className="flex flex-col gap-6 w-full mt-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 w-full">
              {/* Left Column: Aspire Badge + Main Headline (#F5F0E6) + Supporting Description (#E5D8C5) + Email CTA */}
              <div className="max-w-xl">
                {/* Badges Container */}
                <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-white/80 backdrop-blur-md border border-white/60 text-[#6B5D4B] shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-[#6B5D4B]" />
                    <span>Aspire to be AI/ML Developer</span>
                  </div>

                  <button
                    onClick={() => scrollToSection('3d-portfolio')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-black/85 text-[#F5F0E6] hover:bg-black border border-amber-400/40 shadow-sm cursor-pointer transition-all hover:scale-105"
                  >
                    <Box className="w-3.5 h-3.5 text-amber-300" />
                    <span>Scroll to 3D Model ↓</span>
                  </button>
                </div>

                {/* Main Headline: #F5F0E6 */}
                <h1 className="text-3xl sm:text-4xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-[#F5F0E6] drop-shadow-md">
                  Building Intelligent AI Systems That Solve Real-World Problems.
                </h1>

                {/* Supporting Description: #E5D8C5 */}
                <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg font-normal leading-relaxed text-[#E5D8C5] drop-shadow-sm">
                  AI/ML Developer specializing in Generative AI, NLP, LLMs, and Reinforcement Learning. Explore verified models, benchmarks, and interactive 3D spatial architecture below.
                </p>

                {/* Email CTA & Direct Resume Download (cylindrical on mobile and desktop) */}
                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <form
                    onSubmit={handleConnect}
                    className="flex items-center rounded-full p-1.5 shadow-lg bg-white/85 backdrop-blur-xl border border-white/60 w-full sm:w-auto max-w-md"
                  >
                    {/* Email Placeholder: #777777 */}
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 min-w-0 bg-transparent px-3.5 sm:px-5 py-2 sm:py-2 text-xs sm:text-sm text-[#171717] placeholder-[#777777] font-medium outline-none sm:w-56"
                    />
                    {/* CTA text: #FFFFFF on dark cylindrical pill */}
                    <button
                      type="submit"
                      className="shrink-0 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold bg-[#171717] text-[#FFFFFF] hover:bg-black transition-all cursor-pointer shadow-sm whitespace-nowrap"
                    >
                      Let's Connect
                    </button>
                  </form>

                  {/* Direct Resume Download Button */}
                  <a
                    href="/assets/aistudio/Updated_Technical_Resume_13c27fb4.pdf"
                    download="Anuvid_Mishra_Technical_Resume.pdf"
                    className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white/85 hover:bg-white text-[#171717] border border-white/60 shadow-lg backdrop-blur-xl transition-all cursor-pointer hover:scale-105 whitespace-nowrap"
                    title="Download Official Updated Technical Resume"
                  >
                    <Download className="w-3.5 h-3.5 text-[#171717]" />
                    <span>Download Resume (PDF)</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Two Glass Cards with 3D Parallax Tilt */}
              <div className="flex flex-col gap-4 sm:flex-row lg:w-auto lg:gap-5 w-full sm:w-auto">
                {/* Card 1 – Technical Expertise (Skills card text: #24211C, Small labels: #6B5D4B) */}
                <TiltCard
                  onClick={() => scrollToSection('skills')}
                  className="rounded-2xl bg-white/45 backdrop-blur-xl p-5 sm:p-6 sm:w-64 flex flex-col justify-between border border-white/60 shadow-xl cursor-pointer hover:bg-white/55 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-[#171717] text-[#FFFFFF] shadow-sm">
                        AI / ML
                      </span>
                      <span className="text-xs text-[#24211C] font-bold hover:underline transition-colors flex items-center gap-1">
                        View Matrix ↓
                      </span>
                    </div>

                    <div className="mt-4">
                      {/* Small labels: #6B5D4B */}
                      <div className="text-xs uppercase tracking-wider font-bold text-[#6B5D4B]">
                        Areas of Focus
                      </div>
                    </div>

                    {/* Skills card text: #24211C */}
                    <p className="text-xs sm:text-sm leading-relaxed mt-2.5 text-[#24211C] font-medium">
                      NLP · Generative AI · Transformers · LLMs · Reinforcement Learning · RAG
                    </p>
                  </div>

                  {/* Small labels / tech stack: #6B5D4B */}
                  <div className="pt-3 border-t border-black/15 mt-4 text-xs text-[#6B5D4B] font-mono font-semibold">
                    Python · PyTorch · FastAPI · Hugging Face
                  </div>
                </TiltCard>

                {/* Card 2 – Featured Project (ProductIQ card text: #24211C, Small labels: #6B5D4B) */}
                <TiltCard
                  onClick={() => scrollToSection('projects')}
                  className="rounded-2xl bg-white/45 backdrop-blur-xl p-5 sm:p-6 sm:w-64 flex flex-col justify-between border border-white/60 shadow-xl cursor-pointer hover:bg-white/55 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-[#171717] flex items-center justify-center text-[#FFFFFF] font-bold text-xs shadow-inner">
                          P
                        </div>
                        {/* ProductIQ card text: #24211C */}
                        <span className="text-sm font-bold text-[#24211C]">
                          ProductIQ
                        </span>
                      </div>
                      {/* Small labels: #6B5D4B */}
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/80 border border-black/10 text-[#6B5D4B] shadow-sm">
                        Featured
                      </span>
                    </div>

                    {/* Small labels: #6B5D4B */}
                    <div className="text-xs text-[#6B5D4B] mb-2 font-bold">
                      AI-Driven Product Feedback Intelligence Platform
                    </div>

                    {/* ProductIQ card text: #24211C */}
                    <p className="text-xs sm:text-sm leading-relaxed text-[#24211C] font-medium">
                      Built an LLM-powered system using Llama 3.1 to classify customer feedback, prioritize issues, and automate roadmap generation.
                    </p>

                    {/* Small labels: #6B5D4B */}
                    <div className="mt-2 text-[11px] text-[#6B5D4B] font-mono font-semibold">
                      Python · FastAPI · Llama 3.1 · PostgreSQL · React
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-5 pt-3 border-t border-black/15 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        src="https://github.com/Anuvid17.png"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://i.pravatar.cc/72?img=12';
                        }}
                        alt="Anuvid Mishra"
                        className="w-8 h-8 rounded-full object-cover bg-white/20 border border-black/20 shadow-sm"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#24211C] leading-tight">
                          Anuvid Mishra
                        </div>
                        <div className="text-[10px] text-[#6B5D4B] leading-tight font-medium">
                          Aspire to be AI/ML Dev
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* CTA text: #FFFFFF */}
                      <a
                        href="https://productiq-frontend-2x15.onrender.com/dashboard"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-bold flex items-center gap-1 transition-colors px-2 py-1 rounded bg-[#171717] text-[#FFFFFF] hover:bg-black shadow-sm"
                      >
                        Live <ExternalLink className="w-2.5 h-2.5 text-[#FFFFFF]" />
                      </a>
                      <a
                        href="https://github.com/Anuvid17"
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] font-bold text-[#24211C] hover:underline flex items-center gap-1 transition-colors px-1.5 py-1 rounded hover:bg-black/10"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* Recruiter Metric Stat Strip (inspired by placement sample portfolio) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              <div className="rounded-2xl bg-white/40 backdrop-blur-xl p-3.5 border border-white/50 text-left shadow-sm">
                <div className="text-lg sm:text-xl font-bold text-[#24211C]">8.15 CGPA</div>
                <div className="text-[11px] font-bold text-[#6B5D4B]">MCA (GenAI) · Alliance Univ</div>
                <div className="text-[10px] text-[#24211C]/80 mt-0.5">NAAC A+ Accredited · 2027</div>
              </div>

              <div className="rounded-2xl bg-white/40 backdrop-blur-xl p-3.5 border border-white/50 text-left shadow-sm">
                <div className="text-lg sm:text-xl font-bold text-[#24211C]">3+ Deployed</div>
                <div className="text-[11px] font-bold text-[#6B5D4B]">Production ML Systems</div>
                <div className="text-[10px] text-[#24211C]/80 mt-0.5">Render & Hugging Face Spaces</div>
              </div>

              <div className="rounded-2xl bg-white/40 backdrop-blur-xl p-3.5 border border-white/50 text-left shadow-sm">
                <div className="text-lg sm:text-xl font-bold text-[#24211C]">100,000+</div>
                <div className="text-[11px] font-bold text-[#6B5D4B]">Sentence Pairs Trained</div>
                <div className="text-[10px] text-[#24211C]/80 mt-0.5">FLAN-T5 Grammar Model</div>
              </div>

              <div className="rounded-2xl bg-white/40 backdrop-blur-xl p-3.5 border border-white/50 text-left shadow-sm">
                <div className="text-lg sm:text-xl font-bold text-[#24211C]">8.75 CGPA</div>
                <div className="text-[11px] font-bold text-[#6B5D4B]">BCA (ITM University)</div>
                <div className="text-[10px] text-[#24211C]/80 mt-0.5">Cloud Tech & Information Sec</div>
              </div>
            </div>
          </div>

          {/* Subtle scroll down indicator */}
          <div className="flex justify-center pt-8">
            <button
              onClick={() => scrollToSection('3d-portfolio')}
              className="flex items-center gap-2 text-xs font-bold transition-all cursor-pointer px-4 py-1.5 rounded-full border border-white/60 bg-white/80 backdrop-blur-xl text-[#171717] hover:bg-white shadow-md"
            >
              <span>Explore Interactive 3D Model Below</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#171717] animate-bounce" />
            </button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: INTERACTIVE 3D MODEL (EMBEDDED ON MAIN PAGE) */}
        {/* ========================================================= */}
        <section id="3d-portfolio" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                  Interactive 3D Portfolio
                </span>
                <span className="text-xs font-mono text-amber-300 bg-black/70 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  Three.js WebGL
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F0E6] drop-shadow-sm">
                Spatial AI Neural Architecture & Projects
              </h2>
              <p className="text-xs sm:text-sm text-[#E5D8C5] mt-1 max-w-2xl">
                Interact with the 3D computational tensor core, inspect live projects orbiting in 3D space, and explore technical competencies directly on the page.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copy3DPortfolioLink}
                className="text-xs font-bold flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all shadow-md bg-white/80 text-[#171717] hover:bg-white border border-black/15 cursor-pointer"
                title="Copy direct link to this 3D portfolio section"
              >
                <Copy className="w-3.5 h-3.5 text-black" />
                <span>Copy 3D Link</span>
              </button>
            </div>
          </div>

          {/* Embedded 3D Canvas Container */}
          <ThreePortfolio />
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: ABOUT ME */}
        {/* ========================================================= */}
        <section id="about" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
          <div className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]">
            <div className="flex items-center gap-2 mb-4">
              {/* Small labels: #6B5D4B */}
              <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                About Me
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="max-w-2xl space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#24211C]">
                  Passionate About Transforming Complex AI Research into Scalable Real-World Applications.
                </h2>
                <p className="text-sm sm:text-base leading-relaxed text-[#24211C]/90 font-medium">
                  I'm Anuvid Mishra, an AI/ML developer currently pursuing a Master of Computer Applications in Generative AI at Alliance University, Bangalore.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-[#24211C]/90 font-medium">
                  I enjoy building intelligent applications using Machine Learning, NLP, Large Language Models, and Reinforcement Learning. My work focuses on transforming complex problems into practical AI-powered solutions, from fine-tuning transformer models to developing intelligent feedback prioritization systems.
                </p>
              </div>

              {/* Profile Card with Enhanced Image and Tilt */}
              <TiltCard className="flex flex-col gap-4 bg-white/75 backdrop-blur-xl border border-white/80 rounded-3xl p-6 w-full lg:w-[360px] shadow-lg hover:shadow-2xl transition-all">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  {/* Enhanced Profile Image with Warm Amber Halo */}
                  <div className="relative group shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/40 via-amber-300/30 to-amber-600/40 rounded-2xl blur-sm opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src="/assets/aistudio/anuvid_mishra_profile.jpg"
                      alt="Anuvid Mishra - AI/ML Developer"
                      className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-2xl object-cover object-top border-2 border-amber-400/60 shadow-md"
                    />
                    <div className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase bg-amber-400 text-[#171717] shadow-sm tracking-wider">
                      AI / ML
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left flex flex-col justify-center">
                    <div className="text-xl font-bold text-[#24211C] leading-tight">Anuvid Mishra</div>
                    <div className="text-xs text-[#6B5D4B] font-semibold mt-1">AI/ML Developer</div>
                    <div className="text-xs text-[#24211C] font-mono font-bold mt-2">
                      Alliance University
                    </div>
                    <div className="text-[11px] text-[#6B5D4B] font-mono font-medium">
                      MCA (GenAI) · 8.15 CGPA
                    </div>
                    <div className="text-[11px] text-[#6B5D4B] font-mono mt-1">
                      +91 9479074354
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/10 flex flex-col gap-2">
                  <a
                    href="/assets/aistudio/Updated_Technical_Resume_13c27fb4.pdf"
                    download="Anuvid_Mishra_Updated_Technical_Resume.pdf"
                    className="w-full py-2.5 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black cursor-pointer group"
                  >
                    <Download className="w-3.5 h-3.5 text-[#FFFFFF] transition-transform group-hover:translate-y-0.5" />
                    <span>Download Technical Resume</span>
                  </a>
                  <div className="flex items-center gap-2">
                    <a
                      href="/assets/aistudio/Anuvid_Resume_ec9c6b41.pdf"
                      download="Anuvid_Resume.pdf"
                      className="flex-1 py-2 px-3 rounded-full text-[11px] font-semibold transition-all flex items-center justify-center gap-1 bg-white/80 hover:bg-white text-[#24211C] border border-black/15 shadow-sm"
                    >
                      <Download className="w-3 h-3 text-[#24211C]" />
                      <span>Standard Resume</span>
                    </a>
                    <button
                      onClick={() => setResumeModalOpen(true)}
                      className="py-2 px-3.5 rounded-full text-[11px] font-semibold transition-all flex items-center justify-center gap-1 bg-white/80 hover:bg-white text-[#24211C] border border-black/15 shadow-sm cursor-pointer"
                    >
                      <Eye className="w-3 h-3 text-[#24211C]" />
                      <span>Preview</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>

                  {/* Quick Core Focus Cards with 3D Tilt */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-black/15">
                    <TiltCard className="bg-white/60 rounded-2xl p-4 border border-white/70 shadow-sm">
                      <div className="text-xs text-[#6B5D4B] uppercase tracking-wider font-bold">Specialization</div>
                      <div className="text-base font-bold text-[#24211C] mt-1">Generative AI & LLMs</div>
                      <div className="text-xs text-[#24211C]/80 font-medium mt-1">Llama 3.1, FLAN-T5 fine-tuning, Prompt Engineering & RAG</div>
                    </TiltCard>
                    <TiltCard className="bg-white/60 rounded-2xl p-4 border border-white/70 shadow-sm">
                      <div className="text-xs text-[#6B5D4B] uppercase tracking-wider font-bold">Decision Intelligence</div>
                      <div className="text-base font-bold text-[#24211C] mt-1">RL & Deep Q-Networks</div>
                      <div className="text-xs text-[#24211C]/80 font-medium mt-1">Transformer embeddings combined with DQN for smart prioritization</div>
                    </TiltCard>
                    <TiltCard className="bg-white/60 rounded-2xl p-4 border border-white/70 shadow-sm">
                      <div className="text-xs text-[#6B5D4B] uppercase tracking-wider font-bold">Full Stack ML</div>
                      <div className="text-base font-bold text-[#24211C] mt-1">FastAPI & Modern React</div>
                      <div className="text-xs text-[#24211C]/80 font-medium mt-1">Production-ready API servers and high-response user interfaces</div>
                    </TiltCard>
                  </div>
                </div>
              </section>

              {/* ========================================================= */}
              {/* SECTION 4: FEATURED PROJECTS */}
              {/* ========================================================= */}
              <section id="projects" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <div>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                      Portfolio Projects
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F0E6] mt-2 drop-shadow-sm">
                      Featured AI & Machine Learning Systems
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scrollToSection('3d-portfolio')}
                      className="text-xs font-bold flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all shadow-md bg-white/80 text-[#171717] hover:bg-white border border-black/15 cursor-pointer"
                    >
                      <Box className="w-3.5 h-3.5 text-amber-600" />
                      <span>View in 3D Space ↑</span>
                    </button>

                    {/* CTA text: #FFFFFF */}
                    <a
                      href="https://github.com/Anuvid17"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all w-fit shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                    >
                      <span>GitHub Repos</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#FFFFFF]" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Project 1: Adaptive Product Feedback Prioritization */}
                  <TiltCard className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:bg-white/55 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] shadow-sm">
                          50.93% Acc · 0.4735 F1
                        </span>
                        <span className="text-xs text-[#6B5D4B] font-mono font-bold">RL & DQN</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#24211C] mb-2">
                        Adaptive Product Feedback Prioritization
                      </h3>

                      <ul className="text-xs sm:text-sm text-[#24211C]/90 font-medium space-y-2 list-disc list-inside leading-relaxed">
                        <li>Transformer embeddings combined with Deep Q-Network reinforcement learning.</li>
                        <li>Evaluated on 1,500 software issues.</li>
                        <li>Achieved 50.93% accuracy and 0.4735 weighted F1 score.</li>
                      </ul>
                    </div>

                    <div className="pt-5 border-t border-black/15 mt-6 space-y-3">
                      <div className="text-[11px] text-[#6B5D4B] font-mono font-bold">
                        Python · PyTorch · Transformers · DQN
                      </div>

                      <div className="flex items-center gap-2.5">
                        {/* CTA text: #FFFFFF */}
                        <a
                          href="https://rl-prioritization-frontend.onrender.com/"
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-3 h-3 text-[#FFFFFF]" />
                        </a>
                        <a
                          href="https://github.com/Anuvid17"
                          target="_blank"
                          rel="noreferrer"
                          className="py-2.5 px-3.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 bg-white/80 text-[#171717] hover:bg-white border border-black/15 shadow-sm"
                        >
                          <Github className="w-3 h-3 text-[#171717]" />
                          <span>Repo</span>
                        </a>
                      </div>
                    </div>
                  </TiltCard>

                  {/* Project 2: ProductIQ (ProductIQ card text: #24211C, Small labels: #6B5D4B) */}
                  <TiltCard className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:bg-white/55 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] shadow-sm">
                          Llama 3.1 Powered
                        </span>
                        <span className="text-xs text-[#6B5D4B] font-mono font-bold">Production</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#24211C] mb-2">
                        ProductIQ – AI Product Feedback Intelligence
                      </h3>

                      <ul className="text-xs sm:text-sm text-[#24211C]/90 font-medium space-y-2 list-disc list-inside leading-relaxed">
                        <li>LLM-based customer feedback classification and prioritization.</li>
                        <li>Automated roadmap generation and developer task creation.</li>
                        <li>Implemented structured output validation and semantic duplicate detection.</li>
                      </ul>
                    </div>

                    <div className="pt-5 border-t border-black/15 mt-6 space-y-3">
                      <div className="text-[11px] text-[#6B5D4B] font-mono font-bold">
                        Python · FastAPI · Llama 3.1 · PostgreSQL · React
                      </div>

                      <div className="flex items-center gap-2.5">
                        {/* CTA text: #FFFFFF */}
                        <a
                          href="https://productiq-frontend-2x15.onrender.com/dashboard"
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                        >
                          <span>Live Dashboard</span>
                          <ExternalLink className="w-3 h-3 text-[#FFFFFF]" />
                        </a>
                        <a
                          href="https://github.com/Anuvid17"
                          target="_blank"
                          rel="noreferrer"
                          className="py-2.5 px-3.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 bg-white/80 text-[#171717] hover:bg-white border border-black/15 shadow-sm"
                        >
                          <Github className="w-3 h-3 text-[#171717]" />
                          <span>Repo</span>
                        </a>
                      </div>
                    </div>
                  </TiltCard>

                  {/* Project 3: AI Grammar Correction */}
                  <TiltCard className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-7 shadow-xl flex flex-col justify-between hover:bg-white/55 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] shadow-sm">
                          0.6869 BLEU · 0.8748 ROUGE
                        </span>
                        <span className="text-xs text-[#6B5D4B] font-mono font-bold">Fine-Tuned</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#24211C] mb-2">
                        AI Grammar Correction – Fine-Tuned FLAN-T5
                      </h3>

                      <ul className="text-xs sm:text-sm text-[#24211C]/90 font-medium space-y-2 list-disc list-inside leading-relaxed">
                        <li>Fine-tuned FLAN-T5-base on 100,000 sentence pairs.</li>
                        <li>Achieved 0.6869 BLEU and 0.8748 ROUGE-L generation quality.</li>
                        <li>Developed a full FastAPI and React web application.</li>
                      </ul>
                    </div>

                    <div className="pt-5 border-t border-black/15 mt-6 space-y-3">
                      <div className="text-[11px] text-[#6B5D4B] font-mono font-bold">
                        FLAN-T5 · Hugging Face · FastAPI · React
                      </div>

                      <div className="flex items-center gap-2.5">
                        {/* CTA text: #FFFFFF */}
                        <a
                          href="https://huggingface.co/spaces/anuvid/ai-grammar-correction"
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center py-2.5 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                        >
                          <span>Hugging Face Space</span>
                          <ExternalLink className="w-3 h-3 text-[#FFFFFF]" />
                        </a>
                        <a
                          href="https://github.com/Anuvid17"
                          target="_blank"
                          rel="noreferrer"
                          className="py-2.5 px-3.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 bg-white/80 text-[#171717] hover:bg-white border border-black/15 shadow-sm"
                        >
                          <Github className="w-3 h-3 text-[#171717]" />
                          <span>Repo</span>
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </section>

              {/* ========================================================= */}
              {/* SECTION 5: TECHNICAL SKILLS MATRIX (Skills card text: #24211C, Small labels: #6B5D4B) */}
              {/* ========================================================= */}
              <section id="skills" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                      Expertise
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F0E6] mt-2 drop-shadow-sm">
                      Technical Skills & AI Stack
                    </h2>
                  </div>

                  <button
                    onClick={copy3DPortfolioLink}
                    className="text-xs font-bold flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all shadow-md bg-white/80 text-[#171717] hover:bg-white border border-black/15 w-fit cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-black" />
                    <span>Copy 3D Profile Link for Placements</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {[
                    {
                      category: 'AI & Machine Learning',
                      icon: Cpu,
                      items: ['NLP', 'Transformers', 'LLMs', 'DQN', 'BERT', 'RAG'],
                    },
                    {
                      category: 'Programming Languages',
                      icon: Terminal,
                      items: ['Python', 'C', 'C++', 'SQL'],
                    },
                    {
                      category: 'Frameworks',
                      icon: Layers,
                      items: ['FastAPI', 'Django', 'Flask', 'React', 'Angular'],
                    },
                    {
                      category: 'Libraries & Toolkits',
                      icon: Code,
                      items: ['PyTorch', 'Scikit-learn', 'Hugging Face'],
                    },
                    {
                      category: 'Databases & Storage',
                      icon: BookOpen,
                      items: ['PostgreSQL', 'MySQL', 'SQLite'],
                    },
                    {
                      category: 'DevOps & AI Tools',
                      icon: Briefcase,
                      items: ['Docker', 'Git', 'GitHub', 'Ollama'],
                    },
                    {
                      category: 'Cloud & Infrastructure',
                      icon: Sparkles,
                      items: ['AWS', 'Microsoft Azure', 'Vercel'],
                    },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <TiltCard
                        key={cat.category}
                        className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-5 sm:p-6 shadow-lg hover:bg-white/55 transition-all"
                      >
                        <div className="flex items-center gap-2.5 mb-3.5">
                          <Icon className="w-4 h-4 text-[#24211C]" />
                          {/* Skills card text: #24211C */}
                          <h3 className="text-sm font-bold text-[#24211C]">{cat.category}</h3>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {cat.items.map((skill) => {
                            const isFlagship = [
                              'Python',
                              'PyTorch',
                              'Transformers',
                              'LLMs',
                              'FastAPI',
                              'Docker',
                              'PostgreSQL',
                              'AWS',
                            ].includes(skill);

                            return (
                              <span
                                key={skill}
                                className={`text-xs px-3 py-1 rounded-lg font-bold transition-all ${isFlagship
                                    ? 'bg-[#171717] text-[#FFFFFF] shadow-sm'
                                    : 'bg-white/80 text-[#24211C] border border-black/10 hover:bg-white'
                                  }`}
                              >
                                {skill}
                              </span>
                            );
                          })}
                        </div>
                      </TiltCard>
                    );
                  })}
                </div>
              </section>

              {/* ========================================================= */}
              {/* SECTION 6: CERTIFICATIONS & VERIFIED CREDENTIALS */}
              {/* ========================================================= */}
              <section id="certifications" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                        Verified Credentials
                      </span>
                      <span className="text-xs font-mono text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 font-bold">
                        5 Accredited Badges
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F5F0E6] drop-shadow-sm">
                      Professional Certifications & Internships
                    </h2>
                    <p className="text-xs sm:text-sm text-[#E5D8C5] mt-1 max-w-2xl">
                      Accredited credentials and verified certificates across Full Stack Python, Machine Learning, Statistical Analysis, GUI Engineering, and Microsoft UI/UX Prototyping.
                    </p>
                  </div>

                  <button
                    onClick={() => setPdfModalOpen(true)}
                    className="text-xs font-bold flex items-center gap-1.5 px-4 py-2 rounded-full transition-all shadow-md bg-white/80 text-[#171717] hover:bg-white border border-black/15 cursor-pointer w-fit"
                  >
                    <FileText className="w-3.5 h-3.5 text-black" />
                    <span>View Internship Certificate PDF</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* 1. Flagship Internship Certificate: Pantech e Learning (Python Full Stack) */}
                  <TiltCard className="rounded-3xl bg-white/45 backdrop-blur-2xl border-2 border-amber-400/60 p-6 shadow-xl flex flex-col justify-between hover:bg-white/55 transition-all md:col-span-2 lg:col-span-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 px-3.5 py-1 rounded-bl-2xl bg-[#171717] text-[#FFFFFF] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Govt. MSME & IETE Recognized</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-[#171717] flex items-center justify-center text-[#FFFFFF] shadow-sm">
                          <Award className="w-5 h-5 text-amber-300" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono uppercase font-bold text-[#6B5D4B] tracking-wider">
                            Pantech e Learning Pvt. Ltd. · 3 Months Internship
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-[#24211C] leading-snug">
                            Python Full Stack Internship Certificate
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-[#24211C]/90 font-medium leading-relaxed mb-4">
                        Successfully completed an intensive 3-month engineering internship covering full-stack Python development, database architecture, backend REST APIs, frontend integration, and production deployment. Verified under Ministry of MSME, Govt. of India and The Institution of Electronics and Telecommunication Engineers (IETE).
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                        <div className="bg-white/70 rounded-xl p-2.5 border border-black/10">
                          <div className="text-[10px] font-mono uppercase text-[#6B5D4B] font-bold">Certificate No.</div>
                          <div className="text-xs font-mono font-bold text-[#24211C]">PEL-SI-2023-2020</div>
                        </div>
                        <div className="bg-white/70 rounded-xl p-2.5 border border-black/10">
                          <div className="text-[10px] font-mono uppercase text-[#6B5D4B] font-bold">Duration</div>
                          <div className="text-xs font-mono font-bold text-[#24211C]">29 Nov 2023 – 28 Feb 2024</div>
                        </div>
                        <div className="bg-white/70 rounded-xl p-2.5 border border-black/10">
                          <div className="text-[10px] font-mono uppercase text-[#6B5D4B] font-bold">Institution</div>
                          <div className="text-xs font-mono font-bold text-[#24211C]">ITM University</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {['Python Full Stack', 'FastAPI & Flask', 'Database Modeling', 'API Integration', 'Software Engineering'].map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-white/80 border border-black/10 text-[#24211C]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-black/15">
                      <button
                        onClick={() => setPdfModalOpen(true)}
                        className="flex-1 py-2.5 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#FFFFFF]" />
                        <span>Preview Official Certificate</span>
                      </button>
                      <a
                        href="/assets/aistudio/ANUVID_MISHRA_Internship_Certificate_d8a95496.pdf"
                        download="ANUVID_MISHRA_Python_Full_Stack_Certificate.pdf"
                        className="py-2.5 px-4 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 bg-white/80 hover:bg-white text-[#24211C] border border-black/15 shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-[#24211C]" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  </TiltCard>

                  {/* 2. University of Pennsylvania: Data Analysis Using Python */}
                  <TiltCard className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 shadow-xl flex flex-col justify-between hover:bg-white/55 transition-all group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#6B5D4B] tracking-wider">
                          Univ. of Pennsylvania
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
                          Coursera
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#24211C] leading-snug mb-2">
                        Data Analysis Using Python
                      </h3>

                      <p className="text-xs text-[#24211C]/90 font-medium leading-relaxed mb-3.5">
                        Advanced data analytics, structured data inspection, statistical exploration, Pandas, and NumPy for empirical data modeling.
                      </p>

                      <div className="bg-white/70 rounded-xl p-2.5 border border-black/10 mb-3.5">
                        <div className="text-[10px] font-mono uppercase text-[#6B5D4B] font-bold">Credential ID</div>
                        <div className="text-xs font-mono font-bold text-[#24211C] truncate">DKGVJ59EH4HV</div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {['Python', 'Pandas', 'NumPy', 'Data Exploration'].map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/80 border border-black/10 text-[#24211C]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-black/15">
                      <a
                        href="https://www.coursera.org/account/accomplishments/verify/DKGVJ59EH4HV"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3 h-3 text-[#FFFFFF]" />
                      </a>
                    </div>
                  </TiltCard>

                  {/* 3. Educba: Machine Learning with Python & Statistics */}
                  <TiltCard className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 shadow-xl flex flex-col justify-between hover:bg-white/55 transition-all group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#6B5D4B] tracking-wider">
                          Educba
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
                          Coursera
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#24211C] leading-snug mb-2">
                        Machine Learning with Python & Statistics
                      </h3>

                      <p className="text-xs text-[#24211C]/90 font-medium leading-relaxed mb-3.5">
                        Mathematical principles of statistical modeling, regression, clustering algorithms, classification, and model evaluation metrics.
                      </p>

                      <div className="bg-white/70 rounded-xl p-2.5 border border-black/10 mb-3.5">
                        <div className="text-[10px] font-mono uppercase text-[#6B5D4B] font-bold">Credential ID</div>
                        <div className="text-xs font-mono font-bold text-[#24211C] truncate">IXJ903X9AMJR</div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {['Machine Learning', 'Statistics', 'Regression', 'Classification'].map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/80 border border-black/10 text-[#24211C]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-black/15">
                      <a
                        href="https://www.coursera.org/account/accomplishments/verify/IXJ903X9AMJR"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3 h-3 text-[#FFFFFF]" />
                      </a>
                    </div>
                  </TiltCard>

                  {/* 4. Educba: Python GUI Development */}
                  <TiltCard className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 shadow-xl flex flex-col justify-between hover:bg-white/55 transition-all group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#6B5D4B] tracking-wider">
                          Educba
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
                          Coursera
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#24211C] leading-snug mb-2">
                        Python GUI Development
                      </h3>

                      <p className="text-xs text-[#24211C]/90 font-medium leading-relaxed mb-3.5">
                        Interactive desktop software interfaces, event-driven loops, widget architectures, and user-friendly Python applications.
                      </p>

                      <div className="bg-white/70 rounded-xl p-2.5 border border-black/10 mb-3.5">
                        <div className="text-[10px] font-mono uppercase text-[#6B5D4B] font-bold">Credential ID</div>
                        <div className="text-xs font-mono font-bold text-[#24211C] truncate">CWI1HDZ25CC9</div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {['Tkinter', 'Desktop Apps', 'Event-Driven', 'GUI Design'].map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/80 border border-black/10 text-[#24211C]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-black/15">
                      <a
                        href="https://www.coursera.org/account/accomplishments/verify/CWI1HDZ25CC9"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3 h-3 text-[#FFFFFF]" />
                      </a>
                    </div>
                  </TiltCard>

                  {/* 5. Microsoft: User Interface Design and Prototyping */}
                  <TiltCard className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 shadow-xl flex flex-col justify-between hover:bg-white/55 transition-all group">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono uppercase font-bold text-[#6B5D4B] tracking-wider">
                          Microsoft
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
                          Coursera
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#24211C] leading-snug mb-2">
                        User Interface Design & Prototyping
                      </h3>

                      <p className="text-xs text-[#24211C]/90 font-medium leading-relaxed mb-3.5">
                        Human-Computer Interaction (HCI), design hierarchy, wireframing, high-fidelity interactive prototyping, and usability ergonomics.
                      </p>

                      <div className="bg-white/70 rounded-xl p-2.5 border border-black/10 mb-3.5">
                        <div className="text-[10px] font-mono uppercase text-[#6B5D4B] font-bold">Credential ID</div>
                        <div className="text-xs font-mono font-bold text-[#24211C] truncate">FIYFF7HJBSRO</div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {['UI/UX Design', 'Wireframing', 'Prototyping', 'HCI Principles'].map((t) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/80 border border-black/10 text-[#24211C]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-black/15">
                      <a
                        href="https://www.coursera.org/account/accomplishments/verify/FIYFF7HJBSRO"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3 h-3 text-[#FFFFFF]" />
                      </a>
                    </div>
                  </TiltCard>
                </div>
              </section>

              {/* ========================================================= */}
              {/* SECTION 7: EXPERIENCE & EDUCATION */}
              {/* ========================================================= */}
              <section id="experience" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Experience Card */}
                  <div className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-8 shadow-xl space-y-6">
                    <div>
                      <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                        Experience
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight text-[#24211C] mt-2 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[#24211C]" /> Professional Experience
                      </h2>
                    </div>

                    <div className="bg-white/60 rounded-2xl p-5 border border-white/70 space-y-3 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="font-bold text-[#24211C] text-base">
                          Software Development Intern – Wholiex Enterprise
                        </div>
                        {/* Small labels: #6B5D4B */}
                        <div className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] w-fit shadow-sm">
                          Sept 2024 – Dec 2024
                        </div>
                      </div>

                      <ul className="text-xs sm:text-sm text-[#24211C]/90 font-medium space-y-2 list-disc list-inside leading-relaxed pt-1">
                        <li>Developed backend APIs supporting ML model integration and recommendation-system workflows.</li>
                        <li>Built responsive frontend components using Angular and Ionic.</li>
                        <li>Integrated PostgreSQL-based application analytics.</li>
                        <li>Performed API integration, testing, debugging, and performance improvements.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Education Card */}
                  <div className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-8 shadow-xl space-y-6">
                    <div>
                      <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                        Education
                      </span>
                      <h2 className="text-2xl font-bold tracking-tight text-[#24211C] mt-2 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-[#24211C]" /> Academic Background
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {/* Alliance University */}
                      <div className="bg-white/60 rounded-2xl p-5 border border-white/70 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="font-bold text-[#24211C]">
                            Master of Computer Applications – Generative AI
                          </div>
                          {/* Small labels: #6B5D4B */}
                          <div className="text-xs font-mono font-bold text-[#6B5D4B]">2025 – 2027 (Expected)</div>
                        </div>
                        <div className="text-sm text-[#24211C]/90 font-medium mt-1">Alliance University, Bangalore · NAAC A+</div>
                        <div className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] mt-2 inline-block shadow-sm">
                          CGPA: 8.15 / 10
                        </div>
                      </div>

                      {/* ITM University */}
                      <div className="bg-white/60 rounded-2xl p-5 border border-white/70 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="font-bold text-[#24211C]">
                            Bachelor of Computer Applications – Cloud Tech & InfoSec
                          </div>
                          {/* Small labels: #6B5D4B */}
                          <div className="text-xs font-mono font-bold text-[#6B5D4B]">2022 – 2025</div>
                        </div>
                        <div className="text-sm text-[#24211C]/90 font-medium mt-1">ITM University, Raipur</div>
                        <div className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] mt-2 inline-block shadow-sm">
                          CGPA: 8.75 / 10
                        </div>
                      </div>

                      {/* HSC - Higher Secondary */}
                      <div className="bg-white/60 rounded-2xl p-5 border border-white/70 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="font-bold text-[#24211C]">
                            Higher Secondary Certificate (HSC)
                          </div>
                          <div className="text-xs font-mono font-bold text-[#6B5D4B]">2022</div>
                        </div>
                        <div className="text-sm text-[#24211C]/90 font-medium mt-1">Swami Vivekananda Sr. Sec. School</div>
                        <div className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/80 border border-black/10 text-[#6B5D4B] mt-2 inline-block shadow-sm">
                          Score: 78%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ========================================================= */}
              {/* SECTION 7: CONTACT & LET'S CONNECT */}
              {/* ========================================================= */}
              <section id="contact" className="py-20 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto w-full">
                <div className="rounded-3xl bg-white/45 backdrop-blur-2xl border border-white/60 p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] space-y-8">
                  <div className="max-w-xl">
                    {/* Small labels: #6B5D4B */}
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-white/80 border border-white/60 text-[#6B5D4B] shadow-sm">
                      Contact & Profiles
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#24211C] mt-2">
                      Let's Build Intelligent Systems Together
                    </h2>
                    <p className="text-sm text-[#24211C]/85 font-medium mt-2">
                      Open for AI/ML engineering roles, research collaborations, and production LLM projects. Reach out directly or inspect interactive 3D and code repositories below.
                    </p>
                  </div>

                  {/* Email Card with Copy button */}
                  <div className="bg-white/60 rounded-2xl p-5 border border-white/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                    <div>
                      {/* Small labels: #6B5D4B */}
                      <div className="text-xs text-[#6B5D4B] uppercase tracking-wider font-mono font-bold">Direct Email</div>
                      <a
                        href="mailto:anuvidmishra200417@gmail.com"
                        className="text-base sm:text-lg font-bold text-[#24211C] hover:underline transition-colors mt-0.5 block"
                      >
                        anuvidmishra200417@gmail.com
                      </a>
                    </div>
                    {/* CTA text: #FFFFFF */}
                    <button
                      onClick={copyEmail}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-[#FFFFFF]" /> : <Copy className="w-3.5 h-3.5 text-[#FFFFFF]" />}
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
                    </button>
                  </div>

                  {/* Profiles & Links Grid (4 Cards: 3D Portfolio, GitHub, LinkedIn, LeetCode) with 3D Tilt */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* 3D Portfolio Card */}
                    <TiltCard
                      onClick={() => scrollToSection('3d-portfolio')}
                      className="bg-white/60 hover:bg-white/80 transition-all rounded-2xl p-5 border border-amber-400/40 flex flex-col justify-between group shadow-sm text-left cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[#24211C] transition-colors">
                        <Box className="w-6 h-6 text-amber-600" />
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-black text-[#F5F0E6]">
                          3D Model
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="text-base font-bold text-[#24211C] transition-colors flex items-center gap-1">
                          <span>3D Neural Model</span>
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        </div>
                        <div className="text-xs text-[#6B5D4B] font-mono font-bold mt-0.5">Embedded on Page</div>
                      </div>
                    </TiltCard>

                    <TiltCard
                      onClick={() => window.open('https://github.com/Anuvid17', '_blank')}
                      className="bg-white/60 hover:bg-white/80 transition-all rounded-2xl p-5 border border-white/70 flex flex-col justify-between group shadow-sm cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[#24211C] transition-colors">
                        <Github className="w-6 h-6 text-[#24211C]" />
                        <ExternalLink className="w-4 h-4 text-[#6B5D4B] group-hover:text-[#24211C]" />
                      </div>
                      <div className="mt-4">
                        <div className="text-base font-bold text-[#24211C] transition-colors">GitHub</div>
                        {/* Small labels: #6B5D4B */}
                        <div className="text-xs text-[#6B5D4B] font-mono font-bold">github.com/Anuvid17</div>
                      </div>
                    </TiltCard>

                    <TiltCard
                      onClick={() => window.open('https://linkedin.com/in/anuvid-mishra', '_blank')}
                      className="bg-white/60 hover:bg-white/80 transition-all rounded-2xl p-5 border border-white/70 flex flex-col justify-between group shadow-sm cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[#24211C] transition-colors">
                        <Linkedin className="w-6 h-6 text-[#24211C]" />
                        <ExternalLink className="w-4 h-4 text-[#6B5D4B] group-hover:text-[#24211C]" />
                      </div>
                      <div className="mt-4">
                        <div className="text-base font-bold text-[#24211C] transition-colors">LinkedIn</div>
                        {/* Small labels: #6B5D4B */}
                        <div className="text-xs text-[#6B5D4B] font-mono font-bold">in/anuvid-mishra</div>
                      </div>
                    </TiltCard>

                    <TiltCard
                      onClick={() => window.open('https://leetcode.com/u/anuvid17/', '_blank')}
                      className="bg-white/60 hover:bg-white/80 transition-all rounded-2xl p-5 border border-white/70 flex flex-col justify-between group shadow-sm cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[#24211C] transition-colors">
                        <Code className="w-6 h-6 text-[#24211C]" />
                        <ExternalLink className="w-4 h-4 text-[#6B5D4B] group-hover:text-[#24211C]" />
                      </div>
                      <div className="mt-4">
                        <div className="text-base font-bold text-[#24211C] transition-colors">LeetCode</div>
                        {/* Small labels: #6B5D4B */}
                        <div className="text-xs text-[#6B5D4B] font-mono font-bold">leetcode.com/u/anuvid17</div>
                      </div>
                    </TiltCard>
                  </div>

                  {/* Quick Resume Download Row */}
                  <div className="bg-white/60 rounded-2xl p-4 sm:p-5 border border-white/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#171717] flex items-center justify-center text-[#FFFFFF]">
                        <FileText className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#24211C]">Download Placement Resumes (PDF)</div>
                        <div className="text-xs text-[#6B5D4B]">Official Updated Technical Resume & Standard Resume</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href="/assets/aistudio/Updated_Technical_Resume_13c27fb4.pdf"
                        download="Anuvid_Mishra_Updated_Technical_Resume.pdf"
                        className="flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md bg-[#171717] text-[#FFFFFF] hover:bg-black cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#FFFFFF]" />
                        <span>Technical Resume</span>
                      </a>
                      <a
                        href="/assets/aistudio/Anuvid_Resume_ec9c6b41.pdf"
                        download="Anuvid_Resume.pdf"
                        className="flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 bg-white/80 hover:bg-white text-[#24211C] border border-black/15 shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-[#24211C]" />
                        <span>Standard Resume</span>
                      </a>
                    </div>
                  </div>

                  {/* Direct Mail Form (CTA text: #FFFFFF) */}
                  <div className="pt-2">
                    <a
                      href="mailto:anuvidmishra200417@gmail.com?subject=Let's%20Connect%20-%20AI/ML%20Opportunities"
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-bold transition-all shadow-xl cursor-pointer bg-[#171717] text-[#FFFFFF] hover:bg-black"
                    >
                      <Mail className="w-4 h-4 text-[#FFFFFF]" />
                      <span>Send Direct Email Message</span>
                    </a>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-8 px-5 sm:px-8 lg:px-12 border-t border-white/10 bg-black/60 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
                  <div className="flex items-center gap-2 text-[#E5D8C5]">
                    {/* Logo icon + name: #F5F0E6 */}
                    <svg
                      className="w-4 h-4 text-[#F5F0E6] fill-[#F5F0E6]"
                      viewBox="0 0 256 256"
                      fill="currentColor"
                    >
                      <path d="M 128 128 C 128 198.692 70.692 256 0 256 C 0 185.308 57.308 128 128 128 Z M 128 128 C 198.692 128 256 185.308 256 256 C 185.308 256 128 198.692 128 128 Z M 0 0 C 70.692 0 128 57.308 128 128 C 57.308 128 0 70.692 0 0 Z M 256 0 C 256 70.692 198.692 128 128 128 C 128 57.308 185.308 0 256 0 Z" />
                    </svg>
                    <span>Nexum · <span className="text-[#F5F0E6] font-semibold">Anuvid Mishra</span> · <span className="text-[#6B5D4B]">Aspire to be AI/ML Developer</span></span>
                  </div>

                  <button
                    onClick={() => scrollToSection('home')}
                    className="flex items-center gap-1 text-[#F5F0E6] font-semibold hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <span>Back to top</span>
                    <ArrowUp className="w-3.5 h-3.5 text-[#F5F0E6]" />
                  </button>
                </div>
              </footer>
            </main>

            {/* Resume Modal */}
            {resumeModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
                <div className="relative w-full max-w-3xl bg-[#14120e] border border-white/20 rounded-3xl p-5 sm:p-8 shadow-2xl text-[#F5F0E6] max-h-[92vh] flex flex-col">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#F5F0E6]">Technical Resume & Credentials</h3>
                        <p className="text-[11px] font-mono text-[#6B5D4B]">Alliance University · MCA (GenAI) · Anuvid Mishra</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Download Technical Resume */}
                      <a
                        href="/assets/aistudio/Updated_Technical_Resume_13c27fb4.pdf"
                        download="Anuvid_Mishra_Updated_Technical_Resume.pdf"
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#F5F0E6] text-[#171717] hover:bg-white transition-all shadow-sm cursor-pointer"
                        title="Download Official Updated Technical Resume PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-[#171717]" />
                        <span>Download Resume (PDF)</span>
                      </a>

                      {/* Download Standard Resume */}
                      <a
                        href="/assets/aistudio/Anuvid_Resume_ec9c6b41.pdf"
                        download="Anuvid_Resume.pdf"
                        className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#F5F0E6] border border-white/15 transition-all"
                        title="Download Standard Resume PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Standard</span>
                      </a>

                      <button
                        onClick={() => setResumeModalOpen(false)}
                        className="p-1.5 rounded-full hover:bg-white/10 text-[#E5D8C5] transition-all cursor-pointer"
                        title="Close Modal"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* View Switcher Tabs */}
                  <div className="flex items-center gap-2 pt-3 pb-2">
                    <button
                      onClick={() => setResumeViewTab('summary')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${resumeViewTab === 'summary'
                          ? 'bg-[#F5F0E6] text-[#171717] font-bold shadow-sm'
                          : 'bg-white/5 hover:bg-white/15 text-[#E5D8C5] border border-white/10'
                        }`}
                    >
                      Structured Summary
                    </button>
                    <button
                      onClick={() => setResumeViewTab('pdf')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${resumeViewTab === 'pdf'
                          ? 'bg-[#F5F0E6] text-[#171717] font-bold shadow-sm'
                          : 'bg-white/5 hover:bg-white/15 text-[#E5D8C5] border border-white/10'
                        }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Interactive PDF Viewer</span>
                    </button>
                  </div>

                  {/* Tab 1: Interactive PDF Viewer */}
                  {resumeViewTab === 'pdf' ? (
                    <div className="my-2 flex-1 min-h-[55vh] rounded-2xl overflow-hidden bg-black/40 border border-white/15 relative">
                      <iframe
                        src="/assets/aistudio/Updated_Technical_Resume_13c27fb4.pdf#toolbar=0"
                        title="Anuvid Mishra Updated Technical Resume"
                        className="w-full h-full min-h-[55vh] rounded-2xl bg-[#1c1813]"
                      />
                    </div>
                  ) : (
                    /* Tab 2: Structured Profile View */
                    <div className="py-3 space-y-4 text-xs sm:text-sm text-[#E5D8C5] overflow-y-auto flex-1 pr-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <img
                            src="/assets/aistudio/anuvid_mishra_profile.jpg"
                            alt="Anuvid Mishra"
                            className="w-14 h-18 sm:w-16 sm:h-20 rounded-xl object-cover object-top border-2 border-amber-400/50 shadow-md shrink-0"
                          />
                          <div>
                            <h4 className="text-base font-bold text-[#F5F0E6]">Anuvid Mishra</h4>
                            <p className="text-xs text-[#6B5D4B]">AI/ML Developer · Generative AI & Deep Learning</p>
                          </div>
                        </div>
                        <div className="text-right text-xs font-mono space-y-0.5">
                          <div className="text-[#F5F0E6]">anuvidmishra200417@gmail.com</div>
                          <div className="text-[#6B5D4B]">manuvidMCA25@stu.alliance.edu.in</div>
                          <div className="text-amber-200">+91 9479074354</div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-[#F5F0E6] uppercase text-xs tracking-wider mb-1.5 flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-amber-300" /> Academic Qualifications
                        </h5>
                        <div className="space-y-2">
                          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                            <div className="flex justify-between items-start">
                              <div>
                                <strong>Master of Computer Applications – Generative AI</strong>
                                <div className="text-[11px] text-[#6B5D4B]">Alliance University, Bangalore · NAAC Grade A+</div>
                              </div>
                              <span className="font-mono font-bold text-amber-200 text-xs">8.15 CGPA · 2027</span>
                            </div>
                          </div>
                          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                            <div className="flex justify-between items-start">
                              <div>
                                <strong>Bachelor of Computer Applications – Cloud Tech & InfoSec</strong>
                                <div className="text-[11px] text-[#6B5D4B]">ITM University, Raipur, Chhattisgarh</div>
                              </div>
                              <span className="font-mono font-bold text-amber-200 text-xs">8.75 CGPA · 2025</span>
                            </div>
                          </div>
                          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                            <div className="flex justify-between items-start">
                              <div>
                                <strong>Higher Secondary Certificate (HSC)</strong>
                                <div className="text-[11px] text-[#6B5D4B]">Swami Vivekananda Sr. Sec. School</div>
                              </div>
                              <span className="font-mono font-bold text-amber-200 text-xs">78% · 2022</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-[#F5F0E6] uppercase text-xs tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-amber-300" /> Professional Experience
                        </h5>
                        <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                          <div className="flex justify-between items-center mb-1">
                            <strong className="text-[#F5F0E6]">Software Developer Intern — Wholiex Enterprise</strong>
                            <span className="text-[10px] font-mono text-[#6B5D4B]">Sept 2024 – Dec 2024</span>
                          </div>
                          <p className="text-xs text-[#E5D8C5] leading-relaxed">
                            Worked on full-stack application development, including backend APIs for ML integration, PostgreSQL analytics, and responsive Angular/Ionic frontend components.
                          </p>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-bold text-[#F5F0E6] uppercase text-xs tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Box className="w-3.5 h-3.5 text-amber-300" /> Key ML & Production Projects
                        </h5>
                        <ul className="list-disc list-inside space-y-1.5 text-xs">
                          <li><strong>Adaptive Product Feedback Prioritization:</strong> Built a backlog prioritization system using BGE embeddings and DQN, achieving 50.93% accuracy and 0.14 ms/task latency on 1,500 issues.</li>
                          <li><strong>ProductIQ:</strong> LLM-powered feedback analysis platform using Llama 3.1, FastAPI, PostgreSQL, React, and Docker for classification, validation, and duplicate detection.</li>
                          <li><strong>AI Grammar Correction:</strong> Fine-tuned FLAN-T5-base on 100K sentence pairs, achieving 0.6869 BLEU and 0.8748 ROUGE-L with live Hugging Face deployment.</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-bold text-[#F5F0E6] uppercase text-xs tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-300" /> Accredited Certifications
                        </h5>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li><strong>Python Full Stack:</strong> Pantech e Learning Pvt. Ltd. (Govt. MSME & IETE Recognized, No: PEL-SI-2023-2020).</li>
                          <li><strong>Data Analysis Using Python:</strong> University of Pennsylvania (Coursera ID: DKGVJ59EH4HV).</li>
                          <li><strong>Machine Learning with Python & Statistics:</strong> Educba (Coursera ID: IXJ903X9AMJR).</li>
                          <li><strong>Python GUI Development:</strong> Educba (Coursera ID: CWI1HDZ25CC9).</li>
                          <li><strong>User Interface Design & Prototyping:</strong> Microsoft (Coursera ID: FIYFF7HJBSRO).</li>
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-bold text-[#F5F0E6] uppercase text-xs tracking-wider mb-1 flex items-center gap-1.5">
                          <Code className="w-3.5 h-3.5 text-amber-300" /> Core Skills Matrix
                        </h5>
                        <p className="font-mono text-xs text-[#F5F0E6] leading-relaxed">
                          Python, C, Java, SQL, FastAPI, Django, Flask, PyTorch, Transformers, BERT, LLMs, DQN, Hugging Face, Scikit-learn, PostgreSQL, MySQL, SQLite, Docker, Git, GitHub, AWS, Microsoft Azure, HTML, CSS, JavaScript, React, Angular, Ionic.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Footer Buttons */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-[#6B5D4B]">Verified for placement drives & internship drives</span>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href="/assets/aistudio/Updated_Technical_Resume_13c27fb4.pdf"
                        download="Anuvid_Mishra_Updated_Technical_Resume.pdf"
                        className="flex-1 sm:flex-none px-4 py-2 rounded-full text-xs font-bold bg-[#F5F0E6] text-[#171717] hover:bg-white transition-all cursor-pointer text-center shadow-md flex items-center justify-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download (PDF)</span>
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `Anuvid Mishra - AI/ML Developer | MCA (GenAI), Alliance University (8.15 CGPA) | BCA, ITM University (8.75 CGPA) | Phone: +91 9479074354 | Email: anuvidmishra200417@gmail.com | GitHub: https://github.com/Anuvid17 | LeetCode: https://leetcode.com/u/anuvid17/`
                          );
                          showToast('Copied Profile & Credentials Summary to clipboard!');
                        }}
                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#F5F0E6] transition-all cursor-pointer text-center"
                      >
                        Copy Summary
                      </button>
                      <button
                        onClick={() => setResumeModalOpen(false)}
                        className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-[#E5D8C5] transition-all cursor-pointer text-center"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Official Certificate PDF Viewer Modal */}
            {pdfModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
                <div className="relative w-full max-w-4xl bg-[#14120e] border border-white/25 rounded-3xl p-4 sm:p-6 shadow-2xl text-[#F5F0E6] flex flex-col max-h-[95vh]">
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-[#F5F0E6]">
                          Certificate of Internship — Python Full Stack
                        </h3>
                        <p className="text-[11px] font-mono text-[#6B5D4B]">
                          Pantech e Learning Pvt. Ltd. · PEL-SI-2023-2020 · Govt. MSME & IETE
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="/assets/aistudio/ANUVID_MISHRA_Internship_Certificate_d8a95496.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#F5F0E6] transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open in Tab</span>
                      </a>
                      <a
                        href="/assets/aistudio/ANUVID_MISHRA_Internship_Certificate_d8a95496.pdf"
                        download="ANUVID_MISHRA_Python_Full_Stack_Certificate.pdf"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#F5F0E6] text-[#171717] hover:bg-white transition-all shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </a>
                      <button
                        onClick={() => setPdfModalOpen(false)}
                        className="p-1.5 rounded-full hover:bg-white/10 text-[#E5D8C5] transition-all cursor-pointer"
                        title="Close Modal"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Embedded PDF iframe / View */}
                  <div className="my-3 flex-1 min-h-[50vh] sm:min-h-[62vh] rounded-2xl overflow-hidden bg-black/40 border border-white/15 relative">
                    <iframe
                      src="/assets/aistudio/ANUVID_MISHRA_Internship_Certificate_d8a95496.pdf#toolbar=0"
                      title="Python Full Stack Internship Certificate"
                      className="w-full h-full min-h-[52vh] sm:min-h-[62vh] rounded-2xl bg-[#1c1813]"
                    />
                  </div>

                  {/* Verification Metadata Footnote */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#6B5D4B]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified Recipient: <strong className="text-[#F5F0E6]">Anuvid Mishra</strong> (ITM University)</span>
                    </div>
                    <div className="font-mono">
                      Duration: 29 Nov 2023 to 28 Feb 2024 · PEL-SI-2023-2020
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Toast Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-xl text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200 bg-[#171717] text-[#FFFFFF] border border-white/20">
                <Sparkles className="w-4 h-4 text-[#FFFFFF]" />
                <span>{toastMessage}</span>
              </div>
            )}
          </div>
          );
}
