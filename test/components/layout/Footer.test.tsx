import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '@/components/layout/Footer'
import packageJson from '../../../package.json'

describe('Footer', () => {
  it('should render footer with creator name', () => {
    render(<Footer />)

    expect(screen.getByText(/Made with ❤️ by Edgard N./i)).toBeInTheDocument()
  })

  it('should display version number from package.json', () => {
    render(<Footer />)

    expect(screen.getByText(`v${packageJson.version}`)).toBeInTheDocument()
  })

  it('should render as a footer element', () => {
    const { container } = render(<Footer />)

    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
  })

  it('should have correct styling classes', () => {
    const { container } = render(<Footer />)

    const footer = container.querySelector('footer')
    expect(footer).toHaveClass('bg-surface', 'border-t', 'border-gray-800')
  })
})
