import { Profile } from "../context/ProfileContext";
import api from "./api";

export async function getMyFriends(): Promise<Profile[]> {
  const response = await api.get(`/user/friends`);
  return response.data.data;
}

export async function getMySolicitations(): Promise<Profile[]> {
  const response = await api.get(`/user/friends/solicitations`);
  return response.data.data;
}

export async function acceptFriend(id: string) {
  return await api.post(`/user/friends/accept/${id}`);
}

export async function refuseFriend(id: string) {
  return await api.post(`/user/friends/reject/${id}`);
}
