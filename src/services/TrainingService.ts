import api from "./api"
import { Training } from "./types"

export async function getMyTrainings(id: string): Promise<Training[]> {
    const response = await api.get(`/training/user/${id}`)
    return response.data.data
}