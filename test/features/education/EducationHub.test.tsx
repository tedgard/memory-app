import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import EducationHub from '@/features/education/EducationHub'

describe('EducationHub', () => {
  it('should render education hub with title', () => {
    render(
      <MemoryRouter>
        <EducationHub />
      </MemoryRouter>
    )

    expect(screen.getByText('Learn About Working Memory')).toBeInTheDocument()
    expect(
      screen.getByText(/Evidence-based insights into cognitive training/)
    ).toBeInTheDocument()
  })

  it('should display all article cards', () => {
    render(
      <MemoryRouter>
        <EducationHub />
      </MemoryRouter>
    )

    expect(screen.getByText('Introduction to Working Memory')).toBeInTheDocument()
    expect(screen.getByText('The Science of Neuroplasticity')).toBeInTheDocument()
    expect(screen.getByText('Dual N-Back Explained')).toBeInTheDocument()
    expect(screen.getByText('Training Best Practices')).toBeInTheDocument()
    expect(screen.getByText('Transfer Effects')).toBeInTheDocument()
    expect(screen.getByText('Cognitive Load Theory')).toBeInTheDocument()
    expect(screen.getByText('Operation Span Task')).toBeInTheDocument()
    expect(screen.getByText('Spatial Working Memory')).toBeInTheDocument()
  })

  it('should show read article buttons for each card', () => {
    render(
      <MemoryRouter>
        <EducationHub />
      </MemoryRouter>
    )

    const readButtons = screen.getAllByRole('button', { name: /Read Article/i })
    expect(readButtons.length).toBe(8)
  })

  it('should open article when clicking on card', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <EducationHub />
      </MemoryRouter>
    )

    const introCard = screen.getByText('Introduction to Working Memory')
    await user.click(introCard)

    // Should show article content
    expect(screen.getByText(/Working memory is your brain's notepad/)).toBeInTheDocument()
  })

  it('should show back button when viewing article', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <EducationHub />
      </MemoryRouter>
    )

    const readButton = screen.getAllByRole('button', { name: /Read Article/i })[0]
    await user.click(readButton)

    const backButton = screen.getByRole('button', { name: /Back to Articles/i })
    expect(backButton).toBeInTheDocument()
  })

  it('should navigate back to article list when clicking back button', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <EducationHub />
      </MemoryRouter>
    )

    // Open article
    const readButton = screen.getAllByRole('button', { name: /Read Article/i })[0]
    await user.click(readButton)

    // Click back
    const backButton = screen.getByRole('button', { name: /Back to Articles/i })
    await user.click(backButton)

    // Should be back at article list
    expect(screen.getByText('Learn About Working Memory')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /Read Article/i }).length).toBe(8)
  })

  it('should display article icon and title when viewing article', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <EducationHub />
      </MemoryRouter>
    )

    const introCard = screen.getByText('Introduction to Working Memory')
    await user.click(introCard)

    expect(screen.getByText('Introduction to Working Memory')).toBeInTheDocument()
    // Icon should be displayed
    expect(screen.getByText('🧠')).toBeInTheDocument()
  })

  it('should render article content with proper formatting', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <EducationHub />
      </MemoryRouter>
    )

    const introCard = screen.getByText('Introduction to Working Memory')
    await user.click(introCard)

    // Should show article sections
    expect(screen.getByText('The Three Components:')).toBeInTheDocument()
    expect(screen.getByText('Why It Matters:')).toBeInTheDocument()
    expect(screen.getByText('The Good News:')).toBeInTheDocument()
  })

  it('should display article excerpts in card view', () => {
    render(
      <MemoryRouter>
        <EducationHub />
      </MemoryRouter>
    )

    expect(
      screen.getByText(/Learn what working memory is and why it matters/)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Understand how your brain changes and adapts/)
    ).toBeInTheDocument()
  })

  it('should render all 8 article icons', () => {
    render(
      <MemoryRouter>
        <EducationHub />
      </MemoryRouter>
    )

    expect(screen.getAllByText('🧠').length).toBeGreaterThan(0)
    expect(screen.getByText('🔬')).toBeInTheDocument()
    expect(screen.getByText('🎯')).toBeInTheDocument()
    expect(screen.getByText('⚡')).toBeInTheDocument()
    expect(screen.getByText('🚀')).toBeInTheDocument()
    expect(screen.getByText('⚖️')).toBeInTheDocument()
    expect(screen.getByText('➕')).toBeInTheDocument()
    expect(screen.getByText('📍')).toBeInTheDocument()
  })

  it('should handle clicking on multiple different articles', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <EducationHub />
      </MemoryRouter>
    )

    // Open first article
    const firstCard = screen.getByText('Introduction to Working Memory')
    await user.click(firstCard)
    expect(screen.getByText(/Working memory is your brain's notepad/)).toBeInTheDocument()

    // Go back
    await user.click(screen.getByRole('button', { name: /Back to Articles/i }))

    // Open second article
    const secondCard = screen.getByText('Dual N-Back Explained')
    await user.click(secondCard)
    expect(screen.getByText(/The Dual N-Back task is considered/)).toBeInTheDocument()
  })
})
