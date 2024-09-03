import React, { ReactNode, useState } from "react";
import { useAuth } from "./Auth";
import { getProfile } from "../services/ProfileService";

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

type ProfileContextType = {
    profile: Profile,
    loadProfile: ()=>void,
    loading: boolean,
}

const ProfileContext = React.createContext<ProfileContextType>({} as ProfileContextType);

const ProfileProvider = ({children}: {children: ReactNode}) => {
    const [profile, setProfile] = useState<Profile>({} as Profile);
    const [loading, setLoading] = useState(false);
    const {authData} = useAuth()

    async function loadProfile(){
        setLoading(true);
        const profile = await getProfile(authData?._id || '')
        setProfile(profile);
        setLoading(false);
    }

    return (
        <ProfileContext.Provider value={{profile, loadProfile, loading}}>
            {children}
        </ProfileContext.Provider>
    )
}

function useProfile() {
    const context = React.useContext(ProfileContext);
    return context;
}

export {ProfileContext, ProfileProvider, useProfile}