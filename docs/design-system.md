# Propflow Landing Page - Design System

## Color Palette

### Brand Blues (Primary)
| Token      | Hex       | Usage                              |
| ---------- | --------- | ---------------------------------- |
| blue-50    | `#eff6ff` | Hover backgrounds (light mode)     |
| blue-100   | `#dbeafe` | Selection highlight (light mode)   |
| blue-200   | `#bfdbfe` | Borders, subtle fills              |
| blue-300   | `#93c5fd` | Secondary text accents             |
| blue-400   | `#60a5fa` | Dark mode primary, gradient stops  |
| blue-500   | `#3b82f6` | Primary brand color, buttons       |
| blue-600   | `#2563eb` | Light mode gradient, hover states  |
| blue-700   | `#1d4ed8` | Pressed states                     |
| blue-800   | `#1e40af` | Deep accents                       |
| blue-900   | `#1e3a8a` | Dark accents                       |

### Indigo (Accent)
| Token       | Hex       | Usage                  |
| ----------- | --------- | ---------------------- |
| indigo-400  | `#818cf8` | Badge accents          |
| indigo-500  | `#6366f1` | Section badges         |
| indigo-900  | `#312e81` | Dark accent background |

### Zinc (Neutrals)
| Token    | Hex       | Usage                      |
| -------- | --------- | -------------------------- |
| white    | `#ffffff` | Light mode background      |
| zinc-100 | `#f4f4f5` | Light mode card backgrounds|
| zinc-800 | `#27272a` | Dark mode cards            |
| zinc-900 | `#18181b` | Dark mode secondary bg     |
| zinc-950 | `#09090b` | Dark mode primary bg       |

### Semantic Colors
| Purpose     | Light          | Dark             |
| ----------- | -------------- | ---------------- |
| Success     | green-500      | emerald-400      |
| Warning     | amber-500      | yellow-400       |
| Danger      | red-500        | rose-400         |
| Info        | sky-500        | sky-400          |

## Typography

### Font
- **Family:** Plus Jakarta Sans
- **Source:** Google Fonts CDN
- **Fallback:** system sans-serif

### Scale (Tailwind classes used)
| Element               | Class                            |
| --------------------- | -------------------------------- |
| Hero headline         | `text-5xl md:text-7xl font-bold` |
| Section headline      | `text-3xl md:text-5xl font-bold` |
| Section subheadline   | `text-lg md:text-xl`             |
| Body text             | `text-base` (16px)               |
| Small / caption       | `text-sm` (14px)                 |
| Tiny / badge          | `text-xs` (12px)                 |

### Text Gradient
Animated gradient text used on hero headline and key phrases:
- **Light:** `#2563eb` -> `#0ea5e9` -> `#2563eb`
- **Dark:** `#60a5fa` -> `#38bdf8` -> `#60a5fa`
- Animation: `background-position` slide, 4s linear infinite
- Class: `.text-gradient` (defined in `index.html` `<style>`)

## Spacing & Layout

### Container
- `max-w-7xl mx-auto px-6` (standard section wrapper)
- Some sections use `max-w-6xl` or `max-w-5xl` for narrower content

### Section Padding
- Standard: `py-24 md:py-32`
- Compact: `py-16 md:py-24`

### Grid Patterns
| Pattern              | Tailwind                                      |
| -------------------- | --------------------------------------------- |
| 3-column features    | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` |
| 2-column split       | `grid grid-cols-1 lg:grid-cols-2 gap-12`      |
| 4-column footer      | `grid grid-cols-2 md:grid-cols-4 gap-8`       |

## Component Patterns

### Glassmorphism (GlassPanel)
```
Light: bg-white/70 backdrop-blur-xl border-black/5 shadow
Dark:  bg-zinc-900/60 backdrop-blur-xl border-blue-500/10 shadow
```

### Section Badge (SectionBadge)
Small colored pill above section headlines:
```
Light: bg-{color}-50 border-{color}-200 text-{color}-600
Dark:  bg-{color}-500/10 border-{color}-500/20 text-{color}-400
```
Colors: blue, indigo, zinc, violet

### Buttons
| Variant   | Light                                      | Dark                                        |
| --------- | ------------------------------------------ | ------------------------------------------- |
| primary   | `bg-blue-600 text-white shadow-blue-500/25`| `bg-blue-500 shadow-blue-500/25`            |
| secondary | `bg-white border-zinc-200 text-zinc-900`   | `bg-zinc-800 border-zinc-700 text-white`    |
| outline   | `border-zinc-300 text-zinc-700`            | `border-zinc-600 text-zinc-300`             |
| ghost     | `text-zinc-600 hover:bg-zinc-100`          | `text-zinc-400 hover:bg-zinc-800`           |

## Animations

### CSS Keyframes (defined in `index.html`)
| Name        | Duration | Easing                    | Effect                         |
| ----------- | -------- | ------------------------- | ------------------------------ |
| fade-in     | 0.5s     | ease-out                  | Opacity 0 -> 1                 |
| slide-up    | 0.5s     | ease-out                  | translateY(20px) + fade        |
| blob        | 7s       | default (infinite)        | Floating organic movement      |
| pulse-glow  | 2s       | cubic-bezier(0.4,0,0.6,1)| Opacity pulse                  |
| scan        | 4s       | linear (infinite)         | Vertical scan line             |
| gradient    | 4s       | linear (infinite)         | Background position slide      |

### Framer Motion Patterns
- **Scroll reveal:** `whileInView={{ opacity: 1, y: 0 }}` with `initial={{ opacity: 0, y: 20 }}`
- **Stagger children:** `transition={{ staggerChildren: 0.1 }}`
- **Hover lift:** `whileHover={{ y: -4, scale: 1.02 }}`
- **Standard duration:** 0.3s - 0.8s, ease-out

## Responsive Breakpoints

Using Tailwind defaults:
| Breakpoint | Width  | Usage                         |
| ---------- | ------ | ----------------------------- |
| (base)     | 0px    | Mobile-first styles           |
| sm         | 640px  | Minor adjustments             |
| md         | 768px  | Tablet: 2-column grids, larger text |
| lg         | 1024px | Desktop: 3-column grids, full nav   |

## Dark Mode

- **Mechanism:** Class-based (`html.dark`) via Tailwind `darkMode: 'class'`
- **Toggle:** ThemeContext + ThemeToggle component
- **Persistence:** `localStorage.theme`
- **Default:** Dark mode (set in HTML `<html class="dark">`)
- **Transition:** 0.3s ease on `background-color` and `color`

## External Assets

### Images
- **Property photos:** Unsplash URLs with `auto=format&fit=crop` params
- **Avatars:** `https://i.pravatar.cc/150?img={n}`
- **Integration logos:** Inline SVG or `svgl.app` CDN URLs
- **No local image files exist** - all images are remote

### Icons
- **Library:** Lucide React (0.469.0)
- **Usage:** Inline SVG components, tree-shaken
- **Common icons:** Building2, Users, Calendar, BarChart3, Zap, Shield, Globe, etc.
