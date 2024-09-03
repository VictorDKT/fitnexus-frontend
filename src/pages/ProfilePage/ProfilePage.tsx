import { Image, ImageBackground, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from './ProfilePageStyles';
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SocialPostInput } from "../../components/SocialPost/SocialPost";
import { useAuth } from "../../context/Auth";
import { useEffect } from "react";
import { useProfile } from "../../context/ProfileContext";
import { PostComponent } from "./Post";

export function ProfilePage({ navigation }: { navigation: any }) {
    const {signOut, authData} = useAuth();
    const {loadProfile, profile, loading} = useProfile();

    useEffect(() => {
        loadProfile()
    }, [authData?._id])

    return (
        <Layout
            page='profile'
            navigation={navigation}
            hasNavbar={true}
            scrollable={true}
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
                            <ImageBackground
                                style={styles.achivementImage}
                                source={require("./mock/achivement.png")}
                            >
                                <Text style={styles.achivementText} numberOfLines={1} ellipsizeMode='tail'>Inicianteeeeeeee</Text>
                            </ImageBackground>
                            <ImageBackground
                                style={styles.achivementImage}
                                source={require("./mock/achivement.png")}
                            >
                                <Text style={styles.achivementText} numberOfLines={1} ellipsizeMode='tail'>Iniciante</Text>
                            </ImageBackground>
                            <ImageBackground
                                style={styles.achivementImage}
                                source={require("./mock/achivement.png")}
                            >
                                <Text style={styles.achivementText} numberOfLines={1} ellipsizeMode='tail'>Iniciante</Text>
                            </ImageBackground>
                            <ImageBackground
                                style={styles.achivementImage}
                                source={require("./mock/achivement.png")}
                            >
                                <Text style={styles.achivementText} numberOfLines={1} ellipsizeMode='tail'>Iniciante</Text>
                            </ImageBackground>
                            <ImageBackground
                                style={styles.achivementImage}
                                source={require("./mock/achivement.png")}
                            >
                                <Text style={styles.achivementText} numberOfLines={1} ellipsizeMode='tail'>Iniciante</Text>
                            </ImageBackground>
                            <ImageBackground
                                style={styles.achivementImage}
                                source={require("./mock/achivement.png")}
                            >
                                <Text style={styles.achivementText} numberOfLines={1} ellipsizeMode='tail'>Iniciante</Text>
                            </ImageBackground>
                            <ImageBackground
                                style={styles.achivementImage}
                                source={require("./mock/achivement.png")}
                            >
                                <Text style={styles.achivementText} numberOfLines={1} ellipsizeMode='tail'>Iniciante</Text>
                            </ImageBackground>
                            <ImageBackground
                                style={styles.achivementImage}
                                source={require("./mock/achivement.png")}
                            >
                                <Text style={styles.achivementText} numberOfLines={1} ellipsizeMode='tail'>Iniciante</Text>
                            </ImageBackground>
                        </ScrollView>
                    </View>
                    <View style={styles.postBox}>
                        <Text style={styles.postTitle}>Publicações</Text>
                        <SocialPostInput/>
                        {profile.posts?.map((post, index) => {
                            return <PostComponent key={index} post={post}/>
                        })}
                      
                    </View>
                </View>
            </View>
        </Layout>
    )
}