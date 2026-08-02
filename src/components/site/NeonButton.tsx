import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

const variants = {
  neon: "bg-neon text-primary-foreground hover:brightness-110 hover:shadow-[0_16px_50px_-14px_var(--neon)] active:scale-[0.98]",
  glass: "glass text-foreground hover:border-neon/50 hover:text-neon active:scale-[0.98]",
  ghost: "text-muted-foreground hover:text-foreground",
  outline:
    "border border-neon/40 text-neon hover:bg-neon/10 hover:border-neon active:scale-[0.98]",
} as const;

const sizes = {
  sm: "h-9 px-4",
  md: "h-11 px-6",
  lg: "h-13 px-8 text-base",
} as const;

export type NeonButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function NeonButton({
  variant = "neon",
  size = "md",
  className,
  children,
  ...props
}: NeonButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function NeonLink({
  to,
  variant = "neon",
  size = "md",
  className,
  children,
}: {
  to: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link to={to} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}

export function ExternalNeonLink({
  href,
  variant = "glass",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  );
}
