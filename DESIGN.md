---
name: Fetch Care Builder
description: A warm, emotionally engaging pet care plan builder where selecting add-ons makes your pet visibly happier.
colors:
  bloom-pink: "#FF4FA3"
  petal-white: "#FFF8FB"
  card-white: "#FFFFFF"
  deep-ink: "#1F1F1F"
  quiet-stone: "#6B7280"
  vitality-green: "#6DDC91"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.01em"
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.bloom-pink}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.full}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "#e8408f"
    textColor: "{colors.card-white}"
  pet-card:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
    padding: "32px"
  pet-card-selected:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
  addon-card:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.md}"
    padding: "16px"
  addon-card-selected:
    backgroundColor: "#FFF0F8"
    textColor: "{colors.bloom-pink}"
    rounded: "{rounded.md}"
---

# Design System: Fetch Care Builder

## 1. Overview

**Creative North Star: "The Companion Care Studio"**

This system lives in the space between a premium wellness brand and a caring product tool. It is warm without being saccharine, playful without being childish, and polished without feeling cold. Every surface should feel like it was considered — not assembled from a component library at speed.

The emotional thesis is direct: selecting more care for your pet should feel rewarding. The interface communicates value through visual state change, not text. When a user toggles an add-on, the pet responds. When the score climbs, the interface brightens. The feedback loop IS the product.

This system explicitly rejects clinical healthcare aesthetics (cold blues, sterile whites, form-first layout), cute/kiddy aesthetics (cartoon fonts, bubble shapes, excessive illustration flourishes), and corporate insurance aesthetics (data-dense grids, small type, muted palettes). It also rejects the purple-gradient SaaS default and the identical-card-grid pattern.

**Key Characteristics:**
- Warm petal-white backgrounds with a soft pink cast — never pure white
- Bloom pink as the single saturated voice; used on focal points only
- Rounded but not bubbly: `24px` radius on major containers, `16px` on cards, `9999px` on buttons
- Motion as feedback: state changes are communicated through the pet's evolution, not toasts or alerts
- Inter across all type roles — hierarchy through weight and size contrast, not font switching
- Flat at rest, lifted on interaction: shadows appear as a response to hover or selection, not decoration

## 2. Colors: The Petal Palette

A single-accent restrained palette built on a warm tinted neutral base.

### Primary
- **Bloom Pink** (`#FF4FA3`): The one saturated voice. Used on the primary CTA, selected add-on borders and backgrounds, the health score fill, and interactive highlights. Appears on no more than 10–15% of any screen at rest. Its scarcity is what makes it land.

### Secondary
- **Vitality Green** (`#6DDC91`): Reserved exclusively for the health/happiness score and success states. Conveys growth and wellness without competing with Bloom Pink. Never used decoratively.

### Neutral
- **Petal White** (`#FFF8FB`): The page background. A barely-there pink tint — warm, not clinical. Never swap for `#fff` or `#f5f5f5`.
- **Card White** (`#FFFFFF`): Card surfaces only. The contrast between card and background creates depth without shadows.
- **Deep Ink** (`#1F1F1F`): Primary text. Slightly warm, not pure black.
- **Quiet Stone** (`#6B7280`): Secondary text, labels, supporting copy. Cool-leaning — provides visual separation from the warm accents.

### Named Rules
**The One Voice Rule.** Bloom Pink is used on ≤15% of any given screen. If two elements are competing for the pink, one of them doesn't deserve it.

**The Tinted-White Rule.** Backgrounds are always tinted toward the brand hue. `#fff` is prohibited as a background color. `#FFF8FB` for the page; `#FFFFFF` for card surfaces only.

## 3. Typography

**Body Font:** Inter (system-ui, -apple-system, sans-serif)

Inter is the only typeface. Hierarchy is achieved through weight contrast (400 → 600 → 700) and scale steps (0.875rem → 1rem → 1.5rem → 2.25rem+). No display typeface, no mono, no script.

**Character:** Clean, generous, legible. The type feels like a well-run wellness brand's app — confident and clear, without the warmth stripped out. Inter's humanist geometry reads as approachable rather than cold.

### Hierarchy
- **Display** (700, clamp(2rem, 5vw, 2.25rem), leading 1.1, tracking -0.02em): Hero headlines and the pet's name on the final screen. Used once per screen.
- **Headline** (600, 1.5rem, leading 1.25): Section labels, step titles ("Choose Your Pet", "Build Your Plan").
- **Body** (400, 1rem, leading 1.6): Add-on descriptions, supporting copy. Max line length 65–70ch.
- **Label** (500, 0.875rem, tracking 0.01em): Add-on card names, badge labels, score annotations.

### Named Rules
**The Weight Contrast Rule.** Adjacent text roles must differ by at least one full weight step (e.g. 400 → 600, not 400 → 500). Flat weight hierarchies feel cheap.

## 4. Elevation

Flat by default. Depth is created through background contrast (petal-white page vs. card-white cards) rather than pervasive shadows. Shadows appear only as state feedback.

### Shadow Vocabulary
- **Resting** (`0 2px 8px rgba(0, 0, 0, 0.06)`): Default card state. Barely visible; creates surface separation without depth drama.
- **Lifted** (`0 4px 20px rgba(0, 0, 0, 0.10)`): Hovered cards and interactive elements. Communicates affordance without animation.
- **Prominent** (`0 8px 40px rgba(0, 0, 0, 0.14)`): Modals or featured containers. Use sparingly.
- **Pink Glow** (`0 8px 32px rgba(255, 79, 163, 0.25)`): Selected state on pet cards and the primary CTA. The only colored shadow — reserved for Bloom Pink focal points.

### Named Rules
**The Flat-By-Default Rule.** Shadows appear in response to state (hover, selection, focus), not as decoration. A card grid with identical box-shadows on every card has failed.

## 5. Components

### Buttons
The primary action surface. Pill-shaped and confident.
- **Shape:** Fully rounded (`border-radius: 9999px`)
- **Primary:** Bloom Pink background (`#FF4FA3`), white text, 14px/32px padding, font-weight 600
- **Hover:** Darkened pink (`#e8408f`), `translateY(-2px)` lift, `transition: all 250ms ease`
- **Focus:** `outline: 3px solid #FF4FA3`, `outline-offset: 3px`
- **Ghost:** Transparent background, Bloom Pink border (1.5px) and text. Used for secondary actions.

### Pet Cards (PetCard)
The centrepiece of the selection screen. Large, tappable, emotionally weighted.
- **Shape:** Gently curved (`border-radius: 24px`)
- **Background:** Card White, 1px border `rgba(0,0,0,0.06)` at rest
- **Resting shadow:** `0 2px 8px rgba(0,0,0,0.06)`
- **Hover:** Lifts to `0 8px 32px rgba(255,79,163,0.15)`, scales to `1.03`, border shifts to `#FF4FA3` at 40% opacity
- **Selected:** Pink Glow shadow, full `#FF4FA3` border (2px), slight scale `1.02`
- **Internal padding:** 32px

### Add-on Cards (AddonCard)
Toggle cards. Checked = pink-tinted; unchecked = neutral.
- **Shape:** Softly curved (`border-radius: 16px`)
- **Unselected:** Card White background, `0 2px 8px rgba(0,0,0,0.06)` shadow, 1px `rgba(0,0,0,0.08)` border
- **Selected:** `#FFF0F8` background (10% Bloom Pink tint), `#FF4FA3` border (1.5px), name text in Bloom Pink
- **Transition:** `background 200ms ease, border-color 200ms ease, box-shadow 200ms ease`
- **Internal padding:** 16px
- **Checkbox/indicator:** Custom pill toggle or checkmark in Bloom Pink

### Health Score (HealthScore)
The gamification anchor. Animated count-up from current to new value on each add-on toggle.
- **Number:** Display scale, 700 weight, Vitality Green (`#6DDC91`)
- **Label:** Label scale, Quiet Stone
- **Animation:** Count-up via requestAnimationFrame over 600ms, ease-out timing
- **Progress bar (optional):** Thin pill bar below the number, Vitality Green fill, Petal White track, `border-radius: 9999px`

### Summary Card (SummaryCard)
The final screen container.
- **Shape:** `border-radius: 24px`
- **Background:** Card White
- **Shadow:** Prominent (`0 8px 40px rgba(0,0,0,0.14)`)
- **Internal padding:** 40px

## 6. Do's and Don'ts

### Do:
- **Do** use Bloom Pink (`#FF4FA3`) on ≤15% of any given screen. Let its scarcity create emphasis.
- **Do** use `#FFF8FB` (Petal White) as the page background — never `#fff` or `#f5f5f5`.
- **Do** animate state changes with `ease-out` curves (`cubic-bezier(0.4, 0, 0.2, 1)`). No bounce, no elastic, no spring overshoot.
- **Do** use `translateY(-2px)` + shadow increase for hover lift on interactive cards. This combo reads as "clickable" across all users.
- **Do** convey depth through background contrast (petal-white vs. card-white) before reaching for shadows.
- **Do** keep Inter's weight jumps at ≥1 full step between adjacent hierarchy levels (400 → 600, 600 → 700).
- **Do** respect `prefers-reduced-motion`: wrap all transitions in a reduced-motion media query that cuts durations to near zero.

### Don't:
- **Don't** use a `border-left` stripe as a colored accent on cards or list items. Rewrite with a full border, a tinted background, or a leading icon.
- **Don't** use gradient text (`background-clip: text`). Bloom Pink is a solid color; gradient text reads as a 2019 startup cliché.
- **Don't** design for insurance, enterprise, or admin dashboard aesthetics — cold blues, sterile whites, data-dense grids, muted palettes, form-first layouts.
- **Don't** design for clinical or veterinary aesthetics — no cold medical blues, no sterile white expanses, no form-shaped information architecture.
- **Don't** design for kiddy or cartoon aesthetics — no bubble fonts, no excessive illustration flourishes, no childish motion (wobbly, bouncy, cartoonish).
- **Don't** use identical card grids where every card has the same shadow, the same size, and the same internal structure. This system has cards, but each card type has a distinct visual identity.
- **Don't** use glassmorphism (frosted blur, translucent panels) as decoration. The system is flat-surfaced and clear.
- **Don't** use pure `#000` or `#fff` as text or background colors. Deep Ink (`#1F1F1F`) and Petal White (`#FFF8FB`) are the floor and ceiling.
