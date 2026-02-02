# 🎨 Hero Section Design - Visual Guide

## Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      ULTRA PREMIUM HERO                         │
│  ┌─────────────────────────────────────┐  ┌──────────────────┐ │
│  │                                     │  │ 🔥 HOT TRENDS   │ │
│  │     FEATURED ARTICLE CARD           │  │ ────────────────│ │
│  │  ┌───────────────────────────────┐  │  │                  │ │
│  │  │                               │  │  │ ┌──────────────┐ │ │
│  │  │     [FEATURED IMAGE]          │  │  │ │ 1. [IMG]   │ │ │
│  │  │     (1.8fr width)             │  │  │ │ Trending   │ │ │
│  │  │   TRENDING #1 [CAT]           │  │  │ │ Title...   │ │ │
│  │  │                               │  │  │ │ 2h ago     │ │ │
│  │  └───────────────────────────────┘  │  │ └──────────────┘ │ │
│  │                                     │  │                  │ │
│  │  ⏱️ 5 min read | Today              │  │ ┌──────────────┐ │ │
│  │                                     │  │ │ 2. [IMG]   │ │ │
│  │  "Amazing Article Title That        │  │ │ Category   │ │ │
│  │   Captures Your Attention"          │  │ │ Title...   │ │ │
│  │                                     │  │ │ 3h ago     │ │ │
│  │  Excerpt text here describing       │  │ └──────────────┘ │ │
│  │  the article and enticing readers   │  │                  │ │
│  │  to click and read more...          │  │ ┌──────────────┐ │ │
│  │                                     │  │ │ 3. [IMG]   │ │ │
│  │  [AVATAR] TrendSnap Editor          │  │ │ Breaking   │ │ │
│  │           Top News                  │  │ │ Title...   │ │ │
│  │  [READ FULL STORY →]                │  │ │ 1h ago     │ │ │
│  │                                     │  │ └──────────────┘ │ │
│  └─────────────────────────────────────┘  │                  │ │
│                                            │ ┌──────────────┐ │ │
│                                            │ │ 4. [IMG]   │ │ │
│                                            │ │ Updates    │ │ │
│                                            │ │ Title...   │ │ │
│                                            │ │ 4h ago     │ │ │
│                                            │ └──────────────┘ │ │
│                                            │                  │ │
│                                            │ ⚠️ BREAKING      │ │
│                                            │ Get latest news  │ │
│                                            │ directly to feed │ │
│                                            │                  │ │
│                                            └──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Color Scheme

```
Primary Gradient:
┌─────────────────────────────────────┐
│  #667eea (Blue)  →  #764ba2 (Purple) │
│  Used for: Cards, buttons, badges   │
└─────────────────────────────────────┘

Accent Colors:
┌──────────────────────────────────────┐
│ 🔴 #ff6b6b (Red) - Breaking Alert     │
│ ⚪ #ffffff (White) - Cards & Text     │
│ ⚫ #0f172a (Dark) - Headings          │
│ 🔘 #9ca3af (Gray) - Secondary Text    │
└──────────────────────────────────────┘

Shadows & Depth:
- Featured Card: Deep shadow (20px blur, 12% opacity)
- Hover State: Deeper shadow (40px blur, 20% opacity)
- Trending Cards: Subtle shadow (4px blur, 8% opacity)
- Breaking Alert: Red glow (24px blur, red tint)
```

## Typography Hierarchy

```
FEATURED ARTICLE:
Title:   38px | Bold 800 | Line-height 1.2
Excerpt: 16px | Regular  | Color: #4b5563
Meta:    13px | Bold 700 | Color: #667eea

TRENDING CARDS:
Title:   14px | Bold 700 | 2-line clamp
Category:11px | Bold 700 | Color: #667eea (uppercase)
Time:    11px | Regular  | Color: #9ca3af

BADGE TEXT:
Trending: 12px | Bold 800 | UPPERCASE | Color: white
Category: 12px | Bold 700 | UPPERCASE | Color: #667eea
```

## Spacing Diagram

```
SECTION PADDING:
┌──────────────────────────────────────────────┐
│ 50px (top/bottom) | 6% (left/right)         │
│                                              │
│  HERO CONTAINER:                            │
│  ┌────────────────────────────────────────┐ │
│  │ Grid Gap: 40px between cards           │ │
│  │ Column 1: 1.8fr (Featured)             │ │
│  │ Column 2: 1fr (Trending)               │ │
│  │                                        │ │
│  │ FEATURED CARD PADDING:                 │ │
│  │ ┌────────────────────────────────────┐ │ │
│  │ │ 40px all sides (content area)      │ │ │
│  │ │ Internal gap: 20px-28px            │ │ │
│  │ └────────────────────────────────────┘ │ │
│  │                                        │ │
│  │ TRENDING CARDS PADDING:                │ │
│  │ ┌────────────────────────────────────┐ │ │
│  │ │ 12-20px internal padding           │ │ │
│  │ │ 16px gap between cards             │ │ │
│  │ └────────────────────────────────────┘ │ │
│  └────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

## Responsive Behavior

### DESKTOP (1200px+)
```
┌──────────────────────────────┐
│   FEATURED (1.8fr)  TRENDING  │
│   [Large Image]     [4 Cards] │
│   [Full Content]    [Alert]   │
│   [CTA Button]               │
└──────────────────────────────┘
- Featured Image: 380px height
- Trending Cards: 120px height
- Full excerpt visible
```

### TABLET (768px - 1199px)
```
┌──────────────────────────────┐
│   FEATURED (Full Width)      │
│   [Medium Image]             │
│   [Content]                  │
│   [CTA Button]               │
├──────────────────────────────┤
│   TRENDING SIDEBAR           │
│   [4 Cards - smaller]        │
│   [Alert]                    │
└──────────────────────────────┘
- Featured Image: 320px height
- Trending Cards: 110px height
- Stacked layout
```

### MOBILE (< 768px)
```
┌──────────────────┐
│   FEATURED       │
│   [Small Image]  │
│   [Title Only]   │
│   [Meta Info]    │
│   [CTA Button]   │
├──────────────────┤
│ TRENDING         │
│ [Card 1]         │
│ [Card 2]         │
│ [Card 3]         │
│ [Card 4]         │
│ [Alert]          │
└──────────────────┘
- Featured Image: 200px height (extra small)
- Trending Cards: 90px height
- No excerpt shown
- Single column only
```

## Interactive States

### FEATURED CARD HOVER
```
Before:  Box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12)
         Transform: translateY(0)
         
After:   Box-shadow: 0 40px 100px rgba(0, 0, 0, 0.2) ← Deeper shadow
         Transform: translateY(-12px) ← Lifts up
         Image scale: 1.08x ← Image zooms
```

### TRENDING CARD HOVER
```
Before:  Box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08)
         Border-left: 5px solid #e5e7eb
         
After:   Box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) ← Enhanced shadow
         Border-left: 5px solid #667eea ← Color change
         Transform: translateX(8px) ← Slides right
         Image scale: 1.1x ← Image zooms
```

### BUTTON HOVER
```
Before:  Box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3)
         Transform: translateY(0)
         
After:   Box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5) ← Glowing
         Transform: translateY(-2px) ← Slight lift
```

### BADGE ANIMATION
```
Pulsing Badge: Opacity 1 → 0.5 → 1 (continuous)
Animation: 2s cycle
Effect: Creates "live" feeling for trending badge
```

## Animation Timeline

```
Page Load:
0s    → Featured card fades in and scales
0.1s  → Sidebar appears with stagger
0.2s  → First trending card slides in
0.3s  → Second trending card slides in
0.4s  → Third trending card slides in
0.5s  → Fourth trending card slides in
0.6s  → Breaking alert fades in

During Interaction:
Hover → Card lifts (0.4s transition)
Hover → Image zooms (0.6s transition)
Click → Button pop (0.3s transition)

Continuous:
Badge pulse (2s infinite)
Alert dot pulse (1.5s infinite)
```

## Component Breakdown

### 1. FEATURED HERO CARD
- Width: 1.8fr of grid
- Components:
  - Image wrapper (380px desktop)
  - Gradient overlay
  - Badge group (Trending + Category)
  - Content section
  - Meta top (reading time, timestamp)
  - Title (38px)
  - Excerpt (16px)
  - Author section
  - CTA button

### 2. TRENDING SIDEBAR
- Width: 1fr of grid
- Components:
  - Header with divider
  - 4 Numbered cards
    - Number badge
    - Image
    - Content (category, title, time)
  - Breaking alert box

### 3. BADGE SYSTEM
- Trending Badge: Red gradient + pulse
- Category Badge: White with purple text
- Number Badge: Gradient background + large number

### 4. BREAKING ALERT
- Background: Red gradient
- Elements:
  - Pulsing dot (white)
  - Heading (Uppercase, Bold)
  - Description text

## Key Features

✨ **Visual Features**:
- Premium gradients on all primary elements
- Smooth hover animations
- Numbered trending cards for clarity
- Large, readable typography
- Excellent color contrast

⚡ **Performance**:
- CSS-only animations (no JS required)
- GPU-accelerated transforms
- Lazy loading support
- Minimal file size

📱 **Responsive**:
- 4 breakpoints (480px, 768px, 1200px, desktop)
- Touch-friendly sizes
- Readable at all sizes
- Proper spacing on all devices

♿ **Accessibility**:
- Semantic HTML
- Proper heading hierarchy
- Color contrast compliance
- WCAG 2.1 AA ready

---

**Overall Design Feel**: Ultra-premium, modern, engaging, and visually stunning ✨
