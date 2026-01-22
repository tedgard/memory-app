# Test Suite Documentation

This directory contains comprehensive test coverage for the Memory Training App using Vitest and React Testing Library.

## Structure

The test folder follows a Java-style structure, mirroring the `src/` directory:

```
test/
├── setup.ts                    # Test setup and global mocks
├── lib/                        # Utility function tests
│   └── utils.test.ts
├── store/                      # Zustand store tests
│   ├── useUserStore.test.ts
│   ├── useProgressStore.test.ts
│   └── useSettingsStore.test.ts
├── components/                 # Component tests
│   ├── ui/                     # UI component tests
│   │   └── button.test.tsx
│   ├── layout/                 # Layout component tests
│   │   └── Footer.test.tsx
│   ├── gamification/           # Gamification component tests
│   └── charts/                 # Chart component tests
├── features/                   # Feature tests
│   ├── exercises/
│   │   ├── dual-nback/
│   │   ├── sequence-memory/
│   │   │   └── useSequenceMemory.test.ts
│   │   ├── pattern-recognition/
│   │   ├── operation-span/
│   │   └── spatial-memory/
│   ├── dashboard/
│   ├── achievements/
│   ├── progress/
│   ├── education/
│   ├── onboarding/
│   └── settings/
└── data/                       # Data/config tests
    └── achievements.test.ts
```

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (recommended during development)
```bash
npm test
```

### Run Tests Once
```bash
npm run test:run
```

### UI Mode (interactive browser UI)
```bash
npm run test:ui
```

### Coverage Report
```bash
npm run test:coverage
```

This generates reports in:
- **Terminal**: Text summary
- **HTML**: `coverage/index.html` (open in browser for detailed visualization)
- **JSON**: `coverage/coverage-final.json`
- **LCOV**: `coverage/lcov.info` (for CI/CD tools)

## Coverage Targets

The project aims for 80% coverage across all metrics:

- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Statements**: 80%

## Test Categories

### 1. Store Tests (`store/`)

Tests for Zustand state management stores:

**useUserStore.test.ts**
- Profile creation and updates
- XP system and leveling
- Streak tracking (daily, longest)
- Freeze card mechanics
- Profile reset

**useProgressStore.test.ts**
- Session recording
- Exercise-specific stats tracking
- Adaptive difficulty algorithm
- Timeline aggregation
- Improvement rate calculations
- Perfect session tracking

**useSettingsStore.test.ts**
- Sound and volume controls
- Theme switching
- Notification preferences
- Settings persistence and reset

### 2. Utility Tests (`lib/`)

**utils.test.ts**
- Class name merging (`cn` function)
- Tailwind CSS class conflict resolution
- Conditional class handling

### 3. Component Tests (`components/`)

**UI Components (`components/ui/`)**
- Button variants and sizes
- Click handling and disabled states
- Accessibility

**Layout Components (`components/layout/`)**
- Footer rendering
- Version display
- Creator attribution

### 4. Feature Tests (`features/`)

**Exercise Hooks**
- `useSequenceMemory.test.ts`: Game state management, sequence generation, accuracy calculation
- Additional hooks follow similar patterns

**Data/Config**
- `achievements.test.ts`: Achievement definitions, categories, progression structure, checkProgress functions

## Mocking Strategy

### Global Mocks (in `setup.ts`)

1. **Howler.js** (Audio)
   - All audio playback is mocked
   - No actual sound files required for tests

2. **IntersectionObserver**
   - Used by some UI components
   - Mocked for test environment

3. **ResizeObserver**
   - Used by responsive components
   - Mocked for test environment

4. **matchMedia**
   - Used for responsive/theme detection
   - Mocked for test environment

### Local Storage

- Automatically cleared after each test
- Zustand persistence works in tests via mock localStorage

## Writing Tests

### Test File Naming

- Use `.test.ts` for TypeScript files
- Use `.test.tsx` for React components
- Mirror the source file path in `test/`

### Example: Testing a Store

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { useUserStore } from '@/store/useUserStore'

describe('useUserStore', () => {
  beforeEach(() => {
    useUserStore.getState().resetProfile()
  })

  it('should create a profile', () => {
    const { createProfile } = useUserStore.getState()
    createProfile('Test', 'improve-memory', 'beginner')

    const profile = useUserStore.getState().profile
    expect(profile?.name).toBe('Test')
  })
})
```

### Example: Testing a Component

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('should handle clicks', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

### Example: Testing a Hook

```typescript
import { renderHook, act } from '@testing-library/react'
import useSequenceMemory from '@/features/exercises/sequence-memory/useSequenceMemory'

describe('useSequenceMemory', () => {
  it('should start game', () => {
    const { result } = renderHook(() => useSequenceMemory())

    act(() => {
      result.current.startGame()
    })

    expect(result.current.currentPhase).toBe('showing')
  })
})
```

## Best Practices

1. **Isolation**: Each test should be independent
2. **Cleanup**: Use `beforeEach` to reset state
3. **Descriptive**: Test names should clearly state what they test
4. **Arrange-Act-Assert**: Follow AAA pattern
5. **Mock Minimally**: Only mock external dependencies
6. **Test Behavior**: Focus on what users see/do, not implementation

## Coverage Exclusions

The following are excluded from coverage requirements:

- `node_modules/`
- `test/` directory itself
- Type definitions (`*.d.ts`)
- Config files (`*.config.*`)
- Entry point (`main.tsx`)
- Mock data directories

## CI/CD Integration

Coverage reports are generated in CI-friendly formats:
- **LCOV**: For tools like Codecov, Coveralls
- **JSON**: For custom parsing
- **Text**: For terminal output in CI logs

## Troubleshooting

### Tests Timing Out

If tests with timers are timing out, ensure you're using fake timers:

```typescript
vi.useFakeTimers()
// ... test code
vi.useRealTimers()
```

### Component Not Rendering

Ensure you're wrapping components that need routing context:

```typescript
import { BrowserRouter } from 'react-router-dom'

render(
  <BrowserRouter>
    <YourComponent />
  </BrowserRouter>
)
```

### Store State Persisting

Always reset stores in `beforeEach`:

```typescript
beforeEach(() => {
  useUserStore.getState().resetProfile()
  useProgressStore.getState().resetProgress()
})
```

## Contributing

When adding new features:

1. Create corresponding test file in `test/` directory
2. Mirror the source file structure
3. Aim for comprehensive coverage
4. Test edge cases and error conditions
5. Run `npm run test:coverage` before committing
6. Ensure coverage thresholds are met

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library User Events](https://testing-library.com/docs/user-event/intro)
- [Zustand Testing](https://docs.pmnd.rs/zustand/guides/testing)
