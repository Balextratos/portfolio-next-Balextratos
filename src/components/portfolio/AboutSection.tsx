import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Briefcase,
  GraduationCap
} from 'lucide-react';
const bastienPhoto = 'https://placehold.co/400x400';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const TOOLS = [
  'Figma', 'Sketch', 'Adobe Creative Suite','Framer',
  'Miro','Hotjar', 'Maze', 'Notion' , 'Balsamiq', 'Claude', 'Stitch', 'UserTesting','Design system', 
  'UX research', 'Interaction design', 'Prototyping', 'User flows', 'Wireframing', 'Usability testing','Agile methodologies', 
  'Data-driven design', 'Accessibility standards', 'Responsive design',
];

const LANGUAGES = [
  {
    language: 'French',
    level: 'Native',
    description: 'Mother language',
  },
  {
    language: 'English',
    level: 'C1 Fluent',
    description: 'Professional working proficiency',
  },
];

const EXPERIENCE = [
  {
    title: 'Product Designer',
    company: 'Freelance',
    period: 'Jan 2025 - Present',
    description: 'Continue to advance my career in the design industry, specializing in the creation of complex products from business software to custom web applications.',
  },
  {
    title: 'UX/UI Designer',
    company: 'Mynotary',
    period: 'Jan 2022 - Jan 2025',
    description: 'Designed and implemented new features for SaaS products platform, applying product design principles and data-driven decision making to enhance user satisfaction and adoption. Led research phase with user interviews, prototype testing, and journey mapping. Managed UI phase creating scalable design system with component libraries and interactive prototypes in Figma. Delivered over 10 features resulting in 80% reduction in churn by improving usability and accessibility standards.',
  },
  {
    title: 'UI Designer',
    company: 'Isotech company',
    period: 'Oct 2019 - Sep 2021',
    description: 'Created an e-commerce platform for DIY and construction materials, focusing on user interface design, streamlined checkout flows, implementing best practices. Led research phase with competitive analysis, user research, and data-driven decision making. Developed personalized recommendation feature contributing €1M in revenue in the first year.',
  },
  {
    title: 'Intern Designer',
    company: 'Stem agency',
    period: 'Mar 2019 - Aug 2019',
    description: 'Career change to design in 2018, transitioned from hospitality to design, studying graphic design and UX. Secured internship within six months, focusing on graphic and web design, with additional contributions to print projects.',
  },
];

const EDUCATION = [
  {
    degree: "Master's Degree, Digital Strategy",
    school: 'Digital campus Lyon',
    period: '2018 - 2021',
    description: 'Specialized in digital strategy and user experience design.',
  },
  {
    degree: 'Bachelor, International Management',
    school: 'Vatel business school',
    period: '2014 - 2017',
    description: 'Studied international management and business administration.',
  },
  {
    degree: 'High School diploma',
    school: 'Saint-vincent-de-Paul',
    period: '2013',
    description: 'Completed high school education.',
  },
];

export function AboutSection() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section ref={elementRef as React.RefObject<HTMLElement>} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-3xl md:text-5xl mb-4">
            Who am I <span className="text-primary"></span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm passionate about creating meaningful digital experiences that make 
            people's lives easier and businesses more successful.
          </p>
        </div>

        <div className="space-y-12">
          {/* Profile & Story */}
          <div className={`flex flex-col md:flex-row gap-8 max-w-4xl mx-auto animate-fade-in ${isVisible ? 'is-visible animate-delay-100' : ''}`}>
            <div className="md:w-48 flex-shrink-0">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/profile_pic.png"
                  alt="Bastien Agullo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <h3 className="text-xl font-semibold">Background</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Senior Product Designer with 6 years of UX/UI experience designing complex SaaS platforms and custom web applications. Skilled in conducting user interviews, usability testing, and building scalable design systems. Looking for a strategic position where I could use my experience with SaaS customers.
                </p>
                <p>
                  My approach combines data-driven insights with human-centered design principles. I believe that great design isn't just about how something looks, but how it solves a problem.
                </p>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((tool) => (
                <Badge key={tool} variant="secondary">{tool}</Badge>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Languages</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LANGUAGES.map((lang, index) => (
                <Card key={index} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{lang.language}</h4>
                      <p className="text-sm text-muted-foreground">{lang.description}</p>
                    </div>
                    <Badge variant="outline">{lang.level}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience & Education */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Experience */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Experience</h3>
              </div>
              <div className="space-y-6">
                {EXPERIENCE.map((exp, index) => (
                  <div key={index} className="relative">
                    {index !== EXPERIENCE.length - 1 && (
                      <div className="absolute left-2 top-8 w-px h-16 bg-border"></div>
                    )}
                    <div className="flex gap-4">
                      <div className="w-4 h-4 bg-primary rounded-full mt-1 flex-shrink-0"></div>
                      <div className="space-y-1">
                        <h4 className="font-medium">{exp.title}</h4>
                        <p className="text-sm text-primary">{exp.company}</p>
                        <p className="text-xs text-muted-foreground">{exp.period}</p>
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Education */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Education</h3>
              </div>
              <div className="space-y-6">
                {EDUCATION.map((edu, index) => (
                  <div key={index} className="relative">
                    {index !== EDUCATION.length - 1 && (
                      <div className="absolute left-2 top-8 w-px h-16 bg-border"></div>
                    )}
                    <div className="flex gap-4">
                      <div className="w-4 h-4 bg-chart-1 rounded-full mt-1 flex-shrink-0"></div>
                      <div className="space-y-1">
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-sm text-primary">{edu.school}</p>
                        <p className="text-xs text-muted-foreground">{edu.period}</p>
                        <p className="text-sm text-muted-foreground">{edu.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}