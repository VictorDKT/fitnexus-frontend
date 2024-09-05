import api from "./api";
import { Challenge } from "./types";

export async function getPendingChallenges(): Promise<Challenge[]>{
    const response = await api.get('/challenge/pending')
    return response.data.data
}

export async function getMyChallenges(): Promise<Challenge[]>{
    const response = await api.get('/challenge/me')
    return response.data.data
}

export async function createChallenge(requestedId: string, workouts_goal: number, weeks_duration: number, start_date: string): Promise<Challenge>{
    const response = await api.post(`/challenge/create/${requestedId}`, {
        workouts_goal,
        weeks_duration,
        start_date
    })
    return response.data
}

export async function acceptChallenge(challengeId: string): Promise<Challenge>{
    const response = await api.post(`/challenge/accept/${challengeId}`)
    return response.data
}

export async function rejectChallenge(challengeId: string): Promise<Challenge>{
    const response = await api.post(`/challenge/reject/${challengeId}`)
    return response.data
}