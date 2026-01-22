import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProgressPage from '@/features/progress/ProgressPage'
import { useProgressStore } from '@/store/useProgressStore'

describe('ProgressPage', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  it('should render progress page with title', () => {
    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Your Progress')).toBeInTheDocument()
  })

  it('should display stats cards', () => {
    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Total Sessions')).toBeInTheDocument()
    expect(screen.getByText('Total Training Time')).toBeInTheDocument()
    expect(screen.getByText('Average Accuracy')).toBeInTheDocument()
  })

  it('should show zero stats when no sessions', () => {
    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    // Should show 0 sessions
    expect(screen.getByText('0')).toBeInTheDocument()
    // Should show 0 minutes
    expect(screen.getByText(/0 minutes/)).toBeInTheDocument()
    // Should show 0% accuracy
    expect(screen.getByText(/0%/)).toBeInTheDocument()
  })

  it('should display recent sessions header', () => {
    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Recent Sessions')).toBeInTheDocument()
  })

  it('should show message when no sessions completed', () => {
    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    expect(
      screen.getByText('No sessions yet. Start training to see your progress!')
    ).toBeInTheDocument()
  })

  it('should display recent sessions after completing exercises', () => {
    const { addSession } = useProgressStore.getState()
    addSession({
      id: `test-${Date.now()}`,
      exerciseType: 'dual-nback',
      score: 100,
      accuracy: 85,
      duration: 300,
      difficulty: 2,
      timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
    })

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/dual nback/i)).toBeInTheDocument()
    expect(screen.getByText(/85% accuracy/)).toBeInTheDocument()
  })

  it('should show correct total sessions count', () => {
    const { addSession } = useProgressStore.getState()
    addSession({
      id: `test-${Date.now()}`,
      exerciseType: 'dual-nback',
      score: 100,
      accuracy: 85,
      duration: 300,
      difficulty: 2,
      timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
    })
    addSession({
      id: `test-${Date.now()}`,
      exerciseType: 'sequence-memory',
      score: 90,
      accuracy: 80,
      duration: 240,
      difficulty: 4,
      timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
    })

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('should format training time in minutes', () => {
    const { addSession } = useProgressStore.getState()
    addSession({
      id: `test-${Date.now()}`,
      exerciseType: 'dual-nback',
      score: 100,
      accuracy: 85,
      duration: 300, // 5 minutes
      difficulty: 2,
      timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
    })

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/5 minutes/)).toBeInTheDocument()
  })

  it('should display average accuracy rounded', () => {
    const { addSession } = useProgressStore.getState()
    addSession({
      id: `test-${Date.now()}`,
      exerciseType: 'dual-nback',
      score: 100,
      accuracy: 85.7,
      duration: 300,
      difficulty: 2,
      timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
    })

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    // Should show 86% (rounded from 85.7) - use getAllByText since it appears in multiple places
    const accuracyTexts = screen.getAllByText(/86%/)
    expect(accuracyTexts.length).toBeGreaterThan(0)
  })

  it('should display session timestamp', () => {
    const { addSession } = useProgressStore.getState()
    addSession({
      id: `test-${Date.now()}`,
      exerciseType: 'dual-nback',
      score: 100,
      accuracy: 85,
      duration: 300,
      difficulty: 2,
      timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
    })

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    // Should show date and time (format will vary by locale)
    const sessionCards = screen.getAllByText(/at/)
    expect(sessionCards.length).toBeGreaterThan(0)
  })

  it('should display session score', () => {
    const { addSession } = useProgressStore.getState()
    addSession({
      id: `test-${Date.now()}`,
      exerciseType: 'dual-nback',
      score: 150,
      accuracy: 85,
      duration: 300,
      difficulty: 2,
      timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
    })

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    expect(screen.getByText('150')).toBeInTheDocument()
  })

  it('should show only the 5 most recent sessions', () => {
    const { addSession } = useProgressStore.getState()

    // Add 7 sessions
    for (let i = 0; i < 7; i++) {
      addSession({
      id: `test-${Date.now()}`,
        exerciseType: 'dual-nback',
        score: 100 + i,
        accuracy: 80,
        duration: 300,
        difficulty: 2,
        timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
      })
    }

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    // Should show only 5 sessions
    const sessionCards = screen.getAllByText(/dual nback/i)
    expect(sessionCards.length).toBe(5)
  })

  it('should display sessions in reverse chronological order', () => {
    const { addSession } = useProgressStore.getState()

    addSession({
      id: `test-${Date.now()}`,
      exerciseType: 'dual-nback',
      score: 100,
      accuracy: 80,
      duration: 300,
      difficulty: 2,
      timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
    })
    addSession({
      id: `test-${Date.now()}`,
      exerciseType: 'sequence-memory',
      score: 200,
      accuracy: 90,
      duration: 300,
      difficulty: 4,
      timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
    })

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    // Most recent (sequence-memory) should appear first
    const exerciseNames = screen.getAllByText(/dual nback|sequence memory/i)
    expect(exerciseNames[0].textContent).toMatch(/sequence memory/i)
  })

  it('should format exercise type with proper spacing', () => {
    const { addSession } = useProgressStore.getState()
    addSession({
      id: `test-${Date.now()}`,
      exerciseType: 'dual-nback',
      score: 100,
      accuracy: 85,
      duration: 300,
      difficulty: 2,
      timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
    })

    render(
      <MemoryRouter>
        <ProgressPage />
      </MemoryRouter>
    )

    // Should replace hyphen with space
    expect(screen.getByText(/dual nback/i)).toBeInTheDocument()
  })
})
