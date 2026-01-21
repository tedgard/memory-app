# 🧠 MemoryApp - Working Memory Training Application

A React-based progressive web app designed to dramatically improve working memory and fluid intelligence through scientifically-validated cognitive exercises.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6+-646CFF?logo=vite)

## 🎯 Overview

MemoryApp helps users experience measurable gains in their ability to handle complex tasks and discussions through daily cognitive training. The app features the scientifically-proven **Dual N-Back** exercise as its core training method, along with complementary memory exercises.

### Key Features

- ✨ **Scientifically-Backed Training**: Focuses on dual N-back tasks with proven transfer effects to fluid intelligence
- 🎮 **Gamification System**: Streaks, achievements, XP, and leveling to maintain motivation
- 📊 **Progress Analytics**: Track your improvement with detailed statistics and charts
- 🎨 **Beautiful UI**: Modern, dark-themed interface optimized for focus
- 📱 **PWA Support**: Install on mobile/desktop and train offline
- 🧮 **Adaptive Difficulty**: Automatically adjusts to your performance level
- 🧪 **Multiple Exercises**: Various working memory training modes (more coming soon)
- 🎓 **Educational Content**: Learn the neuroscience behind the training

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:5173` to start training!

## 🎮 How to Use

### First Time Setup

1. **Onboarding**: Create your profile and select your training goal
2. **Choose Experience Level**: Beginner, Intermediate, or Advanced
3. **Start Training**: Begin with the Dual N-Back exercise

### Daily Training

1. **Dashboard**: View your stats, current streak, and daily challenge
2. **Train**: Complete exercises to maintain your streak and earn XP
3. **Track Progress**: Monitor improvements in the Progress page
4. **Learn**: Read educational modules about working memory

### The Dual N-Back Exercise

The core exercise that has the most scientific backing for improving working memory:

- **Visual Component**: Remember positions on a 3×3 grid
- **Audio Component**: Remember letter sequences (A-H)
- **N-Back Level**: Difficulty ranges from 1-back to 8-back
- **Adaptive**: Difficulty automatically adjusts based on your performance

**How to Play:**
1. Watch the grid and listen to the letters
2. Press "Visual Match" when the current position matches N steps back
3. Press "Audio Match" when the current letter matches N steps back
4. Both can match simultaneously!

## 🏗️ Tech Stack

### Frontend
- **React 18+** with TypeScript
- **Vite** for fast development and optimized builds
- **React Router v7** for navigation
- **Tailwind CSS** for styling
- **Shadcn/ui** for accessible UI components
- **Framer Motion** for smooth animations

### State Management
- **Zustand** for global state
- **LocalStorage** for data persistence

### Features
- **PWA** with offline support
- **Responsive Design** for all screen sizes
- **Dark Mode** optimized interface

## 📁 Project Structure

```
memory-app/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Shadcn components
│   │   ├── layout/       # Header, Navigation, etc.
│   │   ├── gamification/ # Streak, Level, Achievements
│   │   └── charts/       # Progress visualizations
│   ├── features/         # Feature-based modules
│   │   ├── exercises/    # All exercise types
│   │   │   ├── dual-nback/
│   │   │   ├── sequence-memory/
│   │   │   └── ...
│   │   ├── dashboard/    # Main dashboard
│   │   ├── progress/     # Analytics and stats
│   │   ├── education/    # Learning modules
│   │   ├── onboarding/   # First-time user flow
│   │   └── settings/     # User preferences
│   ├── store/            # Zustand state management
│   │   ├── useUserStore.ts
│   │   ├── useProgressStore.ts
│   │   └── useSettingsStore.ts
│   ├── types/            # TypeScript definitions
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   └── constants/        # App constants
├── public/               # Static assets
│   ├── icons/           # PWA icons
│   └── sounds/          # Audio feedback
└── ...config files
```

## 🧪 Current Features

### ✅ Implemented
- [x] Complete Onboarding Flow
- [x] User Profile Management
- [x] Dual N-Back Exercise (Full Implementation)
- [x] Adaptive Difficulty System
- [x] Progress Tracking & Analytics
- [x] Streak System with Milestones
- [x] XP & Leveling System
- [x] Achievement Framework (Ready)
- [x] Dark Theme UI
- [x] PWA Configuration
- [x] Settings Management
- [x] Responsive Design

### 🚧 Coming Soon
- [ ] Additional Exercises
  - [ ] Sequence Memory
  - [ ] Pattern Recognition
  - [ ] Operation Span
  - [ ] Spatial Memory
- [ ] Educational Content (6 Modules)
- [ ] Daily Training Routines
- [ ] Achievement Unlocks & Animations
- [ ] Progress Charts & Visualizations
- [ ] Sound Effects Integration
- [ ] Custom Routine Builder
- [ ] Data Export/Import

## 🧠 The Science Behind It

### Why Dual N-Back?

Based on 2025-2026 cognitive neuroscience research, **dual N-back training** demonstrates:

- ✅ **Most Effective**: Superior transfer effects compared to other working memory training methods
- ✅ **Proven Results**: Increases in frontal alpha power and neural efficiency
- ✅ **Fluid Intelligence**: Documented improvements in problem-solving and reasoning
- ✅ **Sustained Benefits**: Effects persist with consistent training (4+ weeks)

### Training Recommendations

- **Frequency**: 5 days per week minimum
- **Duration**: 15-25 minutes per session
- **Consistency**: Daily training yields best results
- **Target**: Aim for 85%+ accuracy before increasing difficulty

## 🎨 Design Philosophy

1. **Science-First**: Every exercise backed by peer-reviewed research
2. **Minimal Friction**: Distraction-free UI during training
3. **Immediate Feedback**: Clear visual/audio confirmation
4. **Progressive Challenge**: Adaptive difficulty maintains optimal cognitive load
5. **Motivational**: Visible progress, celebrations, achievements
6. **Personal & Private**: No social features or data sharing

## ⚙️ Configuration

### PWA Settings

The app is configured as a PWA in `vite.config.ts`. To customize:

- **Theme colors**: Edit `manifest` section
- **Cache strategy**: Modify `workbox` configuration
- **Offline support**: Adjust `includeAssets` and `globPatterns`

### Tailwind Theme

Custom colors defined in `tailwind.config.js`:

```js
colors: {
  primary: '#6366f1',      // Indigo - focus/brain
  secondary: '#8b5cf6',    // Purple - creativity/learning
  success: '#10b981',      // Green - correct response
  error: '#ef4444',        // Red - incorrect response
  warning: '#f59e0b',      // Amber - attention
  background: '#0f172a',   // Dark slate
  surface: '#1e293b',      // Slate - cards
}
```

## 📈 Roadmap

### Phase 1: Foundation ✅
- Core infrastructure and Dual N-Back exercise

### Phase 2: Additional Exercises 🔜
- Implement remaining 4 exercise types
- Exercise variety and progression

### Phase 3: Gamification Enhancement 🔜
- Achievement unlocks and animations
- Advanced progress visualizations
- Routine builder

### Phase 4: Educational Content 🔜
- 6 comprehensive modules on neuroscience
- Interactive learning experience

### Phase 5: Polish & Optimization 🔜
- Sound effects and haptics
- Performance optimizations
- Accessibility enhancements

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to open issues or submit PRs.

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Research on dual N-back training from cognitive neuroscience literature
- Shadcn/ui for beautiful accessible components
- The React and Vite communities

## 📞 Support

For questions or issues, please open a GitHub issue.

---

**Start your cognitive enhancement journey today!** 🧠✨

Remember: Consistency is key. Train daily for 15-20 minutes and watch your working memory improve!
