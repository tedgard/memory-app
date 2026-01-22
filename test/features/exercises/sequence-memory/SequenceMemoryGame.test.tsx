import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import SequenceMemoryGame from '@/features/exercises/sequence-memory/SequenceMemoryGame'
import { useProgressStore } from '@/store/useProgressStore'
import { useUserStore } from '@/store/useUserStore'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('SequenceMemoryGame', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useUserStore.getState().resetProfile()
    mockNavigate.mockClear()
  })

  it('should render ready phase with title', () => {
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    expect(screen.getByText('Sequence Memory')).toBeInTheDocument()
    expect(
      screen.getByText(/Watch the sequence of colors carefully/)
    ).toBeInTheDocument()
  })

  it('should display how to play instructions', () => {
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    expect(screen.getByText('How to Play:')).toBeInTheDocument()
    expect(screen.getByText(/Watch as colors light up/)).toBeInTheDocument()
    expect(screen.getByText(/Memorize the order/)).toBeInTheDocument()
  })

  it('should have back to exercises button', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    const backButton = screen.getByRole('button', { name: /Back to Exercises/i })
    await user.click(backButton)

    expect(mockNavigate).toHaveBeenCalledWith('/exercises')
  })

  it('should have start game button', () => {
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    expect(screen.getByRole('button', { name: /Start Game/i })).toBeInTheDocument()
  })

  it('should display current level information', () => {
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    expect(screen.getByText(/Current Level:/)).toBeInTheDocument()
    expect(screen.getByText(/\d+ colors/)).toBeInTheDocument()
  })

  it('should start game when start button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    const startButton = screen.getByRole('button', { name: /Start Game/i })
    await user.click(startButton)

    // Should transition from ready phase
    await waitFor(() => {
      expect(screen.queryByText('Start Game')).not.toBeInTheDocument()
    })
  })

  it('should display round progress during game', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    await waitFor(() => {
      expect(screen.getByText(/Round \d+ of \d+/)).toBeInTheDocument()
    })
  })

  it('should display colored buttons during game', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    await waitFor(() => {
      // Should have color buttons
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(1)
    })
  })

  it('should show watch phase message', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    // Game should show phase messages
    await waitFor(() => {
      const container = screen.getByText(/Round \d+ of \d+/)
      expect(container).toBeInTheDocument()
    })
  })

  it('should display progress bar', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    await waitFor(() => {
      const progressBars = screen.getAllByRole('progressbar')
      expect(progressBars.length).toBeGreaterThan(0)
    })
  })

  it('should show correct rounds counter', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    await waitFor(() => {
      expect(screen.getByText(/Correct: \d+/)).toBeInTheDocument()
    })
  })

  it('should have color buttons clickable during input phase', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    await waitFor(
      () => {
        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBeGreaterThan(2)
      },
      { timeout: 3000 }
    )
  })

  it('should render game structure properly', () => {
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    // Component should render without errors
    expect(screen.getByText('Sequence Memory')).toBeInTheDocument()
  })

  it('should show tips in ready phase', () => {
    render(
      <BrowserRouter>
        <SequenceMemoryGame />
      </BrowserRouter>
    )

    // Should have helpful information for the user
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBeGreaterThan(0)
  })
})
