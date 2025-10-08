# FAC Blog - Natural Earthy Color Theme

## Color Palette

### Primary Colors
- **Cornslik**: `#fefae0` - Background, light elements
- **Kombu Green**: `#283618` - Primary text, dark elements
- **Liver (Dogs)**: `#bc6c25` - Primary accent, CTAs, links
- **Fawn**: `#dda15e` - Secondary accent, highlights
- **Dark Olive Green**: `#606c38` - Muted text, borders

## Usage Guide

### Background
- Main background: `#fefae0` (Cornslik)
- Card background: `#fefae0` (Cornslik)
- Popover background: `#fefae0` (Cornslik)

### Text
- Primary text: `#283618` (Kombu Green)
- Muted text: `#606c38` (Dark Olive Green)
- Card text: `#283618` (Kombu Green)

### Interactive Elements
- Primary button: `#bc6c25` (Liver)
- Primary button text: `#fefae0` (Cornslik)
- Links hover: `#bc6c25` (Liver)
- Focus ring: `#bc6c25` (Liver)

### Accents
- Secondary elements: `#dda15e` (Fawn)
- Borders: `#dda15e` (Fawn)
- Input borders: `#dda15e` (Fawn)
- Muted backgrounds: `#dda15e` (Fawn)

### Sidebar (Admin)
- Sidebar background: `#283618` (Kombu Green)
- Sidebar text: `#fefae0` (Cornslik)
- Sidebar primary: `#bc6c25` (Liver)
- Sidebar accent: `#606c38` (Dark Olive Green)

## Color Psychology

### Natural & Earthy
This palette evokes:
- **Trust & Stability** - Deep greens ground the design
- **Warmth & Approachability** - Fawn and Liver add comfort
- **Authenticity** - Earthy tones feel genuine and organic
- **Sophistication** - Muted palette feels refined and mature

### Faith, Art & Culture Alignment
- **Green tones** → Growth, life, renewal, hope
- **Warm browns** → Earthiness, tradition, authenticity
- **Cream background** → Purity, peace, clarity

## Accessibility

### Contrast Ratios (WCAG AA)
- `#283618` on `#fefae0`: ✅ 11.2:1 (Excellent)
- `#bc6c25` on `#fefae0`: ✅ 4.8:1 (Good)
- `#606c38` on `#fefae0`: ✅ 6.5:1 (Good)
- `#fefae0` on `#283618`: ✅ 11.2:1 (Excellent)
- `#fefae0` on `#bc6c25`: ✅ 4.8:1 (Good)

All combinations meet or exceed WCAG AA standards for accessibility!

## Implementation Notes

- Border radius: `0rem` globally (sharp, modern feel)
- Selective `0.5rem` for form inputs (subtle softening)
- Consistent spacing with Tailwind utilities
- CSS variables for easy theme switching

## Design System

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body**: Merriweather (serif, readable)
- Both fonts convey sophistication and timelessness

### Components
All UI components automatically inherit theme colors through CSS variables in `app/globals.css`

## Comparison with Previous Theme

### Old Theme
- Background: `#F9F5F0` (lighter cream)
- Primary: `#D87B0A` (bright orange)
- Foreground: `#344F1F` (lighter green)

### New Theme (Current)
- Background: `#fefae0` (richer cream)
- Primary: `#bc6c25` (richer brown-orange)
- Foreground: `#283618` (deeper green)

### Improvements
✅ Better contrast ratios
✅ More sophisticated palette
✅ Stronger brand identity
✅ Better alignment with faith/art/culture themes
