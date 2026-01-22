import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import OnboardingFlow from '@/features/onboarding/OnboardingFlow'
import { useUserStore } from '@/store/useUserStore'

describe('OnboardingFlow', () => {
  beforeEach(() => {
    useUserStore.getState().resetProfile()
  })

  it('should render step 1 with name input', () => {
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    expect(screen.getByText(/Welcome to MemoryApp 🧠/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument()
  })

  it('should have continue button disabled when name is empty', () => {
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    const continueButton = screen.getByRole('button', { name: /Continue/i })
    expect(continueButton).toBeDisabled()
  })

  it('should enable continue button when name is entered', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    const nameInput = screen.getByPlaceholderText('Enter your name')
    await user.type(nameInput, 'Test User')

    const continueButton = screen.getByRole('button', { name: /Continue/i })
    expect(continueButton).not.toBeDisabled()
  })

  it('should navigate to step 2 when continue is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    const nameInput = screen.getByPlaceholderText('Enter your name')
    await user.type(nameInput, 'Test User')

    const continueButton = screen.getByRole('button', { name: /Continue/i })
    await user.click(continueButton)

    expect(screen.getByText("What's your primary goal?")).toBeInTheDocument()
  })

  it('should display all goal options in step 2', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    // Get to step 2
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Test User')
    await user.click(screen.getByRole('button', { name: /Continue/i }))

    expect(screen.getByText('Improve Focus')).toBeInTheDocument()
    expect(screen.getByText('Learn Faster')).toBeInTheDocument()
    expect(screen.getByText('Boost Memory')).toBeInTheDocument()
    expect(screen.getByText('Increase Intelligence')).toBeInTheDocument()
  })

  it('should allow selecting a goal in step 2', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    // Get to step 2
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Test User')
    await user.click(screen.getByRole('button', { name: /Continue/i }))

    // Select a goal
    const focusButton = screen.getByText('Improve Focus').closest('button')
    await user.click(focusButton!)

    // Should have selected styling
    expect(focusButton).toHaveClass('border-primary')
  })

  it('should navigate back to step 1 from step 2', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    // Get to step 2
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Test User')
    await user.click(screen.getByRole('button', { name: /Continue/i }))

    // Click back
    const backButton = screen.getByRole('button', { name: /Back/i })
    await user.click(backButton)

    expect(screen.getByText(/Welcome to MemoryApp 🧠/)).toBeInTheDocument()
  })

  it('should navigate to step 3 from step 2', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    // Get to step 2
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Test User')
    await user.click(screen.getByRole('button', { name: /Continue/i }))

    // Continue to step 3
    await user.click(screen.getByRole('button', { name: /Continue/i }))

    expect(screen.getByText("What's your experience level?")).toBeInTheDocument()
  })

  it('should display all experience level options in step 3', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    // Get to step 3
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Test User')
    await user.click(screen.getByRole('button', { name: /Continue/i }))
    await user.click(screen.getByRole('button', { name: /Continue/i }))

    expect(screen.getByText('Beginner')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
    expect(screen.getByText('Advanced')).toBeInTheDocument()
  })

  it('should allow selecting experience level in step 3', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    // Get to step 3
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Test User')
    await user.click(screen.getByRole('button', { name: /Continue/i }))
    await user.click(screen.getByRole('button', { name: /Continue/i }))

    // Select intermediate
    const intermediateButton = screen.getByText('Intermediate').closest('button')
    await user.click(intermediateButton!)

    expect(intermediateButton).toHaveClass('border-primary')
  })

  it('should navigate back to step 2 from step 3', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    // Get to step 3
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Test User')
    await user.click(screen.getByRole('button', { name: /Continue/i }))
    await user.click(screen.getByRole('button', { name: /Continue/i }))

    // Click back
    const backButton = screen.getByRole('button', { name: /Back/i })
    await user.click(backButton)

    expect(screen.getByText("What's your primary goal?")).toBeInTheDocument()
  })

  it('should complete onboarding and create profile', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    // Complete all steps
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Test User')
    await user.click(screen.getByRole('button', { name: /Continue/i }))

    // Select goal
    await user.click(screen.getByText('Boost Memory').closest('button')!)
    await user.click(screen.getByRole('button', { name: /Continue/i }))

    // Select experience level
    await user.click(screen.getByText('Beginner').closest('button')!)
    await user.click(screen.getByRole('button', { name: /Start Training/i }))

    // Check profile was created
    const profile = useUserStore.getState().profile
    expect(profile).toBeDefined()
    expect(profile?.name).toBe('Test User')
    expect(profile?.goal).toBe('memory')
    expect(profile?.experienceLevel).toBe('beginner')
  })

  it('should mark onboarding as completed', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    // Complete all steps
    await user.type(screen.getByPlaceholderText('Enter your name'), 'Test User')
    await user.click(screen.getByRole('button', { name: /Continue/i }))
    await user.click(screen.getByRole('button', { name: /Continue/i }))
    await user.click(screen.getByRole('button', { name: /Start Training/i }))

    // Check onboarding completed - it's part of the profile object
    const profile = useUserStore.getState().profile
    expect(profile?.onboardingCompleted).toBe(true)
  })

  it('should preserve name when navigating back and forth', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <OnboardingFlow />
      </MemoryRouter>
    )

    // Enter name
    const nameInput = screen.getByPlaceholderText('Enter your name')
    await user.type(nameInput, 'Test User')
    await user.click(screen.getByRole('button', { name: /Continue/i }))

    // Go back
    await user.click(screen.getByRole('button', { name: /Back/i }))

    // Name should still be there
    const preservedInput = screen.getByDisplayValue('Test User')
    expect(preservedInput).toBeInTheDocument()
  })
})
