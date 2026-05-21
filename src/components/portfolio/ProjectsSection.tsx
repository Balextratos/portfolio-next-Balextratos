import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { ArrowRight, User, Lock } from 'lucide-react';
import { Project } from '../Portfolio';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface ProjectsSectionProps {
  projects: Project[];
  onProjectSelect: (projectId: string) => void;
}

export function ProjectsSection({ projects, onProjectSelect }: ProjectsSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation();
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section ref={elementRef as React.RefObject<HTMLElement>} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-3xl md:text-5xl mb-4">
            Selected <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that showcase my approach to solving complex 
            user experience challenges across different industries and platforms.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category === 'all' ? 'All Projects' : category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isLocked = project.category === 'Currently designing';
            return (
            <Card
              key={project.id}
              className={`group overflow-hidden border-0 bg-card transition-all duration-300 ${isLocked ? 'cursor-default' : 'cursor-pointer hover:shadow-lg hover:-translate-y-1'}`}
              onClick={() => !isLocked && onProjectSelect(project.id)}
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${isLocked ? 'opacity-60' : ''}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="flex items-center gap-1.5">
                    {isLocked && (
                      <span className="relative flex w-2 h-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full w-2 h-2 bg-green-500" />
                      </span>
                    )}
                    {project.category}
                  </Badge>
                </div>
                {isLocked ? (
                  <div className="absolute bottom-4 right-4">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ) : (
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className={`p-6 ${isLocked ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  {project.client && (
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{project.client}</span>
                    </div>
                  )}
                </div>

                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-muted/30 rounded-2xl">
          <h3 className="text-xl font-semibold mb-2">Interested in working together?</h3>
          <p className="text-muted-foreground mb-6">
            I'm always open to discussing new opportunities and interesting projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                const contactForm = document.getElementById('contact-form');
                if (contactForm) {
                  contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}