import { Profile } from "../context/ProfileContext";
import api from "./api";

export async function getProfile(id: string): Promise<Profile> {
    const response = await api.get(`/user/profile/${id}`);
    return response.data
}