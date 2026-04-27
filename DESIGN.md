# Design Brief: FIR Management System

## Purpose
Law enforcement case management system for Mokokchung Police Station. Designed for professional documentation and legal proceedings with institutional authority and modern clarity.

## Tone & Differentiation
Professional, authoritative, trustworthy. High information density with intentional visual hierarchy. Every structural zone explicitly styled — no generic grey backgrounds. Authority through clarity, not decoration.

## Color Palette
| Token | Light OKLCH | Dark OKLCH | Purpose |
|-------|-------------|-----------|---------|
| Primary | 0.42 0.15 258 | 0.68 0.12 258 | Deep slate blue — authority, primary actions |
| Secondary | 0.5 0.08 258 | 0.58 0.1 258 | Muted blue — secondary hierarchy |
| Accent | 0.55 0.2 22 | 0.65 0.18 22 | Warm red — alerts, destructive actions |
| Muted | 0.92 0 0 | 0.25 0 0 | Neutral grey — disabled states, secondary text |
| Destructive | 0.55 0.22 25 | 0.65 0.19 22 | Red alert — delete, cancel |
| Border | 0.88 0 0 | 0.22 0 0 | Visible dividers — transparency in process |

## Typography
- **Display (Headings)**: Lora, serif — refined authority, legal documentation tone
- **Body (Content)**: General Sans, sans-serif — readable, professional, modern
- **Mono (Code/Data)**: Geist Mono, monospace — case numbers, timestamps, technical data

## Structural Zones
| Zone | Treatment | Purpose |
|------|-----------|---------|
| Header | Slate sidebar (--sidebar: 0.96 0.02 258), visible border-bottom, primary text | Navigation anchor, contains logo/title |
| Main Content | Background (0.98 0 0), card layers with border | FIR list, document preview, case details |
| Card Surfaces | White (1.0 0 0), border: 1px --border, shadow-card | Elevated content, distinct from background |
| Inputs | Input background (0.95 0 0), border-input, focus: ring + 2px border | Form fields, searchable lists |
| Footer/Sidebar | Muted background (0.92 0 0), border-top, secondary text | Metadata, timestamps, helper text |

## Spacing & Rhythm
- **Base unit**: 0.25rem (4px)
- **Tight**: 0.5rem (2–4px, between elements)
- **Normal**: 1rem (8–12px, section padding)
- **Spacious**: 1.5rem–2rem (24px+, between major sections)
- **Density**: Cards compress information — list items ~3rem height, headers ~4rem

## Component Patterns
1. **FIR List Item**: Card with left border-primary, flex layout (thumbnail, metadata, status badge, actions)
2. **Summary Block**: `bg-muted/30` background, border-left-4 --primary, copy button (accent color)
3. **Upload Area**: Dashed border, centered icon, descriptive text, primary button on hover
4. **Status Badge**: Rounded-sm background, white text (--primary-foreground), semantic color (primary/accent/destructive)
5. **Action Buttons**: Primary (slate blue bg), Secondary (slate blue outline), Destructive (red), all with focus ring

## Motion
- **Transition default**: `transition-smooth` (0.3s cubic-bezier) for interactive elements
- **Entrance**: Subtle fade + scale for cards loading
- **Hover**: Button background shift, shadow elevation
- **Focus**: 2px ring-primary, ring offset

## Constraints
- Minimal decoration — no gradients, no blur effects, no animations beyond entrance and hover
- All colors drawn from palette — no arbitrary hex or rgb values in component code
- Typography: Lora for emphasis, General Sans for all UI text
- Borders serve clarity, not decoration — every structural zone has intentional border treatment
- Red (accent) used sparingly — only for alerts, destructive actions, status flags

## Signature Detail
**Visible borders and elevated cards**: Unlike flat UI, every card has a 1px border and subtle shadow. This creates visual "elevation" and suggests form transparency — documents are layered, processes are visible, case information is structured and official.
