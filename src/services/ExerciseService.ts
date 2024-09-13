import api from "./api"
import { Exercise } from "./types"

export async function getExercicies(): Promise<Exercise[]> {
    const response = await api.get(`/exercise`)
    return response.data.data
}

export async function createExercise(exercise: Exercise): Promise<Exercise> {
    const response = await api.post(`/exercise`, exercise)
    return response.data.data
}

export async function updateExercise(exercise: Exercise): Promise<Exercise> {
    const response = await api.patch(`/exercise/${exercise.id}`, {...exercise, id: undefined})
    return response.data.data
}

export async function getExercise(id: string): Promise<Exercise> {
    const response = await api.get(`/exercise/${id}`)
    return response.data
}