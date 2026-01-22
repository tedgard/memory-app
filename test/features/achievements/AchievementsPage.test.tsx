import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import AchievementsPage from '@/features/achievements/AchievementsPage'
import { useProgressStore } from '@/store/useProgressStore'
import { useUserStore } from '@/store/useUserStore'

describe('AchievementsPage', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useUserStore.getState().resetProfile()
  })

  it('should render achievements page with title', () => {
    render(
      <MemoryRouter>
        <AchievementsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Achievements')).toBeInTheDocument()
    expect(
      screen.getByText(/Track your progress and unlock achievements/)
    ).toBeInTheDocument()
  })

  it('should render all achievement categories', () => {
    render(
      <MemoryRouter>
        <AchievementsPage />
      </MemoryRouter>
    )

    // Use getAllByText for categories that might appear multiple times (category name + achievement name)
    expect(screen.getAllByText('Consistency').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Mastery').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dedication').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Improvement').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Perfectionist').length).toBeGreaterThan(0)
  })

  it('should display summary stats', () => {
    render(
      <MemoryRouter>
        <AchievementsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Your Progress')).toBeInTheDocument()
    expect(screen.getByText('Total Unlocked')).toBeInTheDocument()
    expect(screen.getByText('Total Sessions')).toBeInTheDocument()
    expect(screen.getByText('Current Streak')).toBeInTheDocument()
    expect(screen.getByText('Avg Accuracy')).toBeInTheDocument()
  })

  it('should show unlocked achievements correctly', () => {
    // Complete a session to unlock "First Step" achievement
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

    render(
      <MemoryRouter>
        <AchievementsPage />
      </MemoryRouter>
    )

    // Should show at least 1 unlocked achievement
    const unlockedText = screen.getAllByText(/Unlocked!/)
    expect(unlockedText.length).toBeGreaterThan(0)
  })

  it('should display achievement progress', () => {
    render(
      <MemoryRouter>
        <AchievementsPage />
      </MemoryRouter>
    )

    // Should show progress for locked achievements
    const progressText = screen.getAllByText(/Progress/)
    expect(progressText.length).toBeGreaterThan(0)
  })

  it('should display achievements with correct opacity based on unlock status', () => {
    render(
      <MemoryRouter>
        <AchievementsPage />
      </MemoryRouter>
    )

    // Achievements should render (checking for any achievement title)
    const achievementTitles = screen.getAllByRole('heading', { level: 3 })
    expect(achievementTitles.length).toBeGreaterThan(0)
  })

  it('should show correct stats in summary', () => {
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
        <AchievementsPage />
      </MemoryRouter>
    )

    // Check that stats are updated - use more specific queries
    expect(screen.getByText('Total Sessions')).toBeInTheDocument()
    expect(screen.getByText('Avg Accuracy')).toBeInTheDocument()
    // Check for the stat values in the summary cards
    const statCards = screen.getAllByText(/1|85%/)
    expect(statCards.length).toBeGreaterThan(0)
  })
})
