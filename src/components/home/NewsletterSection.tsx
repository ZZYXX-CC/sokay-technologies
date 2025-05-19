"use client";

import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2, Mail, Bell, Tag } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { CTASection } from "@/components/ui/cta-section";

// Newsletter section component
export default function NewsletterSection() {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await subscribeToNewsletter(email);
      
      if (result.success) {
        toast.success('Successfully subscribed to the newsletter!');
        setEmail('');
      } else {
        toast.error(result.message || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Benefits data
  const benefits = [
    {
      title: "Product Updates",
      description: "Be the first to know about new releases and updates",
      icon: <Bell className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
    },
    {
      title: "Pro Audio Tips",
      description: "Exclusive audio engineering tips from industry experts",
      icon: <Mail className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
    },
    {
      title: "Special Offers",
      description: "Subscriber-only discounts and early access to sales",
      icon: <Tag className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
    }
  ];

  // Newsletter subscription form component
  const NewsletterForm = () => (
    <div className="max-w-md mx-auto mb-4">
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800 text-gray-900 dark:text-white focus:border-gray-400 dark:focus:border-gray-600 focus:ring-gray-400 dark:focus:ring-gray-600 pl-10 h-12 w-full"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail className="h-4 w-4" strokeWidth={1.5} />
          </div>
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="h-12 bg-gray-800 hover:bg-gray-700 dark:bg-black dark:hover:bg-gray-900 text-white border border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 transition-colors w-full sm:w-auto"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="sr-only sm:not-sr-only">Subscribing...</span>
            </span>
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>
      <p className="text-xs text-gray-500 text-center mt-2">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );

  return (
    <section 
      className="py-16 relative overflow-hidden mb-0 w-full border-t border-b border-gray-900"
      style={{
        backgroundImage: `url('/images/hero/BG2.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      <div className="container px-4 mx-auto relative z-10">

        <CTASection
          badge={{ text: "Newsletter" }}
          title="Stay Updated with Sokay News"
          description="Subscribe to our newsletter for product updates, audio tips, and exclusive offers"
          action={{
            text: "",
            href: "#newsletter-form",
            variant: "ghost"
          }}
          withGlow={false}
          className="mb-0"
        />
        
        {/* Subscription form with no additional box */}
        <div id="newsletter-form" className="relative z-10 pt-4 pb-8 px-4 mx-auto max-w-3xl">
          <NewsletterForm />
        </div>
        
        {/* Benefits */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 p-4 backdrop-blur-sm bg-black/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gray-200/20 border border-gray-300/30 flex items-center justify-center shrink-0 text-gray-100">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">{benefit.title}</h3>
                <p className="text-xs text-gray-300">{benefit.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
