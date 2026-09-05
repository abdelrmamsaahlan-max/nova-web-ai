# Nova Web AI — shadcn / Tailwind / TypeScript setup

The existing production site is a static HTML/CSS/JavaScript project: there is no `package.json`, React entry point, Tailwind build, or TypeScript config in the current repository. The existing `index.html` loads the site's CSS and JavaScript directly. fileciteturn27file0L2-L6

## Recommended React setup

Because the pricing component is React + TypeScript + Tailwind, create a React app (recommended: Next.js) and initialize shadcn:

```bash
npx create-next-app@latest nova-web-ai-react --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd nova-web-ai-react
npx shadcn@latest init
npm install lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge tw-animate-css
```

If the new app is kept separately, do not remove the current static site until the React version has been reviewed and deployed.

## Component and style paths

Use `/components/ui` as the default shadcn component directory. This repository now contains the pricing component and its local dependencies under that path so imports remain compatible with the supplied code:

- `components/ui/pricing.tsx`
- `components/ui/button.tsx`
- `components/ui/pricing-utils/pricing-column.tsx`
- `components/ui/pricing-utils/section.tsx`
- `lib/utils.ts`
- `components/ui/pricing-demo.tsx`

For a standard Next.js App Router project, global Tailwind styles normally live at `app/globals.css` (or `src/app/globals.css` when using `--src-dir`). Component-specific styles should stay colocated with components or use Tailwind classes.

Keeping `/components/ui` matters because the supplied imports use `@/components/ui/...`; changing the folder requires rewriting those imports and makes the component less compatible with the shadcn convention.

## Tailwind 4 globals

For Tailwind 4, extend the generated `app/globals.css` / `src/app/globals.css` with the requested theme variables:

```css
@import "tailwindcss";
@import "tw-animate-css";

@theme inline {
  --color-brand: var(--brand);
  --color-brand-foreground: var(--brand-foreground);
  --shadow-md: 0 4px 6px -1px var(--shadow), 0 2px 4px -2px var(--shadow);
  --shadow-xl: 0 20px 25px -5px var(--shadow), 0 8px 10px -6px var(--shadow);
}

:root {
  --primary: oklch(66.5% 0.1804 47.04);
  --brand: oklch(66.5% 0.1804 47.04);
  --brand-foreground: oklch(75.77% 0.159 55.91);
  --shadow: #00000008;
}

.dark {
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.21 0.006 285.885);
  --brand: oklch(83.6% 0.1177 66.87);
  --brand-foreground: oklch(75.77% 0.159 55.91);
  --shadow: #00000020;
}
```

For Tailwind 3, put the equivalent theme configuration in `tailwind.config.js` and/or `globals.css` instead.

## Data / state / assets / responsive behavior

- **Props:** `Pricing` accepts optional `title`, `description`, `plans`, and `className`. Each plan carries its own price, CTA, feature list, visual variant, and optional promotion/original-price data.
- **State:** The supplied pricing component has no React state, context provider, or custom hook requirements.
- **Icons:** `lucide-react` supplies the `User`, `Users`, and check icons; no custom SVG asset is required.
- **Images:** Pricing does not require images. Unsplash stock images are therefore unnecessary for this component; they should only be added to other components that actually need visual assets.
- **Responsive behavior:** the pricing grid is one column on small screens, two columns from `sm`, and three columns from `lg`. The supplied Free plan is hidden below `lg`.
- **Best location:** on Nova's home page, use this component as the pricing section after the work/process sections and before the contact CTA. It can replace the existing static pricing cards once the site is migrated to React.

## Important Nova-specific note

The supplied demo pricing is a Launch UI Components example in USD. Nova's current storefront uses EGP package pricing. When this component is wired into the actual Nova checkout, pass Nova's own plans through the `plans` prop rather than exposing the demo plans as the production offer.
