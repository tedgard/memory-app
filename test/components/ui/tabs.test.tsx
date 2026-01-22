import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

describe('Tabs', () => {
  const TabsExample = () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
    </Tabs>
  )

  it('should render tabs', () => {
    render(<TabsExample />)
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument()
  })

  it('should show default tab content', () => {
    render(<TabsExample />)
    expect(screen.getByText('Content 1')).toBeVisible()
  })

  it('should switch tabs on click', async () => {
    const user = userEvent.setup()
    render(<TabsExample />)

    await user.click(screen.getByRole('tab', { name: 'Tab 2' }))

    expect(screen.getByText('Content 2')).toBeVisible()
  })

  it('should apply custom className to TabsList', () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList className="custom-list">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    )
    expect(container.querySelector('.custom-list')).toBeInTheDocument()
  })

  it('should apply custom className to TabsTrigger', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" className="custom-trigger">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    )
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveClass('custom-trigger')
  })

  it('should apply custom className to TabsContent', () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-content">Content</TabsContent>
      </Tabs>
    )
    expect(container.querySelector('.custom-content')).toBeInTheDocument()
  })

  it('should have TabsList styling classes', () => {
    const { container } = render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    )
    const tabsList = container.querySelector('[role="tablist"]')
    expect(tabsList).toHaveClass('inline-flex', 'h-9', 'items-center', 'rounded-lg', 'bg-muted')
  })

  it('should disable trigger when disabled prop is set', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1" disabled>Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>
    )
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeDisabled()
  })
})
