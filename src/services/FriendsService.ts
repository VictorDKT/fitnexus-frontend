import api from "./api";
import { Profile } from "./types";

export async function getMyFriends(): Promise<Profile[]> {
  const response = await api.get(`/user/friends`);
  return response.data.data;
}

export async function getUsers(): Promise<Profile[]> {
  const response = await api.get(`/users`);
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

export async function requestFriend(id: string) {
  return await api.post(`/user/friends/request/${id}`);
}

export async function getFriendSuggestions(name: string){
  const response = await api.get(`/user/friends/suggestions`, {params: {name}});
  return response.data.data;
}