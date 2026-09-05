# React / shadcn setup for Nova Web AI

The current Nova Web AI site is a static HTML/CSS/JavaScript site, not a React + TypeScript + Tailwind project. The new `components/ui/image-stream-hero.tsx` component therefore cannot be mounted directly by the existing `index.html` without migrating the app to a React build setup.

## Recommended setup

For a clean migration, use Next.js with the shadcn CLI:

```bash
npx create-next-app@latest nova-web-ai-react --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd nova-web-ai-react
npx shadcn@latest init
```

The shadcn CLI will create the standard `components/ui` directory when components are added. Keep reusable UI components there because the project alias and shadcn conventions make imports predictable, e.g.:

```tsx
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
```

The component uses only React and the existing shadcn `cn` helper; no extra animation library is required. If `cn` is not present, install/use the standard shadcn utility setup in `lib/utils.ts`.

## Where to use ImageStreamHero

The best fit in Nova Web AI is the **hero visual** on the home page. It can replace or sit behind the current browser mockup while keeping the headline, CTA buttons, and supporting copy above it.

Suggested structure:

```tsx
<ImageStreamHero
  images={[
    { src: "/images/nova-work-01.jpg", alt: "Nova website concept" },
    { src: "/images/nova-work-02.jpg", alt: "Nova website concept" },
    { src: "/images/nova-work-03.jpg", alt: "Nova website concept" },
  ]}
  className="min-h-[560px] w-full rounded-2xl border border-border bg-background"
>
  {/* Nova hero copy / CTA content */}
</ImageStreamHero>
```

## Existing site safety

No existing Nova Web AI static files were converted to React automatically. This keeps the current production site intact while the React version is prepared separately.
