import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion';
import { Project } from '../Portfolio';

interface ProjectSidePanelProps {
  project: Project;
  onClose: () => void;
}

export function ProjectSidePanel({ project, onClose }: ProjectSidePanelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [baLightbox, setBaLightbox] = useState<{ images: string[]; index: number } | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex(i => i !== null && project.gallery ? (i - 1 + project.gallery.length) % project.gallery.length : null);
  const nextImage = () => setLightboxIndex(i => i !== null && project.gallery ? (i + 1) % project.gallery.length : null);

  const openBaLightbox = (images: string[], index: number) => setBaLightbox({ images, index });
  const closeBaLightbox = () => setBaLightbox(null);
  const prevBaImage = () => setBaLightbox(s => s ? { ...s, index: (s.index - 1 + s.images.length) % s.images.length } : null);
  const nextBaImage = () => setBaLightbox(s => s ? { ...s, index: (s.index + 1) % s.images.length } : null);

  // Prevent body scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Trigger animation after mount
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before calling onClose
    setTimeout(onClose, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Side Panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-background z-50 shadow-2xl overflow-y-auto transition-transform duration-300 ease-out will-change-transform ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
          <div className="flex items-center justify-between p-6">
            <h2 className="text-2xl font-bold">{project.title}</h2>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Project Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {project.client && (
              <div>
                <p className="text-muted-foreground mb-1">Client</p>
                <p className="font-medium">{project.client}</p>
              </div>
            )}
            <div>
              <p className="text-muted-foreground mb-1">Role</p>
              <p className="font-medium">{project.role}</p>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="font-semibold mb-3">Overview</h3>
            <p className="text-muted-foreground">{project.overview}</p>
          </div>

          {/* Challenge */}
          <div>
            <h3 className="font-semibold mb-3">The Challenge</h3>
            <div className="text-muted-foreground space-y-1">
              {project.challenge.split('\n').map((line, i) => (
                <p key={i} className={line.startsWith('-') ? 'pl-2' : line === '' ? 'h-2' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* UX Research */}
          {project.uxResearch && project.uxResearch.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Summary of research</h3>
              <Accordion type="multiple" className="border rounded-lg">
                {project.uxResearch.map((item, index) => (
                  <AccordionItem key={index} value={`ux-research-${index}`} className="group">
                    <AccordionTrigger className={`text-sm font-medium px-4 transition-colors duration-150 hover:bg-accent hover:text-accent-foreground hover:no-underline ${index === 0 ? 'rounded-t-md rounded-b-none' : index === project.uxResearch!.length - 1 ? 'rounded-b-md rounded-t-none' : 'rounded-none'}`}>
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground whitespace-pre-line px-4">
                      {item.content}
                      {item.images && item.images.length > 0 && (
                        <div className="mt-8 space-y-3">
                          {item.images.map((img, i) => (
                            <div key={i} className="rounded-lg overflow-hidden border border-border">
                              <img
                                src={img}
                                alt={`${item.title} - ${i + 1}`}
                                className="w-full h-auto"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* Process */}
          <div>
            <h3 className="font-semibold mb-3">Design Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.process.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div>
            <h3 className="font-semibold mb-3">{project.id === 'design-system' ? 'Design constraints to consider' : 'The Solution'}</h3>
            <p className="text-muted-foreground whitespace-pre-line">{project.solution}</p>
          </div>

          {/* Outcome */}
          <div>
            <h3 className="font-semibold mb-3">{['isotech-ecommerce', 'forge-blacksmith', 'untouched'].includes(project.id) ? 'Delivered design' : 'Outcome'}</h3>
            <p className="text-muted-foreground whitespace-pre-line">{project.outcome}</p>
          </div>

          {/* Extra Sections */}
          {project.extraSections && project.extraSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-3">{section.title}</h3>
              <p className="text-muted-foreground whitespace-pre-line">{section.content}</p>
            </div>
          ))}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Gallery</h3>
              <div className="grid grid-cols-2 gap-2">
                {project.gallery.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-video rounded-lg overflow-hidden border border-border cursor-pointer group"
                    onClick={() => openLightbox(i)}
                  >
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" />
                    {i === 3 && project.gallery!.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold text-lg">
                        +{project.gallery!.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Before / After */}
          {project.beforeAfter && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Before</h3>
                <div className="grid grid-cols-2 gap-2">
                  {project.beforeAfter.before.map((img, i) => (
                    <div key={i} className="aspect-video rounded-lg overflow-hidden border border-border cursor-pointer group" onClick={() => openBaLightbox(project.beforeAfter!.before, i)}>
                      <img src={img} alt={`Before ${i + 1}`} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">After</h3>
                <div className="grid grid-cols-2 gap-2">
                  {project.beforeAfter.after.map((img, i) => (
                    <div key={i} className="aspect-video rounded-lg overflow-hidden border border-border cursor-pointer group" onClick={() => openBaLightbox(project.beforeAfter!.after, i)}>
                      <img src={img} alt={`After ${i + 1}`} className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Images */}
          {project.images && project.images.length > 0 && (
            <div className="space-y-4">
              {project.images.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={image}
                    alt={`${project.title} - ${index + 1}`}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && project.gallery && (
        <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center" onClick={closeLightbox}>
          <button className="absolute top-4 right-4 text-white p-2" onClick={closeLightbox}>
            <X className="w-6 h-6" />
          </button>
          <button className="absolute left-4 text-white p-2" onClick={e => { e.stopPropagation(); prevImage(); }}>
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img
            src={project.gallery[lightboxIndex]}
            alt={`Gallery ${lightboxIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />
          <button className="absolute right-4 text-white p-2" onClick={e => { e.stopPropagation(); nextImage(); }}>
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIndex + 1} / {project.gallery.length}
          </div>
        </div>
      )}
      {/* Before/After Lightbox */}
      {baLightbox && (
        <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center" onClick={closeBaLightbox}>
          <button className="absolute top-4 right-4 text-white p-2" onClick={closeBaLightbox}>
            <X className="w-6 h-6" />
          </button>
          <button className="absolute left-4 text-white p-2" onClick={e => { e.stopPropagation(); prevBaImage(); }}>
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img
            src={baLightbox.images[baLightbox.index]}
            alt={`Image ${baLightbox.index + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />
          <button className="absolute right-4 text-white p-2" onClick={e => { e.stopPropagation(); nextBaImage(); }}>
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 text-white/60 text-sm">
            {baLightbox.index + 1} / {baLightbox.images.length}
          </div>
        </div>
      )}
    </>
  );
}
