import { Exercise, Goal } from '@/types';
const baseUrl = 'http://localhost:8000/api/v1'
// export const baseUrl = 'https://9ea2-102-213-179-27.ngrok-free.app/api/v1'

export async function addExerciseLog(exercise: Exercise, token: string) {
  const response = await fetch(`${baseUrl}/exerciseLog`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(exercise),
  })
  return response;
}

export async function getExerciseLog(token: string) {
  const response = await fetch(`${baseUrl}/user/exerciseLog`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.json();
}

export async function deleteExerciseLog(id: string, token: string) {
  const response = await fetch(`${baseUrl}/exerciseLog/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response;
}

export async function updateExerciseLog(id: string, token: string, exercise: Exercise) {
  const response = await fetch(`${baseUrl}/exerciseLog/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(exercise)
  })
  return response;
}

export async function createGoal(goal: Goal, token: string) {
  if (!goal.exerciseMinutes || !goal.exerciseFrequency || !goal.exerciseType) {
    console.error('Goal is missing required fields')
  }
  const response = await fetch(`${baseUrl}/user/goal`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(goal)
  })
  return response;
}

export async function updateGoals(goal: Goal, token: string, id: string) {
  const response = await fetch(`${baseUrl}/user/goal/:${id}`, {
  return response.json()
}

export async function updateGoal(goal: Goal) {
  const response = await fetch(`${baseUrl}/user/goal`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(goal)
  })
  return response;
}

export async function getGoal(token: string) {
  const response = await fetch(`${baseUrl}/user/goal`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.json();
}