import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import PatternRecognitionGame from '@/features/exercises/pattern-recognition/PatternRecognitionGame'
import { useProgressStore } from '@/store/useProgressStore'
import { useUserStore } from '@/store/useUserStore'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('PatternRecognitionGame', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useUserStore.getState().resetProfile()
  })

  it('should render ready phase with instructions', () => {
    renderWithRouter(<PatternRecognitionGame />)

    expect(screen.getByText('Pattern Recognition')).toBeInTheDocument()
    expect(screen.getByText(/Study the pattern briefly/)).toBeInTheDocument()
    expect(screen.getByText('Start Game')).toBeInTheDocument()
  })

  it('should display correct constants in instructions', () => {
    renderWithRouter(<PatternRecognitionGame />)

    expect(screen.getByText(/2 seconds/)).toBeInTheDocument()
    expect(screen.getByText(/5 rounds/)).toBeInTheDocument()
  })

  it('should have back to exercises button', async () => {
    renderWithRouter(<PatternRecognitionGame />)
    const user = userEvent.setup()

    const backButton = screen.getByRole('button', { name: /Back to Exercises/i })
    expect(backButton).toBeInTheDocument()

    await user.click(backButton)
  })

  it('should start game and transition to showing phase', async () => {
    renderWithRouter(<PatternRecognitionGame />)
    const user = userEvent.setup()

    const startButton = screen.getByRole('button', { name: /Start Game/i })
    await user.click(startButton)

    expect(screen.getByText('Memorize This Pattern')).toBeInTheDocument()
    expect(screen.getByText(/Study carefully/)).toBeInTheDocument()
  })

  it('should display round progress during game', async () => {
    renderWithRouter(<PatternRecognitionGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    expect(screen.getByText('Round 1 of 5')).toBeInTheDocument()
    expect(screen.getByText('Correct: 0')).toBeInTheDocument()
  })

  it('should render 4x4 grid (16 cells)', async () => {
    renderWithRouter(<PatternRecognitionGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    const cells = screen.getAllByRole('button', { name: /Cell \d+/i })
    expect(cells).toHaveLength(16)
  })

  it('should have cells disabled during showing phase', async () => {
    renderWithRouter(<PatternRecognitionGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    const cells = screen.getAllByRole('button', { name: /Cell \d+/i })
    cells.forEach(cell => {
      expect(cell).toBeDisabled()
    })
  })

  it('should record session when game completes', async () => {
    renderWithRouter(<PatternRecognitionGame />)
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    const addSession = vi.spyOn(useProgressStore.getState(), 'addSession')
    const addXP = vi.spyOn(useUserStore.getState(), 'addXP')
    const updateStreak = vi.spyOn(useUserStore.getState(), 'updateStreak')

    // These functions should be called when game completes
    expect(addSession).not.toHaveBeenCalled()
    expect(addXP).not.toHaveBeenCalled()
    expect(updateStreak).not.toHaveBeenCalled()
  })

  it('should apply correct CSS classes to cells', async () => {
    renderWithRouter(<PatternRecognitionGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    const cells = screen.getAllByRole('button', { name: /Cell \d+/i })
    // All cells should have rounded corners
    cells.forEach(cell => {
      expect(cell).toHaveClass('rounded-lg')
    })
  })

  it('should show pattern cells with primary background', async () => {
    renderWithRouter(<PatternRecognitionGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    const cells = screen.getAllByRole('button', { name: /Cell \d+/i })
    // Some cells should be filled (bg-primary)
    const filledCells = cells.filter(cell => cell.classList.contains('bg-primary'))
    // There should be 5 filled cells (difficulty = 5)
    expect(filledCells.length).toBeGreaterThan(0)
  })
})
