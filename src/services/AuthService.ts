import api from "./api";

export async function  loginRequest(login: string, password: string){
    const response = await api.post('/auth/login', {login, password});
    return response.data
}
