import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

describe('Card', () => {
  it('should render card', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('should forward ref', () => {
    const ref = { current: null }
    render(<Card ref={ref}>Content</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('should have card styling classes', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.firstChild).toHaveClass('rounded-xl', 'border', 'bg-card')
  })
})

describe('CardHeader', () => {
  it('should render card header', () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<CardHeader className="custom-header">Content</CardHeader>)
    expect(container.firstChild).toHaveClass('custom-header')
  })

  it('should have header styling classes', () => {
    const { container } = render(<CardHeader>Content</CardHeader>)
    expect(container.firstChild).toHaveClass('flex', 'flex-col', 'p-6')
  })
})

describe('CardTitle', () => {
  it('should render card title', () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<CardTitle className="custom-title">Title</CardTitle>)
    expect(container.firstChild).toHaveClass('custom-title')
  })

  it('should have title styling classes', () => {
    const { container } = render(<CardTitle>Title</CardTitle>)
    expect(container.firstChild).toHaveClass('font-semibold', 'leading-none')
  })
})

describe('CardDescription', () => {
  it('should render card description', () => {
    render(<CardDescription>Description text</CardDescription>)
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<CardDescription className="custom-desc">Desc</CardDescription>)
    expect(container.firstChild).toHaveClass('custom-desc')
  })

  it('should have description styling classes', () => {
    const { container } = render(<CardDescription>Desc</CardDescription>)
    expect(container.firstChild).toHaveClass('text-sm', 'text-muted-foreground')
  })
})

describe('CardContent', () => {
  it('should render card content', () => {
    render(<CardContent>Main content</CardContent>)
    expect(screen.getByText('Main content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<CardContent className="custom-content">Content</CardContent>)
    expect(container.firstChild).toHaveClass('custom-content')
  })

  it('should have content styling classes', () => {
    const { container } = render(<CardContent>Content</CardContent>)
    expect(container.firstChild).toHaveClass('p-6', 'pt-0')
  })
})

describe('CardFooter', () => {
  it('should render card footer', () => {
    render(<CardFooter>Footer content</CardFooter>)
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<CardFooter className="custom-footer">Footer</CardFooter>)
    expect(container.firstChild).toHaveClass('custom-footer')
  })

  it('should have footer styling classes', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>)
    expect(container.firstChild).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
  })
})

describe('Card composition', () => {
  it('should render complete card with all components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
    expect(screen.getByText('Test Footer')).toBeInTheDocument()
  })
})
