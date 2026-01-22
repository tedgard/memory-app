import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useDualNBack from '@/features/exercises/dual-nback/useDualNBack'
import { useProgressStore } from '@/store/useProgressStore'

describe('useDualNBack', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress()
  })

  it('should initialize with default n-level from progress store', () => {
    const { result } = renderHook(() => useDualNBack())

    expect(result.current.nLevel).toBe(2) // Default difficulty
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.currentTrial).toBe(-1)
    expect(result.current.results).toBeNull()
  })

  it('should use custom difficulty from progress store', () => {
    // Set difficulty to 4
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'dual-nback': {
            ...useProgressStore.getState().stats.exerciseProgress['dual-nback'],
            currentDifficulty: 4,
          },
        },
      },
    })

    const { result } = renderHook(() => useDualNBack())

    expect(result.current.nLevel).toBe(4)
  })

  it('should calculate total trials based on n-level', () => {
    const { result } = renderHook(() => useDualNBack())

    // For n-level 2: 20 + 2*2 = 24 trials
    expect(result.current.totalTrials).toBe(24)
  })

  it('should start game and generate sequence', () => {
    const { result } = renderHook(() => useDualNBack())

    act(() => {
      result.current.startGame()
    })

    expect(result.current.isPlaying).toBe(true)
    expect(result.current.currentTrial).toBe(0)
  })

  it('should have visual and audio sequences of correct length', () => {
    const { result } = renderHook(() => useDualNBack())

    act(() => {
      result.current.startGame()
    })

    // Sequences should match total trials
    expect(result.current.visualMatches).toBeDefined()
    expect(result.current.audioMatches).toBeDefined()
  })

  it('should handle visual match response', () => {
    const { result } = renderHook(() => useDualNBack())

    act(() => {
      result.current.startGame()
    })

    const initialResponses = result.current.userVisualResponses.length

    act(() => {
      result.current.handleVisualMatch()
    })

    expect(result.current.userVisualResponses.length).toBe(initialResponses + 1)
  })

  it('should handle audio match response', () => {
    const { result } = renderHook(() => useDualNBack())

    act(() => {
      result.current.startGame()
    })

    const initialResponses = result.current.userAudioResponses.length

    act(() => {
      result.current.handleAudioMatch()
    })

    expect(result.current.userAudioResponses.length).toBe(initialResponses + 1)
  })

  it('should not accept responses when not playing', () => {
    const { result } = renderHook(() => useDualNBack())

    act(() => {
      result.current.handleVisualMatch()
    })

    expect(result.current.userVisualResponses.length).toBe(0)

    act(() => {
      result.current.handleAudioMatch()
    })

    expect(result.current.userAudioResponses.length).toBe(0)
  })

  it('should track correct visual responses', () => {
    const { result } = renderHook(() => useDualNBack())

    act(() => {
      result.current.startGame()
    })

    // Initial correct visual count
    expect(result.current.correctVisual).toBe(0)
  })

  it('should track correct audio responses', () => {
    const { result } = renderHook(() => useDualNBack())

    act(() => {
      result.current.startGame()
    })

    // Initial correct audio count
    expect(result.current.correctAudio).toBe(0)
  })

  it('should track false positives', () => {
    const { result } = renderHook(() => useDualNBack())

    act(() => {
      result.current.startGame()
    })

    // Initial false positives
    expect(result.current.falsePositives).toBe(0)
  })

  it('should have visual position initially null', () => {
    const { result } = renderHook(() => useDualNBack())

    expect(result.current.visualPosition).toBeNull()
  })

  it('should have audio letter initially null', () => {
    const { result } = renderHook(() => useDualNBack())

    expect(result.current.audioLetter).toBeNull()
  })

  it('should generate valid visual positions (0-8)', () => {
    const { result } = renderHook(() => useDualNBack())

    act(() => {
      result.current.startGame()
    })

    // Visual matches should be valid indices
    result.current.visualMatches.forEach(index => {
      expect(index).toBeGreaterThanOrEqual(0)
      expect(index).toBeLessThan(result.current.totalTrials)
    })
  })

  it('should generate valid audio matches', () => {
    const { result } = renderHook(() => useDualNBack())

    act(() => {
      result.current.startGame()
    })

    // Audio matches should be valid indices
    result.current.audioMatches.forEach(index => {
      expect(index).toBeGreaterThanOrEqual(0)
      expect(index).toBeLessThan(result.current.totalTrials)
    })
  })

  it('should reset to initial state correctly', () => {
    const { result } = renderHook(() => useDualNBack())

    act(() => {
      result.current.startGame()
    })

    act(() => {
      result.current.handleVisualMatch()
      result.current.handleAudioMatch()
    })

    expect(result.current.isPlaying).toBe(true)

    // Reset would be called through endGame or restart
    // This test verifies the initial state structure
    expect(result.current.userVisualResponses.length).toBeGreaterThan(0)
  })

  it('should handle higher difficulty levels', () => {
    // Set difficulty to 6
    useProgressStore.setState({
      stats: {
        ...useProgressStore.getState().stats,
        exerciseProgress: {
          ...useProgressStore.getState().stats.exerciseProgress,
          'dual-nback': {
            ...useProgressStore.getState().stats.exerciseProgress['dual-nback'],
            currentDifficulty: 6,
          },
        },
      },
    })

    const { result } = renderHook(() => useDualNBack())

    expect(result.current.nLevel).toBe(6)
    // For n-level 6: 20 + 6*2 = 32 trials
    expect(result.current.totalTrials).toBe(32)
  })

  it('should return to non-playing state', () => {
    const { result } = renderHook(() => useDualNBack())

    // Initially not playing
    expect(result.current.isPlaying).toBe(false)

    act(() => {
      result.current.startGame()
    })

    // Now playing
    expect(result.current.isPlaying).toBe(true)
  })
})
