import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  it('should render badge with text', () => {
    render(<Badge>Badge text</Badge>)
    expect(screen.getByText('Badge text')).toBeInTheDocument()
  })

  it('should apply default variant classes', () => {
    const { container } = render(<Badge>Default</Badge>)
    expect(container.firstChild).toHaveClass('bg-primary')
  })

  it('should apply secondary variant classes', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>)
    expect(container.firstChild).toHaveClass('bg-secondary')
  })

  it('should apply destructive variant classes', () => {
    const { container } = render(<Badge variant="destructive">Destructive</Badge>)
    expect(container.firstChild).toHaveClass('bg-destructive')
  })

  it('should apply outline variant classes', () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>)
    expect(container.firstChild).toHaveClass('text-foreground')
  })

  it('should apply custom className', () => {
    const { container } = render(<Badge className="custom-badge">Badge</Badge>)
    expect(container.firstChild).toHaveClass('custom-badge')
  })

  it('should have base styling classes', () => {
    const { container } = render(<Badge>Badge</Badge>)
    const badge = container.firstChild
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-md', 'border', 'px-2.5', 'py-0.5', 'text-xs', 'font-semibold')
  })

  it('should render as div element', () => {
    const { container } = render(<Badge>Badge</Badge>)
    expect(container.firstChild?.nodeName).toBe('DIV')
  })
})
