import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import { useUserStore } from '@/store/useUserStore'

const MainLayoutWrapper = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<div>Test Content</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
)

describe('MainLayout', () => {
  beforeEach(() => {
    useUserStore.getState().resetProfile()
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')
  })

  it('should render header', () => {
    render(<MainLayoutWrapper />)

    expect(screen.getByText('MemoryApp')).toBeInTheDocument()
  })

  it('should render navigation', () => {
    render(<MainLayoutWrapper />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Exercises')).toBeInTheDocument()
  })

  it('should render footer', () => {
    render(<MainLayoutWrapper />)

    expect(screen.getByText(/Made with ❤️ by Edgard N./)).toBeInTheDocument()
  })

  it('should render outlet content', () => {
    render(<MainLayoutWrapper />)

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should toggle mobile menu when menu button is clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(<MainLayoutWrapper />)

    // Initially, navigation should be closed on mobile
    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('-translate-x-full')

    // Click menu button to open
    const menuButton = screen.getByLabelText('Toggle menu')
    await user.click(menuButton)

    // Navigation should now be open
    expect(nav).toHaveClass('translate-x-0')
  })

  it('should close mobile menu when close button is clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(<MainLayoutWrapper />)

    // Open the menu first
    const menuButton = screen.getByLabelText('Toggle menu')
    await user.click(menuButton)

    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('translate-x-0')

    // Close the menu
    const closeButton = screen.getByLabelText('Close menu')
    await user.click(closeButton)

    expect(nav).toHaveClass('-translate-x-full')
  })

  it('should have proper layout structure', () => {
    const { container } = render(<MainLayoutWrapper />)

    // Check for main layout container
    const mainContainer = container.querySelector('.flex.flex-col.h-full')
    expect(mainContainer).toBeInTheDocument()

    // Check for main content area
    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass('flex-1', 'overflow-y-auto')
  })

  it('should render all layout sections in correct order', () => {
    const { container } = render(<MainLayoutWrapper />)

    const sections = container.querySelectorAll('div > *')
    const sectionTags = Array.from(sections).map(s => s.tagName.toLowerCase())

    expect(sectionTags).toContain('header')
    expect(sectionTags).toContain('main')
    expect(sectionTags).toContain('footer')
  })
})
