import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '@/components/layout/Header'
import { useUserStore } from '@/store/useUserStore'

describe('Header', () => {
  beforeEach(() => {
    useUserStore.getState().resetProfile()
  })

  it('should return null when no profile exists', () => {
    const { container } = render(<Header />)
    expect(container.firstChild).toBeNull()
  })

  it('should render header when profile exists', () => {
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    render(<Header />)

    expect(screen.getByText('MemoryApp')).toBeInTheDocument()
  })

  it('should display user name and initial', () => {
    useUserStore.getState().createProfile('John Doe', 'intelligence', 'intermediate')

    render(<Header />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('J')).toBeInTheDocument()
  })

  it('should display current streak', () => {
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')
    useUserStore.getState().updateStreak()
    useUserStore.getState().updateStreak() // Same day, no increment

    render(<Header />)

    expect(screen.getByText('1 Day Streak')).toBeInTheDocument()
  })

  it('should display level and XP information', () => {
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')
    useUserStore.getState().addXP(50)

    render(<Header />)

    expect(screen.getByText('Level 1')).toBeInTheDocument()
    expect(screen.getByText(/50.*XP/)).toBeInTheDocument()
  })

  it('should calculate XP percentage correctly', () => {
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')
    useUserStore.getState().addXP(50) // 50/100 = 50%

    const { container } = render(<Header />)

    const indicator = container.querySelector('.bg-primary.transition-all')
    expect(indicator).toHaveStyle({ transform: 'translateX(-50%)' })
  })

  it('should call onMenuClick when menu button is clicked', async () => {
    const user = userEvent.setup()
    const onMenuClick = vi.fn()

    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    render(<Header onMenuClick={onMenuClick} />)

    const menuButton = screen.getByLabelText('Toggle menu')
    await user.click(menuButton)

    expect(onMenuClick).toHaveBeenCalledTimes(1)
  })

  it('should display Beta badge', () => {
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    render(<Header />)

    expect(screen.getByText('Beta')).toBeInTheDocument()
  })

  it('should display user goal', () => {
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    render(<Header />)

    expect(screen.getByText('memory')).toBeInTheDocument()
  })

  it('should show longest streak', () => {
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    // Manually set a longer streak
    useUserStore.setState({
      streak: {
        ...useUserStore.getState().streak,
        current: 5,
        longest: 10
      }
    })

    render(<Header />)

    expect(screen.getByText('Best: 10')).toBeInTheDocument()
  })

  it('should display streak emoji', () => {
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    render(<Header />)

    expect(screen.getAllByText('🔥').length).toBeGreaterThan(0)
  })
})
