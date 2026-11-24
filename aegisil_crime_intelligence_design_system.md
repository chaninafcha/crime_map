---
name: "AegisIL Crime Intelligence"
description: "Dark-mode enterprise law enforcement intelligence and analytics design system with Hebrew RTL layout, tonal navy depth, electric accents, and semantic crime severity tokens."
---

## Overview

AegisIL Crime Intelligence is an enterprise-grade command center and tactical analytics platform built for police departments, security analysts, and operational decision makers. The interface projects authority, urgency, and analytical precision through deep charcoal-navy surfaces, subtle tonal layering, and disciplined crimson red, amber-coral, and rose accents. Designed from the ground up for **Hebrew RTL (`dir="rtl"`)**, it balances high-density telemetry with calm, scannable hierarchy.

## Colors

The palette pairs deep charcoal-slate surfaces (`#0C0E14` to `#1E1F26`) with high-legibility cool-white typography (`#E2E2EB`) to eliminate halation in 24/7 command center environments. Crimson red (`primary`), warm amber-orange (`secondary`), and rose-crimson (`tertiary`) anchor interactive controls, data series, and active intelligence states, while semantic severity tokens (`severity-critical`, `severity-high`, `severity-medium`, `severity-low`) are reserved strictly for incident classification and alert states.

```yaml
colors:
  severity-critical: "#EF4444"
  on-severity-critical: "#1C1C1C"
  severity-critical-container: "#450A0A"
  on-severity-critical-container: "#FECACA"
  severity-high: "#F97316"
  on-severity-high: "#0D1322"
  severity-high-container: "#431407"
  on-severity-high-container: "#FED7AA"
  severity-medium: "#EAB308"
  on-severity-medium: "#0D1322"
  severity-medium-container: "#422006"
  on-severity-medium-container: "#FEF08A"
  severity-low: "#22C55E"
  on-severity-low: "#0D1322"
  severity-low-container: "#052E16"
  on-severity-low-container: "#BBF7D0"
  light:
    primary: "#B70011"
    on-primary: "#FFFFFF"
    primary-container: "#DC2626"
    on-primary-container: "#FFF6F5"
    secondary: "#9D4300"
    on-secondary: "#FFFFFF"
    secondary-container: "#FD761A"
    on-secondary-container: "#5C2400"
    tertiary: "#A22E44"
    on-tertiary: "#FFFFFF"
    tertiary-container: "#C3465B"
    on-tertiary-container: "#FFF6F6"
    error: "#BA1A1A"
    on-error: "#FFFFFF"
    error-container: "#FFDAD6"
    on-error-container: "#93000A"
    background: "#FAF8FF"
    on-background: "#191B22"
    surface: "#FAF8FF"
    surface-dim: "#D9D9E2"
    surface-bright: "#FAF8FF"
    surface-container-lowest: "#FFFFFF"
    surface-container-low: "#F3F3FC"
    surface-container: "#EDEDF6"
    surface-container-high: "#E7E7F0"
    surface-container-highest: "#E2E2EB"
    on-surface: "#191B22"
    surface-variant: "#FFDAD6"
    on-surface-variant: "#5C403C"
    outline: "#916F6B"
    outline-variant: "#E6BDB8"
    inverse-surface: "#2E3037"
    inverse-on-surface: "#F0F0F9"
    inverse-primary: "#FFB4AB"
  dark:
    primary: "#FFB4AB"
    on-primary: "#690005"
    primary-container: "#DC2626"
    on-primary-container: "#FFF6F5"
    secondary: "#FFB690"
    on-secondary: "#552100"
    secondary-container: "#EC6A06"
    on-secondary-container: "#421800"
    tertiary: "#FFB2B9"
    on-tertiary: "#67001F"
    tertiary-container: "#C3465B"
    on-tertiary-container: "#FFF6F6"
    error: "#FFB4AB"
    on-error: "#690005"
    error-container: "#93000A"
    on-error-container: "#FFDAD6"
    background: "#111319"
    on-background: "#E2E2EB"
    surface: "#111319"
    surface-dim: "#111319"
    surface-bright: "#373940"
    surface-container-lowest: "#0C0E14"
    surface-container-low: "#191B22"
    surface-container: "#1E1F26"
    surface-container-high: "#282A30"
    surface-container-highest: "#33343B"
    on-surface: "#E2E2EB"
    surface-variant: "#5C403C"
    on-surface-variant: "#E6BDB8"
    outline: "#AC8884"
    outline-variant: "#5C403C"
    inverse-surface: "#E2E2EB"
    inverse-on-surface: "#2E3037"
    inverse-primary: "#BF0715"
```

## Typography

A three-family system built for crisp Hebrew and Latin legibility: **Rubik** for geometric command-center headlines and KPI figures, **Heebo** for dense analytical tables, navigation, and body copy, and **Red Hat Mono** for case IDs, coordinates, timestamps, and telemetry codes. All numeric metrics, timestamps, and table figures use `tabular-nums`.

```yaml
typography:
  display-lg:
    fontFamily: "Rubik"
    fontSize: 36px
    fontWeight: 700
    lineHeight: 44px
    letterSpacing: -0.5px
  display-lg-mobile:
    fontFamily: "Rubik"
    fontSize: 28px
    fontWeight: 700
    lineHeight: 36px
    letterSpacing: -0.25px
  headline-lg:
    fontFamily: "Rubik"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 32px
    letterSpacing: -0.25px
  headline-md:
    fontFamily: "Rubik"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 28px
    letterSpacing: 0px
  title-md:
    fontFamily: "Heebo"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 24px
    letterSpacing: 0px
  body-md:
    fontFamily: "Heebo"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  body-sm:
    fontFamily: "Heebo"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0px
  label-lg:
    fontFamily: "Heebo"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: 0px
  label-sm:
    fontFamily: "Heebo"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: 0.2px
  mono-md:
    fontFamily: "Red Hat Mono"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 18px
    letterSpacing: 0px
  mono-sm:
    fontFamily: "Red Hat Mono"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0px
```

## Layout & Spacing

Desktop-first **12-column fluid grid** optimized for 1440px and 1920px command-center displays, paired with a persistent 260px right-hand RTL navigation sidebar (`<aside>`). On tablet and mobile breakpoints, multi-column grids collapse cleanly to 1–2 columns and the sidebar tucks behind a top-bar drawer toggle. A strict **4px/8px** spacing scale governs all internal card padding and grid gutters.

```yaml
spacing:
  gutter-xs: 4px
  gutter-sm: 8px
  gutter-md: 16px
  gutter-lg: 24px
  gutter-xl: 32px
  section: 40px
  page-margin: 24px
```

## Elevation & Depth

Hierarchy is established through **tonal surface layering** (`surface-container-lowest` `#080E1D` for recessed canvas, `surface-container-low` `#151B2B` for sidebar and cards, `surface-container` `#191F2F` for interactive panels, and `surface-container-high` `#242A3A` for elevated popovers) combined with subtle **1px ghost borders** (`outline-variant` at low opacity) and restrained glassmorphic translucency on floating overlays and live-telemetry headers.

## Shapes

Structured, technical geometry with clean rounded corners (`12px` for primary cards and panels, `8px` for buttons, inputs, and table rows, `9999px` for severity pills and status indicators).

```yaml
rounded:
  sm: 4px
  DEFAULT: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 9999px
```

## Motion & Micro-interaction

Motion is crisp, purposeful, and non-distracting for long-shift analysts. Interactive hover states and filter transitions settle within `120ms`, while drawers and detail panels decelerate smoothly over `220ms`. Nothing loops decoratively; only live incident indicators pulse when signaling an active critical alert.

```yaml
motion:
  state-change:
    duration: 120ms
    delay: 0ms
    timingFunction: ease-out
  surface-enter:
    duration: 220ms
    delay: 0ms
    timingFunction: cubic-bezier(0.2, 0, 0, 1)
  surface-exit:
    duration: 150ms
    delay: 0ms
    timingFunction: cubic-bezier(0.3, 0, 1, 1)
```

## Voice & Content Strategy

- **Language & Direction:** Full **Hebrew RTL (`dir="rtl"`)** with authentic Israeli law enforcement terminology (e.g., `מוקד מבצעי`, `אירועים חריגים`, `מחוז מרכז`, `רמת חומרה`, `ציר זמן מבצעי`).
- **Tone:** Authoritative, concise, and operational—no marketing fluff or filler copy.
- **Formatting:** All timestamps in 24-hour `HH:MM` format, dates in `DD.MM.YYYY`, and case identifiers in monospace (`IL-2026-8841`).
- **Action Labels:** Specific verb-led Hebrew labels (`ייצוא דוח`, `פתיחת תיק`, `עדכון סינון`, `צפייה במפה`).

## Components

Component implementations live as individual HTML sticker sheet files in
`components/`. Each file contains the canonical, styled HTML components with
`<!-- COMPONENT: name -->` comment markers. Read each file before use.

- **Badge** → `@components/badge.html`: `badge-numeric`, `badge-dot`
- **Button** → `@components/button.html`: `button-primary`, `button-icon`, `button-with-icon`
- **Card** → `@components/card.html`: `card-elevated`, `card-action`, `card-interactive`, `card-interactive-2`
- **Searchbar** → `@components/searchbar.html`: `searchbar-standard`, `searchbar-with-suggestions`
- **Table** → `@components/table.html`: `table-standard`, `table-interactive`, `table-selectable`
