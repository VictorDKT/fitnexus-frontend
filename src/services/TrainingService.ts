import api from "./api"
import { Training } from "./types"

export async function getMyTrainings(id: string): Promise<Training[]> {
    const response = await api.get(`/training/user/${id}`)
    return response.data.data
}

export async function getTrainings(): Promise<Training[]> {
    const response = await api.get(`/training`)
    return response.data.data
}

export async function finishTraining(){
    const response = await api.post('/trainingdate/me')
    return response.data
}

export async function addUserToTraining(trainingId: string, userId: string){
    const response = await api.post(`/training/${trainingId}/add-user/${userId}`)
    return response.data
}

export async function createTraining(training: Training){
    const response = await api.post('/training', training)
    return response.data
}