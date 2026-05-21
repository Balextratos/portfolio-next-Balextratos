"use client";
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Menu, X, ExternalLink, Linkedin, Mail } from 'lucide-react';
import { HeroSection } from './portfolio/HeroSection';
import { ProjectsSection } from './portfolio/ProjectsSection';
import { AboutSection } from './portfolio/AboutSection';
import { ContactSection } from './portfolio/ContactSection';
import { ProjectSidePanel } from './portfolio/ProjectSidePanel';
import { Footer } from './portfolio/Footer';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  year?: string;
  duration?: string;
  client?: string;
  role: string;
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;
  process: string[];
  images: string[];
  uxResearch?: { title: string; content: string; images?: string[] }[];
  extraSections?: { title: string; content: string }[];
  gallery?: string[];
  beforeAfter?: { before: string[]; after: string[] };
}

const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', sectionId: 'hero' },
  { id: 'projects', label: 'Projects', sectionId: 'projects' },
  { id: 'about', label: 'About', sectionId: 'about' },
  { id: 'contact', label: 'Contact', sectionId: 'contact' },
];

export function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollSpy, setScrollSpy] = useState('home');

  const projects: Project[] = [
    {
      id: 'crypto-banking',
      title: 'Crypto Banking App',
      description: 'Currently designing a crypto banking app experience focused on secure transactions and seamless mobile finance interactions.',
      category: 'Currently designing',
      image: '/crypto-web.png',
      tags: ['Fin Tech', 'Search UX', 'Banking app'],
      client: 'Secret',
      role: 'Product Designer',
      overview: 'Designed a comprehensive crypto banking app that prioritizes security, user trust, and intuitive financial management for cryptocurrency users.',
      challenge: 'Crypto users faced complex interfaces, security concerns, and lack of trust in mobile banking solutions for digital assets.',
      solution: 'Implemented secure authentication flows, simplified transaction interfaces, and integrated real-time portfolio tracking with educational features.',
      outcome: '70% increase in user adoption, 50% reduction in security incidents, and 4.8/5 app rating within the first year.',
      process: ['User Research', 'Security Audits', 'Interactive Prototypes', 'Usability Testing'],
      images: [
        '/crypto-web.png'
      ]
    },
    {
      id: 'mynotary',
      title: 'Mynotary',
      description: 'Over a three-year period, I worked full-time as lead designer on this legal tech SaaS platform, driving its development and ensuring a cohesive, user-centered product experience for real estate agents and notaries.',
      category: 'Web Platform',
      image: '/cover-feature.jpg',
      tags: ['Legal Tech', 'SaaS B2B', 'UX Research', 'Design System'],
      client: 'Mynotary',
      role: 'Lead UX Designer',
      overview: 'This has been my most complex and ambitious project to date. Over a three-year period, I worked full-time as the lead designer, driving its development and ensuring a cohesive, user-centered product experience for each type of user.',
      challenge: 'Beyond the typical UX variables (best practices, user needs, and technical constraints), Mynotary introduced a fourth: French legal compliance. Designing transaction journeys meant navigating complex legal recommendations at every step. Users (average age 47, low tech maturity) struggled with lengthy contract writing that could take several days, difficulty gathering all required documents, and miscommunications between stakeholders causing long delays, especially when multiple sellers and buyers were involved.',
      solution: 'Led the design of 10+ new features including a full UI remaster and new design system, a house buyer account, a billing tool, and a signature flow. Conducted extensive user research through interviews, journey mapping, and prototype testing. Facilitated creative workshops with users and delivered high-fidelity prototypes with animations. Optimized and documented the design system continuously throughout the project.',
      outcome: 'Reduced customer churn by 80% in the first year. Generated an estimated €100K in direct annual revenue for the company.',
      gallery: [
        '/mynotary/MN_app_screen_1.png',
        '/mynotary/MN_office_2.webp',
        '/mynotary/Mynotary_team.jpeg',
        '/mynotary/MN_app_screen_2.png',
        '/mynotary/MN_app_screen_3.png',
        '/mynotary/MN_app_screen_5.jpg',
        '/mynotary/MN_app_screen_6.jpg'
      ],
      extraSections: [
        {
          title: 'What were my tasks on a typical day ?',
          content: '- Research phase featuring a lot of interviews\n- Feedback analysis, reporting\n- Facilitating creative workshops with users\n- Wireframing\n- Optimize & document the Design system if needed\n- Create High fidelity prototypes\n- Lead user tests'
        }
      ],
      process: ['User Interviews', 'Journey Mapping', 'Feedback Analysis', 'Creative Workshops', 'Wireframing', 'Design System', 'High-Fidelity Prototyping', 'User Testing'],
      images: [],
      uxResearch: [
        {
          title: 'Users',
          content: 'The company was dealing with 3 main types of users at the time. Each of those had different needs and different journeys, with specific moments where users had to interact with each other to make the transaction complete.',
          images: [
            '/mynotary/persona_1.png',
            '/mynotary/persona_2.png',
            '/mynotary/persona_3.png',
          ]
        },
        {
          title: 'Daily routine',
          content: '- Sales prospecting\n- Manage the communications between all the stakeholders of a transaction\n- Gather all the different documents about the house, the seller, the buyer, the bank\n- Write all the contracts and make them signed respecting the legal procedure depending on what role they have in the transaction',
          images: ['/mynotary/agent-daily.png']
        },
        {
          title: 'Key Findings',
          content: '- Experience troubles to write all the legal conditions in contracts (which can change a lot. Depending on the nature of the transaction redaction can take several days even using IA)\n- Trouble to gather all the documents required to make the transaction happen\n- Experience long delays in their transaction due to miscommunications between all the stakeholders. (it can be even worse if there are several sellers and several buyers)'
        },
      ]
    },
    {
      id: 'design-system',
      title: 'Design System',
      description: 'Comprehensive design system creation for scalable UI components and consistent brand experience.',
      category: 'Design System',
      image: '/mynotary/cover_noty.png',
      tags: ['Design System', 'Component Library', 'Consistency'],
      client: 'Mynotary',
      duration: '4 months',
      role: 'UI Designer',
      overview: 'My first mission for Mynotary as a freelance. I created a comprehensive design system to ensure consistency across the product and reduce development time.',
      challenge: 'When I first joined the company I tested the product myself and instantly noticed mistakes in the way UI was made.\n\n- No UI elements to provide User feedback (snackbars, micro animations etc…)\n- Basic Color contrast were not respected (creating readability problems)\n- There was no consistency for the font scale\n- No semantic colors. The good actions were displayed the same way as errors\n\nThe list goes on..\n\nOf course as I was new to the company, my testimony and my knowledge about the topic were not enough to convince the managers to invest time and resources.\n\nI needed proofs & numbers',
      solution: '- Had to convince the managers team and the devs team to invest time to develop it\n- Had to preserve the original branding for political reasons\n- Had to use some legacy components for technical reasons\n- Had to work with some already existing code variables for technical reasons',
      outcome: '- Reduced customer churn by 80% the 1st year\n- Lowered development costs of ≈25% due to component consistency\n- Increased new features adoption for active users\n- Increased the total number of users by ≈500',
      process: ['Research', 'Component Inventory', 'Design Tokens', 'Documentation', 'Implementation'],
      images: [],
      beforeAfter: {
        before: [
          '/mynotary/before_1.png',
          '/mynotary/before_2.png',
          '/mynotary/before_3.png',
          '/mynotary/before_4.png'
        ],
        after: [
          '/mynotary/after_1.jpg',
          '/mynotary/after_2.png',
          '/mynotary/after_3.png',
          '/mynotary/after_4.png'
        ]
      },
      uxResearch: [
        {
          title: 'Users',
          content: 'The company was dealing with 3 main types of users at the time. Each of those had different needs and different journeys, with specific moments where users had to interact with each other to make the transaction complete.',
          images: [
            '/mynotary/persona_1.png',
            '/mynotary/persona_2.png',
            '/mynotary/persona_3.png',
          ]
        },
        {
          title: 'Key Findings',
          content: '- 10/13 users were failing to perform the task because they didn\'t see the options in the dropdown list\n- 13/13 of users told a verbatim about the difficulty to read the questions in forms\n- 13/13 users told they were avoiding to use the app because the tasks were time consuming\n- The average user time to complete the whole scenario was roughly 12min',
          images: ['/mynotary/Bug-statut.gif']
        },
        {
          title: 'How did I build it ?',
          content: '- Started by choosing a more neutral readable and scalable font: Inter\n  - Then I established a font scale using the rule of minor third as it creates a more understandable hierarchy for the platform we had\n  - Added my font scale as variables in Figma to keep consistency through the project\n- Then I corrected the contrast of the Primary color and improved the color palette\n  - Adding semantic colors for user feedback\n  - Adding color variants for different purposes (background, borders, fonts etc..)\n  - Defining colors using Design tokens (using the Tailwind method to make it scalable)'
        },
      ]
    },
    {
      id: 'isotech-ecommerce',
      title: 'E-commerce Platform UX',
      description: 'Designed a comprehensive e-commerce platform focusing on conversion optimization and user experience.',
      category: 'Online shop',
      image: '/cover-click.jpg',
      tags: ['E-commerce', 'Conversion Optimization', 'User Journey'],
      client: 'Isotech',
      duration: '4 months',
      role: 'Senior UX Designer',
      overview: 'Redesigned the e-commerce platform for Isotech, a B2B industrial equipment supplier. The project focused on simplifying a complex product catalogue and streamlining the purchasing journey for professional buyers.',
      challenge: 'The existing platform had a high cart abandonment rate, a poorly structured product catalogue, and no mobile optimisation, making it difficult for professional buyers to find and order the right equipment quickly.',
      solution: 'Restructured the product taxonomy, redesigned the checkout flow with fewer steps, and delivered a fully responsive mobile-first experience. Added contextual filtering and a quick-reorder feature for returning customers. Invented a feature that allowed the company to stand out in its market. Generating a direct impact : €1M in revenue in the first year.',
      outcome: '25% increase in conversion rate and 35% reduction in cart abandonment within the first quarter after launch.',
      process: ['Competitive Analysis', 'User Journey Mapping', 'A/B Testing', 'Responsive Design'],
      images: [
        '/cover-click.jpg',
        '/clic-mockup.png'
      ]
    },
    {
      id: 'forge-blacksmith',
      title: 'Blacksmithing shop',
      description: 'E-commerce platform redesign focused on improving product discovery, checkout conversion, and customer retention through a more intuitive shopping experience.',
      category: 'Online shop',
      image: '/forge.jpg',
      tags: ['Custom design', 'Blacksmithing', 'Enterprise'],
      client: 'Nimes coutellerie',

      duration: '8 months',
      role: 'UX Designer',
      overview: 'Designed the e-commerce website for Nîmes Coutellerie, a traditional blacksmithing and knife-making shop. The goal was to reflect the craftsmanship and heritage of the brand while making the online shop easy to navigate for a wide audience.',
      challenge: 'The shop had no online presence. Products were highly artisanal and varied, making categorisation and presentation a design challenge. The client needed a site that felt authentic to their craft without sacrificing usability.',
      solution: 'Created a custom visual identity for the web experience, designed a product catalogue with rich photography layouts, and built an intuitive purchase flow suited to one-of-a-kind handmade items.',
      outcome: 'Launched the shop\'s first online store, expanding reach beyond local customers and enabling direct online sales for the first time.',
      process: ['Stakeholder Interviews', 'Brand Exploration', 'Information Architecture', 'Visual Design', 'User Testing'],
      images: [
        '/forge.jpg'
      ]
    },
    {
      id: 'untouched',
      title: 'Untouched',
      description: 'Mobile outdoor application designed to help users find new activities, hiking spots, and rate their experience.',
      category: 'Mobile App',
      image: '/untouched.png',
      tags: ['Mobile Design', 'Outdoor', 'Rating'],
      client: 'Decathlon',
      duration: '5 months',
      role: 'UX Designer',
      overview: 'Designed Untouched, a mobile app for outdoor enthusiasts to discover new activities and hiking spots, log their adventures, and share ratings with a community of explorers. Built in collaboration with Decathlon.',
      challenge: 'Outdoor lovers had no dedicated tool to find off-the-beaten-path activities near them. Existing apps were either too generic or too focused on a single sport, with poor discovery UX and no community layer.',
      solution: 'Designed an activity discovery feed based on location and user preferences, a spot-rating system, and a lightweight community profile. Focused on fast access to key information in outdoor conditions: large touch targets, offline support, and minimal friction.',
      outcome: 'Delivered a fully tested prototype validated with outdoor enthusiasts. Recognised for its motion design and intuitive navigation during internal Decathlon review.',
      process: ['User Personas', 'Journey Mapping', 'Wireframing', 'Motion Design', 'A/B Testing'],
      images: [
        '/untouched.png'
      ]
    }
  ];

  // Scroll to section functionality
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll spy functionality
  useEffect(() => {
    if (activeSection === 'home' && !selectedProject) {
      const handleScroll = () => {
        const sections = [
          { id: 'hero', navId: 'home' },
          { id: 'projects', navId: 'projects' },
          { id: 'about', navId: 'about' },
          { id: 'contact', navId: 'contact' }
        ];
        
        const scrollPosition = window.scrollY + 120; // Offset for fixed header
        
        // Find the current section
        let currentSection = 'home';
        
        for (let i = 0; i < sections.length; i++) {
          const section = document.getElementById(sections[i].id);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              currentSection = sections[i].navId;
              break;
            }
          }
        }
        
        // Special case: if we're at the very top, show home
        if (window.scrollY < 100) {
          currentSection = 'home';
        }
        
        setScrollSpy(currentSection);
      };

      // Initial check
      handleScroll();
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // Reset scroll spy when not on home page
      setScrollSpy(activeSection);
    }
  }, [activeSection, selectedProject]);

  const renderContent = () => {
    // Home page shows all sections in a scrollable layout
    if (activeSection === 'home') {
      return (
        <div>
          <section id="hero">
            <HeroSection onViewProjects={() => scrollToSection('projects')} />
          </section>
          <section id="projects">
            <ProjectsSection
              projects={projects}
              onProjectSelect={setSelectedProject}
            />
          </section>
          <section id="about">
            <AboutSection />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
        </div>
      );
    }

    // Individual sections for direct navigation
    switch (activeSection) {
      case 'projects':
        return (
          <ProjectsSection
            projects={projects}
            onProjectSelect={setSelectedProject}
          />
        );
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return (
          <div>
            <section id="hero">
              <HeroSection onViewProjects={() => scrollToSection('projects')} />
            </section>
            <section id="projects">
              <ProjectsSection
                projects={projects}
                onProjectSelect={setSelectedProject}
              />
            </section>
            <section id="about">
              <AboutSection />
            </section>
            <section id="contact">
              <ContactSection />
            </section>
          </div>
        );
    }
  };

  const handleNavigation = (item: typeof NAVIGATION_ITEMS[0]) => {
    if (item.id === 'home') {
      setActiveSection('home');
      setSelectedProject(null);
      setScrollSpy('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (activeSection === 'home' && ['projects', 'about', 'contact'].includes(item.id)) {
      // If we're on home page, scroll to the section instead of switching
      scrollToSection(item.sectionId);
    } else {
      // Otherwise, switch to the section
      setActiveSection(item.id);
      setSelectedProject(null);
      // Reset scroll spy to match the new section
      setScrollSpy(item.id);
    }
  };

  // Determine which nav item should be highlighted
  const getNavItemState = (item: typeof NAVIGATION_ITEMS[0]) => {
    if (selectedProject) {
      return false; // No highlighting when viewing project details
    }
    
    if (activeSection === 'home') {
      // On home page, use scroll spy to determine active state
      return scrollSpy === item.id;
    } else {
      // On individual pages, use active section
      return activeSection === item.id;
    }
  };

  const selectedProjectData = selectedProject ? projects.find(p => p.id === selectedProject) : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => {
                setActiveSection('home');
                setSelectedProject(null);
                setScrollSpy('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-bold text-xl text-primary"
            >
              Bastien Agullo
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`transition-colors ${
                    getNavItemState(item)
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <a href="https://www.linkedin.com/in/bastien-agullo-6630b9122/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => scrollToSection('contact')}>
                <Mail className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-4 py-4 space-y-3">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavigation(item);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 transition-colors ${
                    getNavItemState(item)
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <Button asChild variant="ghost" size="sm">
                  <a href="https://www.linkedin.com/in/bastien-agullo-6630b9122/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => scrollToSection('contact')}>
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Side Panel */}
      {selectedProjectData && (
        <ProjectSidePanel
          project={selectedProjectData}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}