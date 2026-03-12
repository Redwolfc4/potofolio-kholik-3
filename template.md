# Project Context & Development Plan: Modern Interactive Portfolio

## 1. System Context & AI Instructions
You are an expert frontend developer specializing in Next.js (App Router), React, TailwindCSS, and shadcn/ui. 
Your task is to help the user build a modern, interactive portfolio website based on the specifications below.
Always adhere to the specified tech stack and project structure. Write clean, modular, and strongly-typed (TypeScript) code.

## 2. Tech Stack Overview
* **Framework:** Next.js (App Router, React 18+)
* **Language:** TypeScript
* **Styling:** TailwindCSS
* **UI Components:** shadcn/ui (Radix UI primitives)
* **Data Fetching & State:** TanStack Query (React Query)
* **Animations:** Framer Motion
* **Icons:** Lucide React
* **Deployment:** Vercel

## 3. Project Structure
Maintain the following directory structure when generating files:

```text
app/
 ├ layout.tsx (Root layout with providers)
 ├ page.tsx (Landing page)
 └ api/
    └ contact/
       └ route.ts (POST endpoint for email)

components/
 ├ about/
 │  └ about.tsx
 ├ certifications/
 │  └ cert-grid.tsx
 ├ companies/
 │  └ marquee.tsx
 ├ contact/
 │  └ contact-form.tsx
 ├ education/
 │  └ education.tsx
 ├ experience/
 │  └ journey.tsx
 ├ hero/
 │  └ hero.tsx
 ├ projects/
 │  └ projects.tsx
 ├ techstack/
 │  └ grid.tsx
 └ theme-toggle.tsx

lib/
 ├ api/
 ├ linkedin/
 └ utils.ts (shadcn utility fx)

hooks/
 ├ useProjects.ts
 ├ useExperience.ts
 ├ useTechstack.ts
 └ useCertifications.ts

services/
 ├ linkedin.service.ts
 ├ project.service.ts
 └ email.service.ts

types/
 ├ project.ts
 ├ experience.ts
 └ certificate.ts

styles/
 └ globals.css