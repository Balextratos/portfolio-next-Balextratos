import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { ArrowLeft, User, ExternalLink } from 'lucide-react';
import { Project } from '../Portfolio';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CaseStudyProps {
  project: Project;
  onBack: () => void;
}

export function CaseStudy({ project, onBack }: CaseStudyProps) {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Button>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">{project.category}</Badge>
            <h1 className="text-3xl md:text-5xl mb-4">{project.title}</h1>
            <p className="text-lg text-muted-foreground">{project.description}</p>
          </div>

          {/* Project Meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {project.client && (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Client</span>
                </div>
                <p className="text-sm text-muted-foreground">{project.client}</p>
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Role</span>
              </div>
              <p className="text-sm text-muted-foreground">{project.role}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>

          {/* Hero Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-12">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Project Content */}
        <div className="space-y-12">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-muted-foreground">{project.overview}</p>
          </section>

          {/* Challenge */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">The Challenge</h2>
            <p className="text-muted-foreground">{project.challenge}</p>
          </section>

          {/* Process */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Design Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.process.map((step, index) => (
                <Card key={step} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span className="font-medium">{step}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* UX Research */}
          {project.uxResearch && project.uxResearch.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">UX Research</h2>
              <Accordion type="single" collapsible className="border rounded-lg px-4">
                {project.uxResearch.map((item, index) => (
                  <AccordionItem key={index} value={`ux-research-${index}`}>
                    <AccordionTrigger className="text-base font-medium">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          {/* Solution */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">The Solution</h2>
            <p className="text-muted-foreground mb-8">{project.solution}</p>
            
            {/* Additional Images */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={image}
                      alt={`${project.title} - Solution ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Outcome */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Results & Impact</h2>
            <p className="text-muted-foreground">{project.outcome}</p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-muted/30 rounded-2xl text-center">
          <h3 className="text-xl font-semibold mb-2">Like what you see?</h3>
          <p className="text-muted-foreground mb-6">
            Let's discuss how I can help bring your next project to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Live Project
            </Button>
            <Button variant="outline" onClick={onBack}>
              View More Projects
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}