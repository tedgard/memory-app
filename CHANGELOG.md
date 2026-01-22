# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-01-22

### Added
- Comprehensive test suite with 384 tests across 30 test files
- Test coverage documentation (COVERAGE_STATUS.md)
- Cleanup documentation (CLEANUP_SUMMARY.md)
- Tests for App.tsx routing and theme management
- Tests for all exercise games (DualNBack, SequenceMemory, OperationSpan, PatternRecognition, SpatialMemory)
- Tests for EducationHub, OnboardingFlow, and all UI components

### Changed
- Improved test coverage from 64.1% to 81.44% (+17.34 percentage points)
- Fixed TypeScript strict mode compliance in all test files
- Updated all test `addSession()` calls to include required fields (id, trialsCompleted, reactionTime)
- Fixed UserProfile and UserLevel type issues in test files

### Removed
- 16 empty directories (src/constants, src/utils, src/hooks, etc.)
- 6 redundant documentation files (BUILD_FIX_SUMMARY.md, COVERAGE_REPORT.md, etc.)
- Unused test directories (test/types, test/components/gamification, etc.)

### Fixed
- TypeScript compilation errors in test files
- Build process now succeeds with no errors
- All 384 tests passing with no failures

## [1.0.0] - 2026-01-21

### Added
- Initial release of MemoryApp
- 5 cognitive training exercises: Dual N-Back, Sequence Memory, Pattern Recognition, Operation Span, Spatial Memory
- Complete gamification system with XP, levels, streaks, and achievements
- User onboarding flow with goal and experience level selection
- Progress tracking with session history and statistics
- Educational content hub with 8 articles about cognitive training
- Settings page with theme switching, audio controls, and profile management
- Responsive PWA design with offline capability
- Dark theme UI with smooth animations
- Full accessibility support
