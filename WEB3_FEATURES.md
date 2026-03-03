# 🎨 Web3 Design Features

## Design System Overview

This document explains the modern Web3 design implementation in CryptoTracker.

## 🎨 Color Palette

### Primary Colors
```css
Background: #0D0D0D (Deep Black)
Primary: #00FF9D (Neon Green)
Purple Start: #7F00FF
Purple End: #E100FF
```

### Glassmorphism
```css
Card Background: rgba(255, 255, 255, 0.03)
Card Border: rgba(255, 255, 255, 0.1)
Backdrop Blur: 10px
```

### Semantic Colors
```css
Success/Up: #00FF9D (Neon Green)
Error/Down: #EF4444 (Red)
Text Primary: #FFFFFF (White)
Text Secondary: #9CA3AF (Gray)
```

## 🎭 Typography

### Font Families
- **Display**: Space Grotesk (Headers, Titles)
- **Body**: Inter (Content, UI Text)

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

## 🧊 Glassmorphism Cards

### Implementation
```jsx
<div className="glass-card">
  {/* Content */}
</div>
```

### CSS
```css
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.glass-card:hover {
  border-color: rgba(0, 255, 157, 0.3);
  background: rgba(255, 255, 255, 0.05);
}
```

## ✨ Glowing Buttons

### Primary Button
```jsx
<button className="btn-glow">
  Connect Wallet
</button>
```

### CSS
```css
.btn-glow {
  background: #00FF9D;
  color: #000000;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 0 20px rgba(0, 255, 157, 0.3);
  transition: all 0.3s ease;
}

.btn-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(0, 255, 157, 0.5);
}
```

## 🌈 Gradient Text

### Primary Gradient
```jsx
<h1 className="gradient-text">
  Portfolio Dashboard
</h1>
```

### Purple Gradient
```jsx
<h1 className="gradient-text-purple">
  Create Account
</h1>
```

### CSS
```css
.gradient-text {
  background: linear-gradient(135deg, #00FF9D 0%, #00D4FF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text-purple {
  background: linear-gradient(135deg, #7F00FF 0%, #E100FF 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 🎬 Animations

### Framer Motion Variants

#### Fade In Up
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>
```

#### Stagger Children
```jsx
{coins.map((coin, index) => (
  <motion.tr
    key={coin.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    {/* Row content */}
  </motion.tr>
))}
```

#### Button Interactions
```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Click Me
</motion.button>
```

### CSS Animations

#### Pulse Slow
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

#### Float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

#### Spin
```css
.animate-spin {
  animation: spin 1s linear infinite;
}
```

## 📊 Data Visualization

### Sparkline Charts
```jsx
<ResponsiveContainer width="100%" height="100%">
  <LineChart data={sparklineData}>
    <Line
      type="monotone"
      dataKey="price"
      stroke={isPositive ? '#00FF9D' : '#EF4444'}
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
</ResponsiveContainer>
```

### Animated Counters
```jsx
<CountUp
  end={125430.50}
  duration={2}
  decimals={2}
  separator=","
  prefix="$"
/>
```

## 🎯 Loading States

### Skeleton Loader
```jsx
<div className="skeleton h-16 w-full" />
```

### CSS
```css
.skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
}
```

### Spinner
```jsx
<div className="w-16 h-16 border-4 border-web3-primary border-t-transparent rounded-full animate-spin" />
```

## 🎨 Background Effects

### Animated Orbs
```jsx
<div className="absolute inset-0 overflow-hidden">
  <div className="absolute w-96 h-96 bg-web3-primary/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse-slow" />
  <div className="absolute w-96 h-96 bg-web3-purple/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse-slow" />
</div>
```

## 📱 Responsive Design

### Breakpoints
```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

### Grid Layouts
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

## 🎨 Component Examples

### Stat Card
```jsx
<div className="stat-card hover:shadow-glow-green">
  <span className="text-gray-400 text-sm">Total Value</span>
  <div className="text-3xl font-bold">
    $<CountUp end={125430.50} duration={2} decimals={2} />
  </div>
  <div className="price-up">
    ↑ +3.45% 24h
  </div>
</div>
```

### Price Badge
```jsx
<span className={coin.change >= 0 ? 'price-up' : 'price-down'}>
  {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
</span>
```

## 🎭 Theme Consistency

### Always Use
- Glass cards for containers
- Neon green for primary actions
- Purple gradient for secondary elements
- Smooth transitions (300ms)
- Backdrop blur for depth
- Subtle borders for definition

### Avoid
- Harsh shadows
- Bright white backgrounds
- Flat colors without gradients
- Instant state changes
- Heavy borders

## 🚀 Performance Tips

1. **GPU Acceleration**: Use `transform` and `opacity` for animations
2. **Lazy Loading**: Load images and charts on demand
3. **Debounce**: Limit API calls with debouncing
4. **Memoization**: Use React.memo for expensive components
5. **Code Splitting**: Dynamic imports for routes

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Ethers.js](https://docs.ethers.org/)

---

This design system creates a cohesive, modern Web3 experience that feels premium and professional.
