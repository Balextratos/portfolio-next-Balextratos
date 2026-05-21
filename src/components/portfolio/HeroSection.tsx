import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ArrowRight, Download, MapPin, ChevronDown } from 'lucide-react';
const bastienPhoto = 'https://placehold.co/400x400';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface HeroSectionProps {
  onViewProjects: () => void;
}

export function HeroSection({ onViewProjects }: HeroSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation();
  const handleScrollDown = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      onViewProjects();
    }
  };

  return (
    <section ref={elementRef as React.RefObject<HTMLElement>} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`space-y-8 animate-fade-in-left ${isVisible ? 'is-visible' : ''}`}>
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                Available for new opportunities
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl">
                Hi, I'm <span className="text-primary">Bastien</span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground">
                UX & Product Designer crafting meaningful digital experiences
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl">
              I specialize in user research, interaction design, and creating intuitive 
              interfaces that solve real problems. With 6+ years of experience, I've helped 
              companies improve their user experience and drive business growth.
            </p>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Anywhere in Canada</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleScrollDown} className="flex items-center gap-2">
                View My Work
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <a href="/CV-bastien-agullo.pdf" download="CV-bastien-agullo.pdf">
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary">6+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className={`relative animate-fade-in-right ${isVisible ? 'is-visible' : ''}`}>
            <div className="relative w-full max-w-md mx-auto">
              {/* Background Elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-chart-1/10 rounded-full blur-2xl"></div>
              
              {/* Main Image */}
              <div className="relative z-10 aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-chart-1/5 p-8 animate-float">
                <img
                  src="/profile_pic.png"
                  alt="Bastien Agullo - UX Designer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Floating Elements - Now with higher z-index */}
              <div className="absolute top-8 -left-4 z-20 bg-background/80 backdrop-blur-md border border-border rounded-lg p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Currently designing</span>
                </div>
              </div>

              <div className="absolute bottom-8 -right-4 z-20 bg-background/80 backdrop-blur-md border border-border rounded-lg p-3 shadow-lg">
                <div className="text-sm">
                  <div className="font-medium">Latest Project</div>
                  <div className="text-muted-foreground">Banking App Redesign</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Now Functional */}
      <button 
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Scroll to projects"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <div className="w-px h-16 bg-border"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </button>
    </section>
  );
}