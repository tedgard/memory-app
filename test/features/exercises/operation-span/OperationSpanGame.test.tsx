import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import OperationSpanGame from '@/features/exercises/operation-span/OperationSpanGame'
import { useProgressStore } from '@/store/useProgressStore'
import { useUserStore } from '@/store/useUserStore'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('OperationSpanGame', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
    useUserStore.getState().resetProfile()
  })

  it('should render ready phase with instructions', () => {
    renderWithRouter(<OperationSpanGame />)

    expect(screen.getByText('Operation Span')).toBeInTheDocument()
    expect(screen.getByText(/Test your working memory under cognitive load/)).toBeInTheDocument()
    expect(screen.getByText('Start Game')).toBeInTheDocument()
  })

  it('should display how to play instructions', () => {
    renderWithRouter(<OperationSpanGame />)

    expect(screen.getByText(/Solve each math problem/)).toBeInTheDocument()
    expect(screen.getByText(/After each problem, remember the letter shown/)).toBeInTheDocument()
    expect(screen.getByText(/After all problems, recall the letters in order/)).toBeInTheDocument()
  })

  it('should display current difficulty level from progress store', () => {
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'operation-span': {
            ...useProgressStore.getState().stats.exerciseProgress['operation-span'],
            currentDifficulty: 4,
          },
        },
      },
    })

    renderWithRouter(<OperationSpanGame />)

    expect(screen.getByText(/Current Level:/)).toBeInTheDocument()
    expect(screen.getByText(/4 items/)).toBeInTheDocument()
  })

  it('should have back to exercises button', async () => {
    renderWithRouter(<OperationSpanGame />)
    const user = userEvent.setup()

    const backButton = screen.getByRole('button', { name: /Back to Exercises/i })
    expect(backButton).toBeInTheDocument()

    await user.click(backButton)
  })

  it('should start game and show math phase', async () => {
    renderWithRouter(<OperationSpanGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    expect(screen.getByText('Is this equation correct?')).toBeInTheDocument()
    expect(screen.getByText(/Then remember the letter below/)).toBeInTheDocument()
  })

  it('should display math problem in correct format', async () => {
    renderWithRouter(<OperationSpanGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    // Should have a math equation with format "a op b = c"
    const mathRegex = /\d+\s*[+\-*]\s*\d+\s*=\s*\d+/
    expect(screen.getByText(mathRegex)).toBeInTheDocument()
  })

  it('should display letter to remember during math phase', async () => {
    renderWithRouter(<OperationSpanGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    expect(screen.getByText(/Remember this letter:/)).toBeInTheDocument()

    // Should display one of the valid letters
    const validLetters = ['F', 'H', 'J', 'K', 'L', 'N', 'P', 'Q', 'R', 'S', 'T', 'Y']
    const letterElements = validLetters.map(letter => screen.queryByText(letter))
    const displayedLetters = letterElements.filter(el => el !== null)

    expect(displayedLetters.length).toBeGreaterThan(0)
  })

  it('should have correct and incorrect buttons for math', async () => {
    renderWithRouter(<OperationSpanGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    const correctButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Correct'))
    const incorrectButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Incorrect'))

    expect(correctButton).toBeInTheDocument()
    expect(incorrectButton).toBeInTheDocument()
  })

  it('should display round progress', async () => {
    renderWithRouter(<OperationSpanGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    expect(screen.getByText('Round 1 of 5')).toBeInTheDocument()
  })

  it('should advance to next problem after answering', async () => {
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'operation-span': {
            ...useProgressStore.getState().stats.exerciseProgress['operation-span'],
            currentDifficulty: 2,
          },
        },
      },
    })

    renderWithRouter(<OperationSpanGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    const correctButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Correct'))
    await user.click(correctButton!)

    await waitFor(() => {
      expect(screen.getByText(/Math: \d+\/1/)).toBeInTheDocument()
    })
  })

  it('should transition to recall phase after all math problems', async () => {
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'operation-span': {
            ...useProgressStore.getState().stats.exerciseProgress['operation-span'],
            currentDifficulty: 2,
          },
        },
      },
    })

    renderWithRouter(<OperationSpanGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    // Answer 2 math problems
    for (let i = 0; i < 2; i++) {
      const correctButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Correct'))
      await user.click(correctButton!)
      if (i < 1) {
        await waitFor(() => screen.getByText(/Math: \d+\/\d+/))
      }
    }

    await waitFor(() => {
      expect(screen.getByText('Recall the Letters')).toBeInTheDocument()
    })
  })

  it('should display letter grid in recall phase', async () => {
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'operation-span': {
            ...useProgressStore.getState().stats.exerciseProgress['operation-span'],
            currentDifficulty: 2,
          },
        },
      },
    })

    renderWithRouter(<OperationSpanGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    for (let i = 0; i < 2; i++) {
      const correctButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Correct'))
      await user.click(correctButton!)
      if (i < 1) await waitFor(() => screen.getByText(/Math: \d+\/\d+/))
    }

    await waitFor(() => {
      expect(screen.getByText(/Click letters in the order they appeared/)).toBeInTheDocument()
    })

    const validLetters = ['F', 'H', 'J', 'K', 'L', 'N', 'P', 'Q', 'R', 'S', 'T', 'Y']
    validLetters.forEach(letter => {
      expect(screen.getByRole('button', { name: letter })).toBeInTheDocument()
    })
  })

  it('should allow selecting letters in recall phase', async () => {
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'operation-span': {
            ...useProgressStore.getState().stats.exerciseProgress['operation-span'],
            currentDifficulty: 2,
          },
        },
      },
    })

    renderWithRouter(<OperationSpanGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    for (let i = 0; i < 2; i++) {
      const correctButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Correct'))
      await user.click(correctButton!)
      if (i < 1) await waitFor(() => screen.getByText(/Math: \d+\/\d+/))
    }

    await waitFor(() => screen.getByText('Recall the Letters'))

    await user.click(screen.getByRole('button', { name: 'F' }))

    const selectedLetters = screen.getAllByText('F')
    expect(selectedLetters.length).toBeGreaterThan(1)
  })

  it('should enable submit when correct number of letters selected', async () => {
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'operation-span': {
            ...useProgressStore.getState().stats.exerciseProgress['operation-span'],
            currentDifficulty: 2,
          },
        },
      },
    })

    renderWithRouter(<OperationSpanGame />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    for (let i = 0; i < 2; i++) {
      const correctButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Correct'))
      await user.click(correctButton!)
      if (i < 1) await waitFor(() => screen.getByText(/Math: \d+\/\d+/))
    }

    await waitFor(() => screen.getByText('Recall the Letters'))

    const submitButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Submit'))
    expect(submitButton).toBeDisabled()

    await user.click(screen.getByRole('button', { name: 'F' }))
    await user.click(screen.getByRole('button', { name: 'H' }))

    expect(submitButton).not.toBeDisabled()
  })

  it('should show results after completing all rounds', { timeout: 15000 }, async () => {
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'operation-span': {
            ...useProgressStore.getState().stats.exerciseProgress['operation-span'],
            currentDifficulty: 2,
          },
        },
      },
    })

    renderWithRouter(<OperationSpanGame />)
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    for (let round = 0; round < 5; round++) {
      for (let i = 0; i < 2; i++) {
        const correctButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Correct'))
        await user.click(correctButton!)
        if (i < 1) await waitFor(() => screen.getByText(/Math: \d+\/\d+/))
      }

      await waitFor(() => screen.getByText('Recall the Letters'))
      await user.click(screen.getByRole('button', { name: 'F' }))
      await user.click(screen.getByRole('button', { name: 'H' }))

      const submitButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Submit'))
      await user.click(submitButton!)

      if (round < 4) {
        await waitFor(() => screen.getByText(/Round \d+ of 5/))
      }
    }

    await waitFor(() => {
      expect(screen.getByText('Training Complete!')).toBeInTheDocument()
      expect(screen.getByText('Math Accuracy')).toBeInTheDocument()
      expect(screen.getByText('Recall Accuracy')).toBeInTheDocument()
    })
  })

  it('should record session after completion', { timeout: 15000 }, async () => {
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'operation-span': {
            ...useProgressStore.getState().stats.exerciseProgress['operation-span'],
            currentDifficulty: 2,
          },
        },
      },
    })

    renderWithRouter(<OperationSpanGame />)
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')
    const user = userEvent.setup()

    const addSession = vi.spyOn(useProgressStore.getState(), 'addSession')

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    for (let round = 0; round < 5; round++) {
      for (let i = 0; i < 2; i++) {
        const correctButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Correct'))
        await user.click(correctButton!)
        if (i < 1) await waitFor(() => screen.getByText(/Math: \d+\/\d+/))
      }

      await waitFor(() => screen.getByText('Recall the Letters'))
      await user.click(screen.getByRole('button', { name: 'F' }))
      await user.click(screen.getByRole('button', { name: 'H' }))

      const submitButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Submit'))
      await user.click(submitButton!)

      if (round < 4) {
        await waitFor(() => screen.getByText(/Round \d+ of 5/))
      }
    }

    await waitFor(() => {
      expect(addSession).toHaveBeenCalledWith(
        expect.objectContaining({
          exerciseType: 'operation-span',
          difficulty: 2,
          trialsCompleted: 5,
        })
      )
    })
  })

  it('should have play again and return to dashboard buttons', { timeout: 15000 }, async () => {
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'operation-span': {
            ...useProgressStore.getState().stats.exerciseProgress['operation-span'],
            currentDifficulty: 2,
          },
        },
      },
    })

    renderWithRouter(<OperationSpanGame />)
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /Start Game/i }))

    for (let round = 0; round < 5; round++) {
      for (let i = 0; i < 2; i++) {
        const correctButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Correct'))
        await user.click(correctButton!)
        if (i < 1) await waitFor(() => screen.getByText(/Math: \d+\/\d+/))
      }

      await waitFor(() => screen.getByText('Recall the Letters'))
      await user.click(screen.getByRole('button', { name: 'F' }))
      await user.click(screen.getByRole('button', { name: 'H' }))

      const submitButton = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Submit'))
      await user.click(submitButton!)

      if (round < 4) {
        await waitFor(() => screen.getByText(/Round \d+ of 5/))
      }
    }

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Play Again/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Return to Dashboard/i })).toBeInTheDocument()
    })
  })
})
