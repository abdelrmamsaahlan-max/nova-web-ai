import { User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingColumn, PricingColumnProps } from "@/components/ui/pricing-utils/pricing-column";
import { Section } from "@/components/ui/pricing-utils/section";

interface PricingProps { title?: string | false; description?: string | false; plans?: PricingColumnProps[] | false; className?: string; }

const DEFAULT_PRICING_PLANS: PricingColumnProps[] = [
  { name: "Starter", icon: <User className="size-4" />, description: "A polished one-page website for a focused online presence.", price: 1499, priceNote: "Starting price in EGP. Final scope confirmed before work begins.", cta: { variant: "default", label: "Choose Starter", href: "#contact" }, features: ["One-page website", "Responsive design", "Basic animations", "Contact section", "Basic customization"], variant: "default" },
  { name: "Business", icon: <Users className="size-4" />, description: "A professional multi-section website built around your business.", price: 2999, priceNote: "Starting price in EGP. Final scope confirmed before work begins.", cta: { variant: "glow", label: "Choose Business", href: "#contact" }, features: ["Multi-section website", "Responsive design", "Custom styling", "Contact form", "Basic animations", "SEO-friendly structure"], variant: "glow-brand", promotionText: "RECOMMENDED" },
  { name: "Premium", icon: <Users className="size-4" />, description: "A tailored website with advanced sections and interactions.", price: 5999, priceNote: "Starting price in EGP. Final scope confirmed before work begins.", cta: { variant: "default", label: "Choose Premium", href: "#contact" }, features: ["Custom website", "Advanced sections", "Custom interactions", "More customization", "Responsive build", "Priority handling"], variant: "glow" },
];

export default function Pricing({ title = "Simple starting points.", description = "Choose a package that fits where your business is today. Final scope and pricing are confirmed before work begins.", plans = DEFAULT_PRICING_PLANS, className = "" }: PricingProps) {
  return <Section className={cn(className)}><div className="mx-auto flex max-w-6xl flex-col items-center gap-12">{(title || description) && <div className="flex flex-col items-center gap-4 px-4 text-center sm:gap-8">{title && <h2 className="text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">{title}</h2>}{description && <p className="text-md text-muted-foreground max-w-[600px] font-medium sm:text-xl">{description}</p>}</div>}{plans !== false && plans.length > 0 && <div className="max-w-container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">{plans.map((plan) => <PricingColumn key={plan.name} name={plan.name} icon={plan.icon} description={plan.description} price={plan.price} originalPrice={plan.originalPrice} promotionText={plan.promotionText} priceNote={plan.priceNote} cta={plan.cta} features={plan.features} variant={plan.variant} className={plan.className} />)}</div>}</div></Section>;
}
