import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'active', false && 'inactive')
      expect(result).toBe('base active')
    })

    it('should merge Tailwind classes correctly', () => {
      const result = cn('px-2 py-1', 'px-4')
      expect(result).toBe('py-1 px-4') // px-4 overrides px-2
    })

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle objects with boolean values', () => {
      const result = cn({
        'class1': true,
        'class2': false,
        'class3': true,
      })
      expect(result).toBe('class1 class3')
    })

    it('should handle undefined and null values', () => {
      const result = cn('class1', undefined, null, 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle complex Tailwind merge cases', () => {
      const result = cn('bg-red-500 text-white', 'bg-blue-500')
      expect(result).toBe('text-white bg-blue-500')
    })

    it('should handle mixed input types', () => {
      const result = cn(
        'base',
        { 'conditional': true },
        ['array1', 'array2'],
        undefined,
        'final'
      )
      expect(result).toContain('base')
      expect(result).toContain('conditional')
      expect(result).toContain('array1')
      expect(result).toContain('array2')
      expect(result).toContain('final')
    })
  })
})
