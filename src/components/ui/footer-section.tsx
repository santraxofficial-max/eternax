'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, Package, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	isExternal?: boolean;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'What We Build', href: '/what-we-build', isExternal: false },
			{ title: 'Materials', href: '/materials', isExternal: false },
			{ title: 'Start a Project', href: '/start-project', isExternal: false },
			{ title: 'About', href: '/about', isExternal: false },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '/about', isExternal: false },
			{ title: 'Privacy Policy', href: '/privacy', isExternal: false },
			{ title: 'Terms of Services', href: '/terms', isExternal: false },
			{ title: 'Contact', href: '/contact', isExternal: false },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '/blog', isExternal: false },
			{ title: 'Changelog', href: '/changelog', isExternal: false },
			{ title: 'Brand', href: '/brand', isExternal: false },
			{ title: 'Help', href: '/help', isExternal: false },
		],
	},
	{
		label: 'Social Links',
		links: [
			{ title: 'Facebook', href: '#', icon: FacebookIcon, isExternal: true },
			{ title: 'Instagram', href: '#', icon: InstagramIcon, isExternal: true },
			{ title: 'Youtube', href: '#', icon: YoutubeIcon, isExternal: true },
			{ title: 'LinkedIn', href: '#', icon: LinkedinIcon, isExternal: true },
		],
	},
];

export function Footer() {
	return (
		<footer className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-2xl border border-copper/20 bg-gradient-to-br from-midnight via-midnight to-midnight-light px-6 py-12 lg:py-16 shadow-lg shadow-copper/10">
			<div className="bg-copper/40 absolute top-0 right-1/2 left-1/2 h-px w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm" />

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-copper/10 to-copper/5 border border-copper/20">
						<Package className="size-8 text-copper" />
						<span className="text-xl font-bold text-concrete">ETERNA</span>
					</div>
					<p className="text-muted-foreground mt-8 text-sm md:mt-0">
						© {new Date().getFullYear()} Eterna. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0 p-4 rounded-lg bg-gradient-to-br from-midnight-light/50 to-transparent border border-copper/10">
								<h3 className="text-xs font-semibold text-copper uppercase tracking-wider">{section.label}</h3>
								<ul className="text-muted-foreground mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											{link.isExternal ? (
												<a
													href={link.href}
													target="_blank"
													rel="noopener noreferrer"
													className="hover:text-copper transition-all duration-300 inline-flex items-center"
												>
													{link.icon && <link.icon className="me-1 size-4 text-copper/70" />}
													{link.title}
												</a>
											) : (
												<Link
													to={link.href}
													className="hover:text-copper transition-all duration-300 inline-flex items-center"
												>
													{link.icon && <link.icon className="me-1 size-4 text-copper/70" />}
													{link.title}
												</Link>
											)}
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};