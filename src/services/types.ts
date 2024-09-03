export type Post = {
    id: string,
    content: string,
    image: string,
    createdAt: Date,
    likes: Profile[],
    user: Profile,
}

export type Profile = {
    id: string,
    name: string,
    image: string,
    goal: string,
    workouts_per_week: number,
    description: string,
    friends: Profile[],
    posts: Post[],
    friendsRequests: Profile[],
}