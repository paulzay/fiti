type Exercise = {
  _id?: string
  name: string
  duration: number
  date: string
  type: string
  sets: number
  reps: number
}

type Goal = {
  exerciseMinutes: number
  exerciseFrequency: number
  exerciseType: string
}

type User = {
  name: string
  email: string
}

export type { User, Exercise, Goal };
