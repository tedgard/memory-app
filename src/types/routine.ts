import type { ExerciseType } from './exercise';

export interface Routine {
  id: string;
  name: string;
  description: string;
  duration: number; // total minutes
  exercises: RoutineExercise[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focus: 'balanced' | 'speed' | 'accuracy' | 'endurance';
  isCustom: boolean;
}

export interface RoutineExercise {
  exerciseType: ExerciseType;
  duration: number; // minutes
  sets: number;
  restBetweenSets: number; // seconds
  targetDifficulty?: number;
}

export interface RoutineProgress {
  routineId: string;
  currentExerciseIndex: number;
  currentSet: number;
  startTime: Date;
  completedExercises: number[];
}

export interface RoutineSchedule {
  enabled: boolean;
  days: number[]; // 0-6 (Sunday-Saturday)
  time: string; // HH:MM
  routineId: string;
  reminderEnabled: boolean;
}
