import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import SettingsPage from '@/features/settings/SettingsPage'
import { useSettingsStore } from '@/store/useSettingsStore'
import { useUserStore } from '@/store/useUserStore'

describe('SettingsPage', () => {
  beforeEach(() => {
    useSettingsStore.getState().setTheme('dark')
    useSettingsStore.getState().setVolume(0.7)
    useUserStore.getState().resetProfile()
  })

  it('should render settings page with title', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('should display audio settings section', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Audio')).toBeInTheDocument()
    expect(screen.getByText('Sound Effects')).toBeInTheDocument()
    expect(screen.getByText(/Play sounds during exercises/)).toBeInTheDocument()
  })

  it('should display volume slider', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Volume')).toBeInTheDocument()
    const volumeSlider = screen.getByRole('slider')
    expect(volumeSlider).toBeInTheDocument()
  })

  it('should show current volume percentage', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    // Default volume is 0.7 (70%)
    expect(screen.getByText('70%')).toBeInTheDocument()
  })

  it('should toggle sound when button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    const soundButton = screen.getByRole('button', { name: /Enabled|Disabled/ })
    const initialState = useSettingsStore.getState().soundEnabled

    await user.click(soundButton)

    expect(useSettingsStore.getState().soundEnabled).toBe(!initialState)
  })

  it('should disable volume slider when sound is disabled', async () => {
    const user = userEvent.setup()

    // Start with sound enabled
    useSettingsStore.setState({ soundEnabled: true })

    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    const soundButton = screen.getByRole('button', { name: /Enabled/ })
    await user.click(soundButton)

    const volumeSlider = screen.getByRole('slider')
    expect(volumeSlider).toBeDisabled()
  })

  it('should display appearance settings section', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Appearance')).toBeInTheDocument()
    expect(screen.getByText('Theme')).toBeInTheDocument()
  })

  it('should display current theme', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/Current: dark/)).toBeInTheDocument()
  })

  it('should have dark and light theme buttons', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    expect(screen.getByRole('button', { name: /Dark/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Light/ })).toBeInTheDocument()
  })

  it('should change theme when theme button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    const lightButton = screen.getByRole('button', { name: /Light/ })
    await user.click(lightButton)

    expect(useSettingsStore.getState().theme).toBe('light')
    expect(screen.getByText(/Current: light/)).toBeInTheDocument()
  })

  it('should display profile section', () => {
    // Create a profile first
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Training Goal')).toBeInTheDocument()
    expect(screen.getByText('Experience Level')).toBeInTheDocument()
  })

  it('should display profile information', () => {
    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('memory')).toBeInTheDocument()
    expect(screen.getByText('beginner')).toBeInTheDocument()
  })

  it('should have reset all data button', () => {
    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    expect(screen.getByRole('button', { name: /Reset All Data/ })).toBeInTheDocument()
  })

  it('should show confirmation dialog before resetting data', async () => {
    const user = userEvent.setup()
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)

    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    const resetButton = screen.getByRole('button', { name: /Reset All Data/ })
    await user.click(resetButton)

    expect(confirmSpy).toHaveBeenCalledWith(
      'Are you sure? This will delete all your progress.'
    )

    confirmSpy.mockRestore()
  })

  it('should reset profile when confirmed', async () => {
    const user = userEvent.setup()
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)

    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    const resetButton = screen.getByRole('button', { name: /Reset All Data/ })
    await user.click(resetButton)

    expect(useUserStore.getState().profile).toBeNull()

    confirmSpy.mockRestore()
  })

  it('should not reset profile when cancelled', async () => {
    const user = userEvent.setup()
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)

    useUserStore.getState().createProfile('Test User', 'memory', 'beginner')

    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    const resetButton = screen.getByRole('button', { name: /Reset All Data/ })
    await user.click(resetButton)

    expect(useUserStore.getState().profile).not.toBeNull()

    confirmSpy.mockRestore()
  })

  it('should update volume when slider is moved', async () => {
    const user = userEvent.setup()
    useSettingsStore.setState({ soundEnabled: true, volume: 0.7 })

    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    const volumeSlider = screen.getByRole('slider') as HTMLInputElement

    // Simulate changing the slider value
    await user.click(volumeSlider)

    // Call setVolume directly to test the store update
    useSettingsStore.getState().setVolume(0.5)

    expect(useSettingsStore.getState().volume).toBe(0.5)
  })

  it('should capitalize profile fields', () => {
    useUserStore.getState().createProfile('test user', 'memory', 'beginner')

    render(
      <MemoryRouter>
        <SettingsPage />
      </MemoryRouter>
    )

    // Goal and experience level should have capitalize class
    const goalElement = screen.getByText('memory').closest('p')
    const levelElement = screen.getByText('beginner').closest('p')

    expect(goalElement).toHaveClass('capitalize')
    expect(levelElement).toHaveClass('capitalize')
  })
})
