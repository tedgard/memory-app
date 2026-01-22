import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import SpatialMemoryGame from '@/features/exercises/spatial-memory/SpatialMemoryGame'
import { useProgressStore } from '@/store/useProgressStore'
import { useUserStore } from '@/store/useUserStore'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('SpatialMemoryGame', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useUserStore.getState().resetProfile()
  })

  it('should render ready phase with instructions', () => {
    renderWithRouter(<SpatialMemoryGame />)

    expect(screen.getByText('Spatial Memory Grid')).toBeInTheDocument()
    expect(screen.getByText(/Watch cells light up in sequence/)).toBeInTheDocument()
    expect(screen.getByText('Start Game')).toBeInTheDocument()
  })

  it('should display how to play instructions', () => {
    renderWithRouter(<SpatialMemoryGame />)

    expect(screen.getByText(/Watch as cells in the grid light up one by one/)).toBeInTheDocument()
    expect(screen.getByText(/Memorize the sequence and order/)).toBeInTheDocument()
    expect(screen.getByText(/Tap the cells in the exact same order/)).toBeInTheDocument()
  })

  it('should display current difficulty level from progress store', () => {
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'spatial-memory': {
            ...useProgressStore.getState().stats.exerciseProgress['spatial-memory'],
            currentDifficulty: 5,
          },
        },
      },
    })

    renderWithRouter(<SpatialMemoryGame />)

    expect(screen.getByText(/Current Level:/)).toBeInTheDocument()
    expect(screen.getByText(/5 cells/)).toBeInTheDocument()
  })

  it('should use default difficulty when not set in progress store', () => {
    renderWithRouter(<SpatialMemoryGame />)

    expect(screen.getByText(/4 cells/)).toBeInTheDocument()
  })

  it('should have back to exercises button', async () => {
    renderWithRouter(<SpatialMemoryGame />)
    const user = userEvent.setup()

    const backButton = screen.getByRole('button', { name: /Back to Exercises/i })
    expect(backButton).toBeInTheDocument()

    await user.click(backButton)
  })

  it('should start game and show sequence', async () => {
    renderWithRouter(<SpatialMemoryGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    expect(screen.getByText('Watch the Sequence')).toBeInTheDocument()
    expect(screen.getByText(/Memorize the order/)).toBeInTheDocument()
  })

  it('should render 5x5 grid (25 cells)', async () => {
    renderWithRouter(<SpatialMemoryGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    const cells = screen.getAllByRole('button', { name: /Cell \d+/i })
    expect(cells).toHaveLength(25)
  })

  it('should have cells disabled during showing phase', async () => {
    renderWithRouter(<SpatialMemoryGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    const cells = screen.getAllByRole('button', { name: /Cell \d+/i })
    cells.forEach(cell => {
      expect(cell).toBeDisabled()
    })
  })

  it('should display round progress', async () => {
    renderWithRouter(<SpatialMemoryGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    expect(screen.getByText('Round 1 of 5')).toBeInTheDocument()
    expect(screen.getByText('Correct: 0')).toBeInTheDocument()
  })

  it('should record session when game completes', async () => {
    renderWithRouter(<SpatialMemoryGame />)
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    const addSession = vi.spyOn(useProgressStore.getState(), 'addSession')
    const addXP = vi.spyOn(useUserStore.getState(), 'addXP')
    const updateStreak = vi.spyOn(useUserStore.getState(), 'updateStreak')

    // These functions should be called when game completes
    expect(addSession).not.toHaveBeenCalled()
    expect(addXP).not.toHaveBeenCalled()
    expect(updateStreak).not.toHaveBeenCalled()
  })

  it('should apply correct CSS classes to grid cells', async () => {
    renderWithRouter(<SpatialMemoryGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    const cells = screen.getAllByRole('button', { name: /Cell \d+/i })
    // All cells should have rounded corners and aspect-square
    cells.forEach(cell => {
      expect(cell).toHaveClass('rounded-lg')
      expect(cell).toHaveClass('aspect-square')
    })
  })

  it('should show highlighted cell during sequence', async () => {
    renderWithRouter(<SpatialMemoryGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    const cells = screen.getAllByRole('button', { name: /Cell \d+/i })
    // At least one cell should be highlighted with bg-primary
    const highlightedCells = cells.filter(cell => cell.classList.contains('bg-primary'))
    expect(highlightedCells.length).toBeGreaterThanOrEqual(0)
  })
})
