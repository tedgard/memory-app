export type ExerciseType =
  | 'dual-nback'
  | 'sequence-memory'
  | 'pattern-recognition'
  | 'operation-span'
  | 'spatial-memory';

export interface ExerciseConfig {
  id: ExerciseType;
  name: string;
  description: string;
  icon: string;
  difficulty: number;
  duration: number; // in seconds
  estimatedTime: number; // in minutes
  benefits: string[];
  instructions: string[];
}

export interface DualNBackConfig {
  nLevel: number; // 1-8
  gridSize: 3;
  stimulusDuration: number; // ms
  intervalDuration: number; // ms
  trialsPerSession: number;
}

export interface SequenceMemoryConfig {
  sequenceLength: number;
  displaySpeed: number; // ms per item
  maxLength: number;
}

export interface PatternRecognitionConfig {
  complexity: number; // 1-10
  displayDuration: number; // ms
  patternSize: number;
}

export interface OperationSpanConfig {
  operationComplexity: number;
  memoryLoad: number;
  timeLimit: number; // ms per operation
}

export interface SpatialMemoryConfig {
  gridSize: number; // 4x4 to 6x6
  sequenceLength: number;
  displaySpeed: number; // ms
}

export interface SessionMetrics {
  id: string;
  exerciseType: ExerciseType;
  difficulty: number;
  duration: number; // seconds
  trialsCompleted: number;
  accuracy: number; // 0-100%
  reactionTime: number; // average ms
  score: number;
  timestamp: Date;
  nBackLevel?: number;
  longestStreak?: number;
  visualAccuracy?: number;
  audioAccuracy?: number;
  falsePositives?: number;
}

export interface ExerciseStats {
  totalSessions: number;
  totalTime: number; // minutes
  averageAccuracy: number;
  averageScore: number;
  bestScore: number;
  currentDifficulty: number;
  lastPlayed: Date | null;
}

export interface ExerciseResult {
  score: number;
  accuracy: number;
  reactionTime: number;
  trialsCompleted: number;
  metrics: Record<string, number>;
  achievements?: string[];
}
