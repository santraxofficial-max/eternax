import { cn } from '@/lib/utils';
import React from 'react';

type IndustryType = {
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	description?: string;
};

type IndustryCardProps = React.ComponentProps<'div'> & {
	industry: IndustryType;
	isSelected?: boolean;
	onClick?: () => void;
};

export function IndustryCard({ industry, isSelected = false, onClick, className, ...props }: IndustryCardProps) {
	const p = genRandomPattern();

	return (
		<div
			className={cn(
				'relative overflow-hidden p-6 cursor-pointer transition-all duration-300 hover:scale-105',
				'border border-copper/20 hover:border-copper/60 rounded-lg',
				isSelected && 'border-copper/80 bg-copper/5 scale-105',
				className
			)}
			onClick={onClick}
			{...props}
		>
			{/* Grid Pattern Background */}
			<div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
				<div className="from-copper/5 to-copper/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
					<GridPattern
						width={20}
						height={20}
						x="-12"
						y="4"
						squares={p}
						className="fill-copper/5 stroke-copper/25 absolute inset-0 h-full w-full mix-blend-overlay"
					/>
				</div>
			</div>

			{/* Icon */}
			<industry.icon className="text-copper size-8 mb-4" strokeWidth={1.5} aria-hidden />

			{/* Title */}
			<h3 className="text-sm md:text-base font-medium text-concrete mb-2 uppercase tracking-wide">
				{industry.title}
			</h3>

			{/* Description (if provided) */}
			{industry.description && (
				<p className="text-concrete-muted relative z-20 text-xs font-light leading-relaxed">
					{industry.description}
				</p>
			)}

			{/* Selection indicator */}
			{isSelected && (
				<div className="absolute top-3 right-3 w-5 h-5 bg-copper rounded-full flex items-center justify-center">
					<div className="w-2 h-2 bg-white rounded-full" />
				</div>
			)}
		</div>
	);
}

function GridPattern({
	width,
	height,
	x,
	y,
	squares,
	...props
}: React.ComponentProps<'svg'> & { width: number; height: number; x: string; y: string; squares?: number[][] }) {
	const patternId = React.useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y], index) => (
						<rect strokeWidth="0" key={index} width={width + 1} height={height + 1} x={x * width} y={y * height} />
					))}
				</svg>
			)}
		</svg>
	);
}

function genRandomPattern(length?: number): number[][] {
	length = length ?? 5;
	return Array.from({ length }, () => [
		Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
		Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
	]);
}