import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Navigation from '@/components/layout/Navigation'

const NavigationWrapper = ({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) => (
  <BrowserRouter>
    <Navigation isOpen={isOpen} onClose={onClose} />
  </BrowserRouter>
)

describe('Navigation', () => {
  it('should render all navigation items', () => {
    render(<NavigationWrapper />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Exercises')).toBeInTheDocument()
    expect(screen.getByText('Achievements')).toBeInTheDocument()
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('Learn')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('should render navigation icons', () => {
    render(<NavigationWrapper />)

    expect(screen.getByText('📊')).toBeInTheDocument() // Dashboard
    expect(screen.getByText('🎯')).toBeInTheDocument() // Exercises
    expect(screen.getByText('🏆')).toBeInTheDocument() // Achievements
    expect(screen.getByText('📈')).toBeInTheDocument() // Progress
    expect(screen.getByText('🧠')).toBeInTheDocument() // Learn
    expect(screen.getByText('⚙️')).toBeInTheDocument() // Settings
  })

  it('should display daily training tip', () => {
    render(<NavigationWrapper />)

    expect(screen.getByText('Daily Training Tip')).toBeInTheDocument()
    expect(screen.getByText(/Consistency is key/)).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<NavigationWrapper isOpen={true} onClose={onClose} />)

    const closeButton = screen.getByLabelText('Close menu')
    await user.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when overlay is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    const { container } = render(<NavigationWrapper isOpen={true} onClose={onClose} />)

    const overlay = container.querySelector('.fixed.inset-0.bg-black\\/50')
    expect(overlay).toBeInTheDocument()

    if (overlay) {
      await user.click(overlay as HTMLElement)
      expect(onClose).toHaveBeenCalledTimes(1)
    }
  })

  it('should call onClose when nav item is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<NavigationWrapper isOpen={true} onClose={onClose} />)

    const dashboardLink = screen.getByText('Dashboard').closest('a')
    expect(dashboardLink).toBeInTheDocument()

    if (dashboardLink) {
      await user.click(dashboardLink)
      expect(onClose).toHaveBeenCalled()
    }
  })

  it('should not show overlay when closed', () => {
    const { container } = render(<NavigationWrapper isOpen={false} />)

    const overlay = container.querySelector('.fixed.inset-0.bg-black\\/50')
    expect(overlay).not.toBeInTheDocument()
  })

  it('should apply closed styling when isOpen is false', () => {
    const { container } = render(<NavigationWrapper isOpen={false} />)

    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('-translate-x-full')
  })

  it('should apply open styling when isOpen is true', () => {
    const { container } = render(<NavigationWrapper isOpen={true} />)

    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('translate-x-0')
  })

  it('should have correct navigation links', () => {
    render(<NavigationWrapper />)

    const dashboardLink = screen.getByText('Dashboard').closest('a')
    expect(dashboardLink).toHaveAttribute('href', '/')

    const exercisesLink = screen.getByText('Exercises').closest('a')
    expect(exercisesLink).toHaveAttribute('href', '/exercises')

    const achievementsLink = screen.getByText('Achievements').closest('a')
    expect(achievementsLink).toHaveAttribute('href', '/achievements')

    const progressLink = screen.getByText('Progress').closest('a')
    expect(progressLink).toHaveAttribute('href', '/progress')

    const learnLink = screen.getByText('Learn').closest('a')
    expect(learnLink).toHaveAttribute('href', '/education')

    const settingsLink = screen.getByText('Settings').closest('a')
    expect(settingsLink).toHaveAttribute('href', '/settings')
  })

  it('should default to isOpen=true when prop not provided', () => {
    const { container } = render(<NavigationWrapper />)

    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('translate-x-0')
  })
})
