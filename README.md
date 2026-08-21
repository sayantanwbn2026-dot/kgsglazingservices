# Facade Architects

Build a world-class premium architectural facade website for Kolkata Glazing Services (KGS).

This is NOT a construction company website.
This is NOT a glass installer website.
This is NOT a window catalog website.

The website must feel like a fusion of Foster + Partners, Schüco, Apple, and a high-end architectural visualization studio.

The overall feeling should be:

Architectural

Premium

Engineered

Spacious

Confident

Modern

Sophisticated

Technical yet elegant

The website should immediately communicate expertise in facade engineering, structural glazing, curtain wall systems, architectural aluminum systems, ACP cladding, skylights, louvers, premium windows, and integrated building envelope solutions.

Technology Stack:

React

TypeScript

Vite

Tailwind CSS

Framer Motion

GSAP

shadcn/ui

Lucide React

Lenis Smooth Scroll

React Intersection Observer

Embla Carousel

React CountUp

React Three Fiber only if lightweight and performance-safe

Design Philosophy:

The entire website should feel like a luxury architectural presentation.

No startup aesthetics.
No SaaS visuals.
No excessive gradients.
No generic glassmorphism.
No stock business website layouts.

Everything must feel intentional and highly refined.

Use:

Massive whitespace

Strong typography hierarchy

Grid-based layouts

Architectural photography

Smooth scroll choreography

Premium hover interactions

Editorial composition

Elegant motion design

Color System:

Background:
#0A0A0A

Surface:
#111111
#161616

Text:
#F5F5F5
#D6D6D6

Accent:
#C9A86A

Use accent color sparingly.

Typography:

Load:

Inter
Barlow

Headings:
Inter

Body:
Barlow

Display Typography:
Font weight 300–500

Large luxury typography.

Avoid bold oversized startup fonts.

Use letter spacing and whitespace carefully.

Navigation:

Create a floating architectural navigation.

Fixed top.

Blurred backdrop.

Thin borders.

Contains:

ABOUT
EXPERTISE
PROJECTS
PROCESS
MATERIALS
CONTACT

Right side CTA:

"Discuss Your Project"

On scroll:

Shrink elegantly

Increase blur

Subtle transparency changes

Hero Section:

Must occupy exactly 100vh.

Video background:

Use this exact video:

https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_144509_89e2d612-8af2-45c3-90f4-4831bc60715d.mp4

Implementation:

Full viewport

Fixed video

object-cover

autoplay

muted

loop

playsInline

Set playback rate to 1.15

Add cinematic dark overlay.

Add subtle animated vignette.

Add GSAP mouse-based parallax.

Video should shift subtly based on cursor position.

Motion must feel expensive and restrained.

Hero Content:

Center aligned.

Massive typography.

Headline:

Engineering the Future of Architectural Facades

Second line:

Precision. Performance. Permanence.

Subheadline:

Integrated facade solutions crafted through design, engineering, fabrication and installation.

Max width:
700px

CTA Group:

Primary:
Explore Projects

Secondary:
Schedule Consultation

Buttons must have premium micro-interactions.

Hover:

Elevation

Soft glow

Motion response

Hero Statistics:

Below CTA show animated metrics:

25+
Years Industry Experience

100+
Projects Delivered

54+
Technical Professionals

Animate using CountUp on viewport entry.

Hero Scroll Cue:

Elegant animated indicator.

Do not use arrows.

Create custom architectural line animation.

Hero Exit Animation:

As user scrolls:

Headline scales slightly.

Video zooms subtly.

Content fades.

Transition feels cinematic.

Section 2:
Architectural Statement

Large editorial section.

Two-column layout.

Left:

Large typography.

"We don't install facades.
We engineer building identities."

Right:

Company introduction.

Use stagger reveal animations.

Section 3:
Expertise Showcase

Full-width grid.

Interactive hover cards.

Products:

Structural Glazing
Curtain Wall Systems
Spider Glazing
ACP Cladding
Premium Window Systems
Skylights & Louvers

Hover behavior:

Image zoom
Text reveal
Accent line animation
Cursor response

Cards should feel like luxury architecture portfolios.

Section 4:
Project Showcase

Most important section.

Create horizontal scrolling experience.

GSAP powered.

Large architectural imagery.

Each project card occupies substantial viewport area.

Show:

Project Name
Location
System Type

Hover reveals:

Project Overview
Materials
Completion Status

Use premium transitions.

Featured projects include:

7 Loudon Street
One 10
PS Aurus
PS Vyom
Siddha Esplanade
Eco Space
The Dominion
69 Park Street

Section 5:
Engineering Process

Create immersive scroll-driven timeline.

Steps:

Survey
Design
Engineering
Fabrication
Assembly
Installation

As user scrolls:

Timeline progresses.

Icons animate.

Content reveals sequentially.

Must feel highly interactive.

Section 6:
Manufacturing Excellence

Dark immersive section.

Show factory capabilities.

Use animated statistics.

Reveal machinery information elegantly.

Include:

Advanced Cutting Systems
Italian Fabrication Equipment
Precision Assembly
Quality Control

Use layered parallax.

Section 7:
Material Partners

Premium logo wall.

Animated grayscale-to-color hover.

Include:

Saint-Gobain
Guardian
Schüco
Technal
Hindalco
Jindal
Hilti

Create luxury brand presentation.

Section 8:
Why KGS

Three-column layout.

Quality Driven
Precision Engineered
End-to-End Delivery

Cards animate individually.

Section 9:
Contact Experience

Do NOT create a simple contact form.

Create a consultation section.

Fields:

Name
Organization
Project Type
Location
Budget Range
Message

Multi-step experience.

Smooth transitions.

Professional feel.

CTA:

Start Your Project Discussion

Footer:

Minimal.

Premium.

Large typography.

Include:

Contact information
Office location
Factory location
Email
Phone

Motion System:

Use Framer Motion throughout.

Use GSAP for:

Scroll timelines

Horizontal sections

Hero parallax

Advanced reveals

Animations must feel:

Smooth

Refined

Architectural

Expensive

Never playful.

Performance Requirements:

90+ Lighthouse score.

Lazy load media.

Use optimized rendering.

No animation jank.

Mobile Experience:

Do not simplify.

Maintain premium feel.

Create responsive architecture rather than removing sections.

The final experience should feel like a premium architectural engineering company capable of handling landmark facade projects across India.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://kgsglazingservices.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4e1bc3a5-be98-4b3d-81f3-105d83e28bfd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
