import { Image, ImageBackground, Text, View } from "react-native";
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
import { CommonActions } from '@react-navigation/native';

export function ProfilePage({ navigation }: { navigation: any }) {
    const {signOut, authData} = useAuth();
    const [profile, setProfile] = useState<Profile>({} as Profile);
    const [loading, setLoading] = useState(false);

    async function loadProfile(){
        setLoading(true);
        const profile = await getProfile(authData?._id || '')
        setProfile(profile);
        setLoading(false);
    }

    useEffect(() => {
        loadProfile()
    }, [])

    return (
        <Layout
            page='profile'
            navigation={navigation}
            hasNavbar={true}
            scrollable={true}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={loadProfile}
                />
            }
        >
            <View>
                <PageHeader
                    title="Perfil"
                    logoutFunction={async ()=>{
                        await signOut()
                        navigation.navigate('LoginPage')
                    }}
                    editFunction={()=>{
                        //
                    }}
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
                        <View style={styles.friendImagesContainer}>
                            {profile.friends?.map((friend, index) => {
                                return (
                                    <Image
                                        key={index}
                                        style={styles.friendImage}
                                        source={{uri: friend.image}}
                                    />
                                )
                            })}

                        </View>
                    </View>
                    <View style={styles.achivementsBox}>
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
                    </View>
                    <View style={styles.postBox}>
                        <Text style={styles.postTitle}>Publicações</Text>
                        <SocialPostInput reload={loadProfile}/>
                        {profile.posts?.map((post, index) => {
                            return <PostComponent key={index} post={post} reload={loadProfile} setLoading={setLoading}/>
                        })}
                      
                    </View>
                </View>
            </View>
        </Layout>
    )
}