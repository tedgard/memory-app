import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Progress } from '@/components/ui/progress'

describe('Progress', () => {
  it('should render progress bar', () => {
    const { container } = render(<Progress value={50} />)
    expect(container.querySelector('[role="progressbar"]')).toBeInTheDocument()
  })

  it('should apply value prop', () => {
    const { container } = render(<Progress value={75} />)
    const indicator = container.querySelector('.bg-primary')
    expect(indicator).toHaveStyle({ transform: 'translateX(-25%)' })
  })

  it('should handle 0 value', () => {
    const { container } = render(<Progress value={0} />)
    const indicator = container.querySelector('.bg-primary')
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' })
  })

  it('should handle 100 value', () => {
    const { container } = render(<Progress value={100} />)
    const indicator = container.querySelector('.bg-primary')
    expect(indicator).toHaveStyle({ transform: 'translateX(-0%)' })
  })

  it('should apply custom className', () => {
    const { container } = render(<Progress value={50} className="custom-progress" />)
    expect(container.querySelector('[role="progressbar"]')).toHaveClass('custom-progress')
  })

  it('should have progress styling classes', () => {
    const { container } = render(<Progress value={50} />)
    const progressBar = container.querySelector('[role="progressbar"]')
    expect(progressBar).toHaveClass('relative', 'h-2', 'w-full', 'overflow-hidden', 'rounded-full')
  })

  it('should forward ref', () => {
    const ref = { current: null }
    render(<Progress value={50} ref={ref} />)
    expect(ref.current).toBeTruthy()
  })

  it('should render indicator with correct transform', () => {
    const { container } = render(<Progress value={60} />)
    const indicator = container.querySelector('.bg-primary')
    expect(indicator).toHaveStyle({ transform: 'translateX(-40%)' })
  })

  it('should handle undefined value', () => {
    const { container } = render(<Progress />)
    const indicator = container.querySelector('.bg-primary')
    expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' })
  })
})
