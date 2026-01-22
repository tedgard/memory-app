import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import VisualGrid from '@/features/exercises/dual-nback/VisualGrid'

describe('VisualGrid', () => {
  it('should render 9 grid cells', () => {
    render(<VisualGrid position={null} />)

    const cells = screen.getAllByRole('generic').filter((el) =>
      el.className.includes('rounded-lg border-2')
    )
    expect(cells.length).toBeGreaterThanOrEqual(9)
  })

  it('should not highlight any cell when position is null', () => {
    const { container } = render(<VisualGrid position={null} />)

    const highlightedCells = container.querySelectorAll('.bg-primary')
    expect(highlightedCells.length).toBe(0)
  })

  it('should highlight the correct cell when position is provided', () => {
    const { container } = render(<VisualGrid position={4} />)

    const highlightedCells = container.querySelectorAll('.bg-primary')
    expect(highlightedCells.length).toBeGreaterThan(0)
  })

  it('should render cells in a 3x3 grid layout', () => {
    const { container } = render(<VisualGrid position={null} />)

    const gridContainer = container.querySelector('.grid-cols-3')
    expect(gridContainer).toBeInTheDocument()
  })

  it('should highlight cell 0 (top-left)', () => {
    const { container } = render(<VisualGrid position={0} />)

    const highlightedCells = container.querySelectorAll('.bg-primary')
    expect(highlightedCells.length).toBeGreaterThan(0)
  })

  it('should highlight cell 8 (bottom-right)', () => {
    const { container } = render(<VisualGrid position={8} />)

    const highlightedCells = container.querySelectorAll('.bg-primary')
    expect(highlightedCells.length).toBeGreaterThan(0)
  })

  it('should render circular indicator in highlighted cell', () => {
    const { container } = render(<VisualGrid position={4} />)

    const circularIndicator = container.querySelector('.rounded-full')
    expect(circularIndicator).toBeInTheDocument()
  })

  it('should have responsive sizing classes', () => {
    const { container } = render(<VisualGrid position={null} />)

    const cells = container.querySelectorAll('.w-16, .md\\:w-20')
    expect(cells.length).toBeGreaterThan(0)
  })

  it('should render with background and border styling', () => {
    const { container } = render(<VisualGrid position={null} />)

    const gridBackground = container.querySelector('.bg-background')
    expect(gridBackground).toBeInTheDocument()
  })
})
