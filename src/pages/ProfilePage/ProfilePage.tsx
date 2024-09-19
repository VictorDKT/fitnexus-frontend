import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from './ProfilePageStyles';
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SocialPostInput } from "../../components/SocialPost/SocialPost";
import { useAuth } from "../../context/Auth";
import { useEffect, useState } from "react";
import { PostComponent } from "./Post";
import { getProfile } from "../../services/ProfileService";
import { Profile } from "../../services/types";
import { closeLoader, openLoader } from "../../components/Layout/Loader/Loader";

export function ProfilePage({ 
    navigation,
    route: {
        params: { id, search, trainer },
    },
}: {
    navigation: any;
    route: { params: { id: string, search: boolean, trainer: boolean } };
}) {
    const [isEdit, setIsEdit] = useState(false);
    const {signOut, authData} = useAuth();
    const [profile, setProfile] = useState<Profile>({} as Profile);

    async function loadProfile(){
        openLoader();
        const profile = await getProfile(id || '');
        if(authData) {
            setIsEdit(authData?._id === id);
        }
        setProfile(profile);
        closeLoader();
    }

    useEffect(() => {
        loadProfile()
    }, [id])

    return (
        <Layout
            page='profile'
            navigation={navigation}
            hasNavbar={trainer ? false : isEdit ? true : false}
            hasTreinerBar={trainer}
            scrollable={true}
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={loadProfile}
                />
            }
        >
            <View>
                <PageHeader
                    title="Perfil"
                    logoutFunction={isEdit ? async ()=>{
                        await signOut(navigation)
                        navigation.navigate('LoginPage')
                    } : undefined}
                    goBackFunction={isEdit ? undefined : ()=>{
                        navigation.navigate(search ? 'SearchFriendsPage' : 'FriendsPage')
                    }}
                    editFunction={isEdit ? ()=>{
                        navigation.navigate("RegisterPage", {id: authData?._id })
                    } : undefined}
                />
                <View>
                    <View style={styles.profileBox}>
                        <Image
                            style={styles.profilePicture}
                            source={{uri: profile.image}}
                        />
                        <Text style={styles.profileTitle}>{profile.name}</Text>
                        <Text style={styles.profileText}>Treina por: {profile.goal}</Text>
                        <Text style={styles.profileText}>{profile.description}</Text>
                    </View>
                    <View style={styles.friendsBox}>
                        <Text style={styles.friendsBoxTitle}>Amigos</Text>
                        <TouchableOpacity style={styles.friendImagesContainer} onPress={()=>{navigation.navigate("FriendsPage")}}>
                            {profile.friends?.map((friend, index) => {
                                return (
                                    <Image
                                        key={index}
                                        style={styles.friendImage}
                                        source={{uri: friend.image}}
                                    />
                                )
                            })}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.achivementsBox} onPress={()=>{navigation.navigate("ConquestsPage", { fromProfile: true })}}>
                        <Text style={styles.achivementsBoxTitle}>Conquistas</Text>
                        <ScrollView style={styles.achivementsContentBox} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {profile.conquests?.map((conquest, index) => (
                                <ImageBackground
                                    key={index}
                                    style={styles.achivementImage}
                                    source={{uri: conquest.image}}
                                >
                                    <Text style={styles.achivementText} numberOfLines={1} ellipsizeMode='tail'>{conquest.name}</Text>
                                </ImageBackground>
                            ))}
                        </ScrollView>
                    </TouchableOpacity>
                    <View style={styles.postBox}>
                        <Text style={styles.postTitle}>Publicações</Text>
                        {isEdit &&
                            <SocialPostInput setLoading={(value: boolean)=>{value ? openLoader() : closeLoader()}} reload={loadProfile}/>
                        }
                        {profile.posts?.map((post, index) => {
                            return <PostComponent key={index} post={post} reload={loadProfile} setLoading={(value: boolean)=>{value ? openLoader() : closeLoader()}}/>
                        })}
                      
                    </View>
                </View>
            </View>
        </Layout>
    )
}