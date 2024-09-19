import api from "./api"
import { Conquest } from "./types"

export async function getMyConquests(): Promise<Conquest[]>{
    const response = await api.get('/conquest/me')
    return response.data
}

export async function getAllConquests(): Promise<Conquest[]>{
    const response = await api.get('/conquest')
    return response.data
}