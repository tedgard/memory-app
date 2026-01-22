import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Dashboard from '@/features/dashboard/Dashboard'
import { useProgressStore } from '@/store/useProgressStore'
import { useUserStore } from '@/store/useUserStore'

describe('Dashboard', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useUserStore.getState().resetProfile()
  })

  it('should render dashboard with welcome message', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(screen.getByText('Welcome Back!')).toBeInTheDocument()
    expect(
      screen.getByText(/Ready to boost your working memory/)
    ).toBeInTheDocument()
  })

  it('should display quick stats cards', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(screen.getByText('Total Sessions')).toBeInTheDocument()
    expect(screen.getByText('Training Time')).toBeInTheDocument()
    expect(screen.getByText('Avg Accuracy')).toBeInTheDocument()
    expect(screen.getByText('Current Streak')).toBeInTheDocument()
  })

  it('should display correct stats from store', () => {
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
        <Dashboard />
      </MemoryRouter>
    )

    // Should show 1 session
    const statCards = screen.getAllByText('1')
    expect(statCards.length).toBeGreaterThan(0)

    // Should show accuracy
    expect(screen.getByText(/85%/)).toBeInTheDocument()
  })

  it('should display daily challenge card', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(screen.getByText("Today's Challenge")).toBeInTheDocument()
    expect(
      screen.getByText(/Complete a Dual N-Back session/)
    ).toBeInTheDocument()
  })

  it('should have link to start dual n-back training', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    const startButton = screen.getByRole('link', { name: /Start Training/i })
    expect(startButton).toHaveAttribute('href', '/exercises/dual-nback')
  })

  it('should have link to browse all exercises', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    const browseButton = screen.getByRole('link', {
      name: /Browse All Exercises/i,
    })
    expect(browseButton).toHaveAttribute('href', '/exercises')
  })

  it('should display all 5 training exercises', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(screen.getByText('Training Exercises')).toBeInTheDocument()
    expect(screen.getByText('Dual N-Back')).toBeInTheDocument()
    expect(screen.getByText('Sequence Memory')).toBeInTheDocument()
    expect(screen.getByText('Pattern Recognition')).toBeInTheDocument()
    expect(screen.getByText('Operation Span')).toBeInTheDocument()
    expect(screen.getByText('Spatial Memory Grid')).toBeInTheDocument()
  })

  it('should have links to each exercise', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    const links = screen.getAllByRole('link')
    const exerciseLinks = links.filter((link) =>
      link.getAttribute('href')?.startsWith('/exercises/')
    )
    expect(exerciseLinks.length).toBeGreaterThanOrEqual(5)
  })

  it('should display exercise difficulty levels', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    // Should show "Level X" for each exercise
    const levelTexts = screen.getAllByText(/Level \d+/)
    expect(levelTexts.length).toBe(5)
  })

  it('should show "Most Effective" tag for dual n-back', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(screen.getByText('Most Effective')).toBeInTheDocument()
  })

  it('should format training time correctly', () => {
    const { addSession } = useProgressStore.getState()
    addSession({
      id: `test-${Date.now()}`,
      exerciseType: 'dual-nback',
      score: 100,
      accuracy: 85,
      duration: 300, // 5 minutes in seconds
      difficulty: 2,
      timestamp: new Date(),
      trialsCompleted: 20,
      reactionTime: 500,
    })

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(screen.getByText(/5 min/)).toBeInTheDocument()
  })

  it('should display streak in days', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    )

    expect(screen.getByText(/\d+ days/)).toBeInTheDocument()
  })
})
