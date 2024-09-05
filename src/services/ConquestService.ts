import api from "./api"
import { Conquest } from "./types"

export async function getMyConquests(): Promise<Conquest[]>{
    const response = await api.get('/conquest/me')
    return response.data
}