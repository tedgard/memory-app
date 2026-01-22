# CLAUDE.MD - AI Assistant Context

## Project Overview

**MemoryApp** is a production-ready React PWA for scientifically-validated cognitive training. Built with React 19, TypeScript 5.9, and Vite 7, it delivers 5 evidence-based working memory exercises with full gamification, analytics, and adaptive difficulty.

**Key Characteristics:**
- Client-side only (no backend, no APIs)
- Privacy-first (all data stored locally via Zustand + localStorage)
- Mobile-first responsive design
- PWA-enabled (installable, offline-capable)
- Neuroscience-themed dark UI with smooth animations

## Tech Stack

### Core
- **React 19** with TypeScript (strict mode)
- **Vite 7** (fast HMR, optimized builds)
- **React Router 7** (client-side navigation)
- **Zustand 5** (state management with persistence)

### UI/Styling
- **Tailwind CSS 3** (utility-first)
- **Shadcn/ui** (accessible components in `src/components/ui/`)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **Recharts** (analytics charts)

### Audio/PWA
- **Howler.js** (audio playback for exercises)
- **vite-plugin-pwa** (PWA manifest, service workers, offline support)

## Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn base components (button, card, dialog, etc.)
│   ├── layout/          # Header, Navigation, Footer
│   ├── gamification/    # Streak, Level, XP display components
│   └── charts/          # Progress visualization components
├── features/
│   ├── exercises/       # All 5 exercises (each has Game + hooks)
│   │   ├── dual-nback/
│   │   ├── sequence-memory/
│   │   ├── pattern-recognition/
│   │   ├── operation-span/
│   │   └── spatial-memory/
│   ├── dashboard/       # Main landing page with stats
│   ├── achievements/    # Achievement display and unlocking
│   ├── progress/        # Analytics and performance charts
│   ├── education/       # Educational articles hub
│   ├── onboarding/      # 3-step user onboarding flow
│   └── settings/        # User preferences
├── store/
│   ├── useUserStore.ts      # User profile, level, streak, XP
│   ├── useProgressStore.ts  # Sessions, stats, adaptive difficulty
│   └── useSettingsStore.ts  # App settings
├── types/               # TypeScript interfaces (exercise, user, achievement, etc.)
├── data/                # Static data (achievements config)
└── lib/                 # Utility functions (cn, formatters)
```

## State Management (Zustand)

### useUserStore
**Purpose:** User identity, gamification data
**Key State:**
- `name`, `onboardingCompleted`
- `level`, `xp` (XP system with levelUp logic)
- `currentStreak`, `longestStreak`, `lastActiveDate`
- Methods: `addXP()`, `incrementStreak()`, `resetStreak()`

### useProgressStore
**Purpose:** Exercise sessions, performance tracking, adaptive difficulty
**Key State:**
- `sessions: Session[]` (all completed sessions with timestamps, scores)
- `exerciseLevels: Record<ExerciseType, number>` (difficulty per exercise)
- `totalSessions`, `averageAccuracy`, `perfectSessions`
- Methods: `addSession()`, `adjustDifficulty()` (auto-adjusts based on accuracy)

### useSettingsStore
**Purpose:** User preferences
**Key State:**
- `soundEnabled`, `notificationsEnabled`
- `theme` (dark/light - currently dark only)
- Persistence via Zustand middleware

## Exercises

### 1. Dual N-Back (`dual-nback/`)
- **Science:** Gold standard for fluid intelligence training (Jaeggi et al., 2008)
- **Mechanics:** Visual (3×3 grid) + Audio (letters A-H), user responds when position/letter matches N steps back
- **Difficulty:** 2-back to 8-back
- **Components:** `DualNBackGame.tsx`, `VisualGrid.tsx`, `useDualNBack.ts`

### 2. Sequence Memory (`sequence-memory/`)
- **Mechanics:** Watch color sequence, tap back in order
- **Difficulty:** 3-15 items
- **Components:** `SequenceMemoryGame.tsx`, `useSequenceMemory.ts`

### 3. Pattern Recognition (`pattern-recognition/`)
- **Mechanics:** Study 4×4 grid (2s), recreate filled cells
- **Components:** `PatternRecognitionGame.tsx`

### 4. Operation Span (`operation-span/`)
- **Mechanics:** Verify equations + remember letters (dual-task)
- **Components:** `OperationSpanGame.tsx`

### 5. Spatial Memory (`spatial-memory/`)
- **Mechanics:** Digital Corsi Block Test (5×5 grid sequence)
- **Components:** `SpatialMemoryGame.tsx`

## Adaptive Difficulty System

**Location:** `useProgressStore.ts` → `adjustDifficulty()`

**Algorithm:**
```typescript
if (accuracy >= 85%) levelUp()    // Too easy
if (accuracy < 60%) levelDown()   // Too hard
// Target: 70-85% accuracy (optimal cognitive load)
```

Auto-adjusts after each session based on performance.

## Gamification

### Achievements (13 total)
**Location:** `src/data/achievements.ts`

**Categories:**
- **Consistency:** First Step, Week Warrior, Monthly Master
- **Mastery:** Quick Learner, Mental Athlete, Cognitive Elite
- **Dedication:** Century Club, Marathon Mind
- **Improvement:** Rising Star, Breakthrough, Peak Performance
- **Perfectionist:** Flawless, Perfect 10

Each has conditions (e.g., streak ≥ 7, sessions ≥ 100, perfect sessions ≥ 10).

### XP & Leveling
- **Base XP per session:** 50 (varies by performance)
- **Level formula:** `Math.floor(xp / 500) + 1`
- Displayed in header with progress bar

### Streaks
- Increments daily on first session
- Resets if >24h gap since last activity
- Tracks current + longest streak

## Routing

**File:** `src/App.tsx`

```typescript
<Routes>
  <Route path="/" element={<Dashboard />} />
  <Route path="/exercises" element={<ExercisesPage />} />
  <Route path="/exercises/:exerciseId" element={<ExerciseRouter />} />
  <Route path="/progress" element={<ProgressPage />} />
  <Route path="/achievements" element={<AchievementsPage />} />
  <Route path="/education" element={<EducationHub />} />
  <Route path="/settings" element={<SettingsPage />} />
</Routes>
```

## Styling Conventions

### Colors (Tailwind)
- **Primary:** `indigo-600` (neural theme)
- **Secondary:** `purple-600`
- **Success:** `green-500` (correct responses)
- **Error:** `red-500` (incorrect responses)
- **Background:** `slate-950` (dark)
- **Surface:** `slate-800` (cards)

### Patterns
- Use `cn()` from `lib/utils.ts` for conditional classes
- Shadcn components use `class-variance-authority` (cva)
- Framer Motion for page transitions, celebrations, hover effects

## Development Guidelines

### Adding a New Exercise
1. Create folder in `src/features/exercises/<exercise-name>/`
2. Create `<ExerciseName>Game.tsx` component
3. Optional: Create `use<ExerciseName>.ts` hook for game logic
4. Add to `ExerciseType` enum in `src/types/exercise.ts`
5. Register in exercises list (used by ExercisesPage)
6. Ensure it calls `addSession()` from `useProgressStore` on completion

### Session Recording
**Always call after exercise completion:**
```typescript
const { addSession } = useProgressStore();

// On exercise end:
addSession({
  exerciseType: 'dual-nback',
  score: calculateScore(),
  accuracy: (correctResponses / totalTrials) * 100,
  duration: elapsedSeconds,
  difficulty: currentLevel
});
```

This triggers:
- XP gain
- Streak update
- Adaptive difficulty adjustment
- Achievement checks

### Adding Achievements
1. Add to `src/data/achievements.ts`
2. Implement `condition` function (receives `user`, `progress` state)
3. Achievement unlocking is automatic on state changes

### TypeScript
- **Strict mode enabled** (no implicit any)
- All types in `src/types/`
- Prefer interfaces over types for object shapes
- Use proper typing for Zustand stores (generic `create<StoreType>()`)

## Testing/QA Notes

### Critical User Flows
1. **Onboarding:** First visit → 3-step flow → Dashboard
2. **Play Exercise:** Exercises page → Select → Complete → See results → Return to dashboard
3. **Gamification:** Check streak, level up, unlock achievements
4. **Progress:** View charts, session history, stats
5. **PWA:** Install, use offline

### Known Bugs/Issues
- Check recent commits for fixes (e.g., sequence memory animation timing, theme reactivity)

## Build & Deploy

```bash
npm run dev      # Dev server on :5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

**Deployment:** Static hosting only (Vercel, Netlify, GitHub Pages, etc.)

## Common Modifications

### Changing Exercise Difficulty Ranges
Edit min/max in exercise game files or in `initialState` of `useProgressStore`.

### Modifying XP Rewards
Edit `addXP()` calls in session recording logic.

### Adjusting Adaptive Difficulty Thresholds
Edit `adjustDifficulty()` in `useProgressStore.ts` (current: 85% up, 60% down).

### Adding Educational Content
Add articles in `src/features/education/EducationHub.tsx` (currently 8 hardcoded articles).

## Privacy & Data

- **No backend, no accounts, no analytics**
- All data persists via localStorage (Zustand persistence middleware)
- No PII collected
- No external network calls (except PWA assets)

## Important Notes for AI Assistants

1. **No over-engineering:** Keep changes minimal and focused. Don't add features unless explicitly requested.
2. **Type safety:** Always maintain strict TypeScript compliance.
3. **State management:** Use Zustand stores for all global state. Don't introduce Redux/Context unless necessary.
4. **Component patterns:** Follow existing patterns (e.g., exercise games have similar structure).
5. **Styling:** Use Tailwind utilities, don't add custom CSS unless required.
6. **Testing before committing:** Always test exercises end-to-end (play → complete → check stats update).

## Recent Changes (from git log)

- Fixed sequence memory game bugs and improved adaptive difficulty
- Fixed animation and flow issues in sequence memory
- Made theme colors properly reactive to light/dark mode
- Added light/dark theme switching functionality
- Updated dashboard to show all 5 exercises as available

## Contact

**Creator:** Edgard N.
**Version:** 1.0.0
**License:** MIT
