"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  Calendar,
  Coffee,
} from "lucide-react";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getCalApi } from "@calcom/embed-react";

export function ContactSection() {
  const { elementRef, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "theme": "light", "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to send message');

      setFormData({ name: '', email: '', company: '', message: '' });
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 4000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section ref={elementRef as React.RefObject<HTMLElement>} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-3xl md:text-5xl mb-4">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new opportunities,
            collaborations, or just a friendly chat about
            design. Don't hesitate to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`space-y-8 animate-fade-in-left ${isVisible ? 'is-visible animate-delay-100' : ''}`}>
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">
                      bst.agullo@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">
                      +1 4387885261
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">
                      Anywhere in Canada
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="space-y-3">
                <button
                  data-cal-namespace="30min"
                  data-cal-link="bastien-agullo-y5nehi/30min"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-white border rounded-lg w-full text-left"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">
                        Schedule a Call
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Book a 30-minute consultation
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className={`p-6 animate-fade-in-right ${isVisible ? 'is-visible animate-delay-200' : ''}`} id="contact-form">
            <h3 className="text-xl font-semibold mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      updateField("name", e.target.value)
                    }
                    placeholder="Your name"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      updateField("email", e.target.value)
                    }
                    placeholder="your@email.com"
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) =>
                    updateField("company", e.target.value)
                  }
                  placeholder="Your company (optional)"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    updateField("message", e.target.value)
                  }
                  placeholder="Tell me about your project or just say hello!"
                  className="mt-1 min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full flex items-center gap-2"
                disabled={isSubmitting}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>


              {/* Availability - Now positioned below the Send Message button */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium">
                    Currently Available
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Open to new freelance projects and full-time
                  opportunities. Typical response time: 24
                  hours.
                </p>
              </div>
            </form>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h4 className="font-medium mb-2">
                What's your typical project timeline?
              </h4>
              <p className="text-sm text-muted-foreground">
                Most projects range from 2-6 months depending on
                scope and complexity.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-medium mb-2">
                Do you work with startups?
              </h4>
              <p className="text-sm text-muted-foreground">
                Absolutely! I love working with startups and
                early-stage companies.
              </p>
            </Card>

            <Card className="p-6">
              <h4 className="font-medium mb-2">
                What's included in your process?
              </h4>
              <p className="text-sm text-muted-foreground">
                Research, wireframing, prototyping, design
                systems, and usability testing.
              </p>
            </Card>
          </div>
        </div>
      </div>
      {/* Snackbar */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] transition-all duration-500 ease-out ${showSnackbar ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'}`}>
        <div className="bg-green-600 text-white text-sm font-medium px-6 py-3 rounded-full shadow-lg">
          Message sent successfully. Thank you !
        </div>
      </div>
    </section>
  );
}