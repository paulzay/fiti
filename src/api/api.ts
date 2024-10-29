import { Exercise, Goal } from '@/types';
import { getCookie } from '../utils/methods';
const baseUrl = 'http://localhost:8000/api/v1'

let token: string | null = null;

function refreshToken() {
  token = getCookie('auth') ?? null;
}

refreshToken();

export async function addExerciseLog(exercise: Exercise) {
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

export async function getExerciseLog() {
  const response = await fetch(`${baseUrl}/user/exerciseLog`,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.json();
}

export async function deleteExerciseLog(id: string) {
  const response = await fetch(`${baseUrl}/exerciseLog/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response;
}

export async function updateExerciseLog(id: string, exercise: Exercise) {
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

export async function setGoal(goal: Goal) {
  const response = await fetch(`${baseUrl}user/goal`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(goal)
  })
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