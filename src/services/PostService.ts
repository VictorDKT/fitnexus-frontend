import api from "./api"

export async function createPost(content: string, image: string) {
    const response = await api.post('/post/me', {content, image})
    return response.data
}

export async function likePost(id: string) {
    const response = await api.post(`/post/like/${id}`)
    return response.data
}

export async function getMyPosts(){
    const response = await api.get('/post/me')
    return response.data.data
}

export async function getFriendsPosts(){
    const response = await api.get('/post')
    return response.data.data
}