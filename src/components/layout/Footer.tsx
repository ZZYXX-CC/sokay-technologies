"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Mail } from "lucide-react";
import { motion } from "framer-motion";

// Social icon style with silver/gray accent on hover
const SocialIconStyle = "hover:-translate-y-1 border border-gray-800 hover:border-gray-400 rounded-full p-2.5 transition-all bg-gray-900/60 hover:bg-gray-800 transition-colors duration-200";

// Essential links for footer
const footerLinks = [
  { name: "About", href: "/about" },
  { name: "Store", href: "/store" },
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
  { name: "Contact", href: "mailto:info@sokaytechnologies.com" },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-800 w-full bg-black/95 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Logo and company info */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <motion.div 
            className="flex items-center mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-12 h-12 mr-3 flex items-center justify-center rounded-full bg-gray-900/80 border border-gray-800 shadow-lg">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#93b7be]/20 to-[#699ba5]/20 blur-sm"></div>
              <Image 
                src="/images/logo/Sokay-logo-1.svg" 
                alt="Sokay Technologies" 
                width={36} 
                height={36} 
                className="object-contain relative z-10"
              />
            </div>
            <span className="text-xl font-medium text-white">Sokay Technologies</span>
          </motion.div>
          
          {/* Essential links */}
          <motion.div 
            className="flex flex-wrap justify-center gap-x-8 gap-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {footerLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors py-2 px-3 hover:bg-gray-800/30 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        </div>
        
        {/* Social icons - Instagram, YouTube and Email */}
        <motion.div 
          className="flex justify-center gap-5 my-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            aria-label="Instagram"
            href="https://instagram.com"
            rel="noreferrer"
            target="_blank"
            className="hover:-translate-y-1 border border-gray-800 hover:border-[#93b7be]/50 rounded-full p-3 transition-all bg-gray-900/80 hover:bg-gray-800 duration-200 shadow-lg"
          >
            <Instagram className="h-5 w-5 text-gray-300 hover:text-white transition-colors" strokeWidth={1.5} />
          </Link>
          <Link
            aria-label="YouTube"
            href="https://youtube.com"
            rel="noreferrer"
            target="_blank"
            className="hover:-translate-y-1 border border-gray-800 hover:border-[#93b7be]/50 rounded-full p-3 transition-all bg-gray-900/80 hover:bg-gray-800 duration-200 shadow-lg"
          >
            <Youtube className="h-5 w-5 text-gray-300 hover:text-white transition-colors" strokeWidth={1.5} />
          </Link>
          <Link
            aria-label="Email"
            href="mailto:info@sokaytechnologies.com"
            rel="noreferrer"
            target="_blank"
            className="hover:-translate-y-1 border border-gray-800 hover:border-[#93b7be]/50 rounded-full p-3 transition-all bg-gray-900/80 hover:bg-gray-800 duration-200 shadow-lg"
          >
            <Mail className="h-5 w-5 text-gray-300 hover:text-white transition-colors" strokeWidth={1.5} />
          </Link>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          className="text-center text-gray-400 text-sm pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-row items-center justify-center gap-1">
            <span>© {new Date().getFullYear()} Sokay Technologies. All rights reserved.</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
