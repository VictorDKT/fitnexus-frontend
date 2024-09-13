import api from "./api";
import { Profile } from "./types";

export async function getProfile(id: string): Promise<Profile> {
    const response = await api.get(`/user/profile/${id}`);
    return response.data
}