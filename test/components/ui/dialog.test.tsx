import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'

describe('Dialog', () => {
  it('should render dialog trigger', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
      </Dialog>
    )

    expect(screen.getByText('Open Dialog')).toBeInTheDocument()
  })

  it('should show dialog content when triggered', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This is a test dialog</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText('Open Dialog'))

    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('This is a test dialog')).toBeInTheDocument()
  })

  it('should render dialog header', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Header Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText('Open'))

    expect(screen.getByText('Header Title')).toBeInTheDocument()
  })

  it('should render dialog footer', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogFooter>
            <button>Cancel</button>
            <button>Confirm</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText('Open'))

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument()
  })

  it('should have close button in dialog content', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText('Open'))

    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('should render custom close button', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Test</DialogTitle>
          <DialogClose asChild>
            <button>Custom Close</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText('Open'))

    expect(screen.getByRole('button', { name: 'Custom Close' })).toBeInTheDocument()
  })

  it('should apply custom className to dialog content', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="custom-class">
          <DialogTitle>Test</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText('Open'))

    const dialogElement = screen.getByText('Test').closest('[role="dialog"]')
    expect(dialogElement).toHaveClass('custom-class')
  })

  it('should apply custom className to dialog title', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle className="custom-title">Test Title</DialogTitle>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText('Open'))

    const titleElement = screen.getByText('Test Title')
    expect(titleElement).toHaveClass('custom-title')
  })

  it('should apply custom className to dialog description', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription className="custom-desc">Test Description</DialogDescription>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText('Open'))

    const descElement = screen.getByText('Test Description')
    expect(descElement).toHaveClass('custom-desc')
  })

  it('should apply custom className to dialog header', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader className="custom-header">
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText('Open'))

    const headerElement = screen.getByText('Title').parentElement
    expect(headerElement).toHaveClass('custom-header')
  })

  it('should apply custom className to dialog footer', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogFooter className="custom-footer">
            <button>OK</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )

    await user.click(screen.getByText('Open'))

    const footerElement = screen.getByRole('button', { name: 'OK' }).parentElement
    expect(footerElement).toHaveClass('custom-footer')
  })
})
