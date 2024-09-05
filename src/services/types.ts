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
    training_dates: Date[],
    conquests: Conquest[],
    solicitated?: boolean,
}

export type Conquest = {
    id: string,
    name: string,
    description: string,
    image: string,
}

export type Training = {
    id: string,
    name: string,
    exercises: TrainingExercise[],
    image: string,
}

export type TrainingExercise = {
    id: string,
    load: number,
    series: number,
    repetitions: number,
    exercise: Exercise,
}

export type Exercise = {
    id: string,
    name: string,
    description: string,
    image: string,
}