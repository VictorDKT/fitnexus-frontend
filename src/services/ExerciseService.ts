import api from "./api"
import { Exercise } from "./types"

export async function getExercicies(): Promise<Exercise[]> {
    const response = await api.get(`/exercise`)
    return response.data.data
}