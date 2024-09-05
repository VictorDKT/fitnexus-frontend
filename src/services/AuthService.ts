import api from "./api";

export async function  loginRequest(login: string, password: string){
    const response = await api.post('/auth/login', {login, password});
    return response.data
}

export async function  registerRequest(name: string, login: string, password: string, image: string, goal: string, workouts_per_week: number, description: string){
    const response = await api.post('/auth/register', {name, login, password, image, goal, workouts_per_week, description});
    return response.data
}