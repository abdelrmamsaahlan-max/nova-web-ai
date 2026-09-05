import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PricingColumnProps {
  name: string;
  icon?: React.ReactNode;
  description: string;
  price: number;
  originalPrice?: number;
  promotionText?: string;
  priceNote?: string;
  cta: { variant?: "default" | "glow"; label: string; href: string };
  features: string[];
  variant?: "default" | "glow" | "glow-brand";
  className?: string;
}

export function PricingColumn({ name, icon, description, price, originalPrice, promotionText, priceNote, cta, features, variant = "default", className }: PricingColumnProps) {
  const highlighted = variant !== "default";
  return (
    <article className={cn("relative flex min-h-[420px] flex-col rounded-2xl border border-border bg-card p-7 shadow-md", highlighted && "shadow-xl", className)}>
      {promotionText && <span className="mb-4 inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{promotionText}</span>}
      <div className="flex items-center gap-2 text-sm font-semibold">{icon}<span>{name}</span></div>
      <p className="mt-4 min-h-14 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6 flex items-end gap-2">
        {originalPrice !== undefined && <span className="mb-1 text-sm text-muted-foreground line-through">${originalPrice}</span>}
        <span className="text-4xl font-semibold tracking-tight">${price}</span>
      </div>
      {priceNote && <p className="mt-2 text-xs text-muted-foreground">{priceNote}</p>}
      <ul className="mt-7 flex-1 space-y-3 text-sm">
        {features.map((feature) => <li key={feature} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" /><span>{feature}</span></li>)}
      </ul>
      <a href={cta.href} className={cn("mt-7 inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-medium transition-colors", cta.variant === "glow" || highlighted ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input bg-background hover:bg-accent")}>{cta.label}</a>
    </article>
  );
}
