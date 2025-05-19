"use client";

import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { CTASection } from '@/components/ui/cta-section';
import NewsletterSection from '@/components/home/NewsletterSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Instagram,
  Youtube,
  Loader2,
  MessageSquare
} from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FlickeringBackground } from '@/components/ui/flickering-background';

// Form schema for contact form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// Contact information for display
const contactInfo = [
  {
    icon: <MessageSquare className="h-5 w-5 text-gray-300" strokeWidth={1.5} />,
    title: "Live Support",
    details: [
      "Chat with our support team",
      "Get immediate assistance",
      "Available during business hours"
    ],
    isLiveSupport: true
  },
  {
    icon: <Phone className="h-5 w-5 text-gray-300" strokeWidth={1.5} />,
    title: "Phone",
    details: [
      "+234 912 985 5313",
      "+234 704 402 8851",
      "+234 703 606 9452",
      "+1 (714) 626-9639"
    ]
  },
  {
    icon: <Clock className="h-5 w-5 text-gray-300" strokeWidth={1.5} />,
    title: "Business Hours",
    details: [
      "Monday – Friday: 9:00-20:00",
      "Saturday: 11:00 – 15:00",
      "Sunday: Closed"
    ]
  },
  {
    icon: <Mail className="h-5 w-5 text-gray-300" strokeWidth={1.5} />,
    title: "Email",
    details: ["info@sokaytechnologies.com"]
  }
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Replace with actual API call to send email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully!');
      form.reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MainLayout>
      <div className="flex min-h-screen flex-col items-center font-geist-sans">
        {/* Hero Section WITHOUT Background */}
        <section className="w-full py-24 relative overflow-hidden text-white">
          <div className="container mx-auto px-4 relative z-10">
            <CTASection
              badge={{ text: "Contact Us" }}
              title="How can we help you?"
              description="We're here to help with any questions or support you need. Reach out to us for product inquiries, technical assistance, or order support."
              action={{
                text: "",
                href: "#contact-form",
                variant: "ghost"
              }}
              withGlow={false}
              className="mb-0 text-white [&_h2]:!text-white [&_p]:!text-white [&_span]:!text-white"
            />
          </div>
        </section>
        
        {/* Contact Information Cards - Using same transparency style */}
        <section className="w-full py-16 relative overflow-hidden">
          {/* Subtle background for entire section */}
          <div className="absolute inset-0 bg-gradient-to-b from-prussian_blue/5 to-black/10 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(#93b7be_1px,transparent_1px)] bg-[size:20px_20px] opacity-10"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {info.isLiveSupport ? (
                    <Card className="h-full bg-light_blue-500/5 backdrop-blur-md border-light_blue-300/30 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                      <CardHeader>
                        <div className="w-10 h-10 rounded-full bg-prussian_blue/10 border border-light_blue-300/40 flex items-center justify-center text-white mb-3 group-hover:bg-prussian_blue/20 transition-colors">
                          {info.icon}
                        </div>
                        <CardTitle className="text-lg text-white font-semibold">{info.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm font-medium text-gray-300 mb-1">
                            {detail}
                          </p>
                        ))}
                        <Button 
                          className="w-full mt-4 bg-prussian_blue/80 hover:bg-prussian_blue/90 text-white backdrop-blur-sm border border-light_blue-300/20"
                          onClick={() => window.alert('Live chat support would open here')}
                        >
                          <span className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Start Chat
                          </span>
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="h-full bg-light_blue-500/5 backdrop-blur-md border-light_blue-300/30 shadow-lg">
                      <CardHeader>
                        <div className="w-10 h-10 rounded-full bg-prussian_blue/10 border border-light_blue-300/40 flex items-center justify-center text-white mb-3">
                          {info.icon}
                        </div>
                        <CardTitle className="text-lg text-white font-semibold">{info.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm font-medium text-gray-300 mb-1">
                            {detail}
                          </p>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              ))}
            </motion.div>
            
            {/* Contact Form Section - With Matching Transparency */}
            <div className="w-full max-w-3xl mx-auto">
              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-light_blue-500/5 backdrop-blur-md border-light_blue-300/30 shadow-xl" id="contact-form">
                  <CardHeader className="border-b border-light_blue-300/20">
                    <CardTitle className="text-2xl text-white">Send us a message</CardTitle>
                    <CardDescription className="text-gray-300 font-medium">
                      Our team at Sokay Tech Stores is ready to assist you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white font-medium">Your Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Doe" className="bg-light_blue-500/5 backdrop-blur-sm border-light_blue-300/30 focus:border-light_blue-300/60 text-white" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-300 font-medium" />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white font-medium">Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="john@example.com" className="bg-light_blue-500/5 backdrop-blur-sm border-light_blue-300/30 focus:border-light_blue-300/60 text-white" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-300 font-medium" />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Subject</FormLabel>
                              <FormControl>
                                <Input placeholder="How can we help you?" className="bg-light_blue-500/5 backdrop-blur-sm border-light_blue-300/30 focus:border-light_blue-300/60 text-white" {...field} />
                              </FormControl>
                              <FormMessage className="text-red-300 font-medium" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white font-medium">Message</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Please describe your inquiry in detail..." 
                                  className="bg-light_blue-500/5 backdrop-blur-sm border-light_blue-300/30 focus:border-light_blue-300/60 min-h-32 resize-none text-white"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-red-300 font-medium" />
                            </FormItem>
                          )}
                        />
                        
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full sm:w-auto bg-prussian_blue/80 hover:bg-prussian_blue/90 text-white backdrop-blur-sm border border-light_blue-300/20"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Sending...</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="h-4 w-4" />
                              Send Message
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Social Connect Section - With Matching Transparency */}
        <section className="w-full py-16 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-prussian_blue/50 to-black/50 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(#93b7be_1px,transparent_1px)] bg-[size:16px_16px] opacity-10"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-white">Connect With Us</h2>
              <p className="max-w-2xl mx-auto text-gray-300">
                Follow us on social media for the latest updates, behind-the-scenes content, and exclusive offers.
              </p>
            </motion.div>
            
            <motion.div
              className="flex justify-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:-translate-y-2 border border-light_blue-300/30 hover:border-light_blue-300/60 rounded-full p-5 transition-all bg-light_blue-500/5 backdrop-blur-sm hover:bg-light_blue-500/10 duration-300 shadow-lg hover:shadow-light_blue-500/20"
              >
                <Instagram className="h-7 w-7 text-gray-300 hover:text-white transition-colors" strokeWidth={1.5} />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:-translate-y-2 border border-light_blue-300/30 hover:border-light_blue-300/60 rounded-full p-5 transition-all bg-light_blue-500/5 backdrop-blur-sm hover:bg-light_blue-500/10 duration-300 shadow-lg hover:shadow-light_blue-500/20"
              >
                <Youtube className="h-7 w-7 text-gray-300 hover:text-white transition-colors" strokeWidth={1.5} />
              </Link>
              <Link
                href="mailto:info@sokaytechnologies.com"
                className="hover:-translate-y-2 border border-light_blue-300/30 hover:border-light_blue-300/60 rounded-full p-5 transition-all bg-light_blue-500/5 backdrop-blur-sm hover:bg-light_blue-500/10 duration-300 shadow-lg hover:shadow-light_blue-500/20"
              >
                <Mail className="h-7 w-7 text-gray-300 hover:text-white transition-colors" strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </MainLayout>
  );
} 