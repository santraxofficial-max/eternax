'use client';
import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Package,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FooterBackgroundGradient, TextHoverEffect } from '@/components/ui/hover-footer';
import { CommitsGrid } from '@/components/ui/commits-grid';

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'What We Build', href: '/what-we-build' },
      { label: 'Materials', href: '/materials' },
      { label: 'Start a Project', href: '/start-project' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Services', href: '/terms' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Help', href: '/help' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const contactInfo = [
  {
    icon: <Mail size={16} className="text-copper" />,
    text: 'hello@eterna.co',
    href: 'mailto:hello@eterna.co',
  },
  {
    icon: <Phone size={16} className="text-copper" />,
    text: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: <MapPin size={16} className="text-copper" />,
    text: 'Mumbai, India',
  },
];

const socialLinks = [
  { icon: <Facebook size={18} />, label: 'Facebook', href: '#' },
  { icon: <Instagram size={18} />, label: 'Instagram', href: '#' },
  { icon: <Youtube size={18} />, label: 'Youtube', href: '#' },
  { icon: <Linkedin size={18} />, label: 'LinkedIn', href: '#' },
];

export function Footer() {
  return (
    <footer className="relative w-full bg-background/50 backdrop-blur-sm border-t border-border/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Package className="size-8 text-copper" />
              <span className="text-xl font-bold text-foreground">ETERNA</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Designing the future of sustainable packaging. Premium eco-friendly solutions for conscious brands.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 pt-4">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-copper transition-colors duration-300"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-copper uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-muted/50 text-muted-foreground hover:bg-copper/20 hover:text-copper transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Eterna. All rights reserved.
          </p>
        </div>
      </div>

      {/* Large Hover Text */}
      <div className="relative h-32 md:h-48 flex items-center justify-center overflow-hidden">
        <TextHoverEffect text="ETERNA" className="w-full h-full" />
      </div>

      <FooterBackgroundGradient />

      {/* Commits Grid - GitHub style contribution grid with ETERNA */}
      <div className="relative bg-background/80 border-t border-border/20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs text-muted-foreground mb-4 uppercase tracking-wider">
            Built with passion
          </p>
          <CommitsGrid text="ETERNA" />
        </div>
      </div>
    </footer>
  );
}
