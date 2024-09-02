import { Image, ImageBackground, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from './ProfilePageStyles';
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import { SocialPostInput } from "../../components/SocialPost/SocialPost";

export function ProfilePage({ navigation }: { navigation: any }) {
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
                    logoutFunction={()=>{
                        navigation.navigate("LoginPage")
                    }}
                    editFunction={()=>{
                        //
                    }}
                />
                <View>
                    <View style={styles.profileBox}>
                        <Image
                            style={styles.profilePicture}
                            source={require("./mock/foto.png")}
                        />
                        <Text style={styles.profileTitle}>Marcelo</Text>
                        <Text style={styles.profileText}>Treina por: Saúde</Text>
                        <Text style={styles.profileText}>Gosto de treinar e ouvir música</Text>
                    </View>
                    <View style={styles.friendsBox}>
                        <Text style={styles.friendsBoxTitle}>Amigos</Text>
                        <View style={styles.friendImagesContainer}>
                            <Image
                                style={styles.friendImage}
                                source={require("./mock/friend.png")}
                            />
                            <Image
                                style={styles.friendImage}
                                source={require("./mock/friend.png")}
                            />
                            <Image
                                style={styles.friendImage}
                                source={require("./mock/friend.png")}
                            />
                            <Image
                                style={styles.friendImage}
                                source={require("./mock/friend.png")}
                            />
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
                        <ImageBackground
                                source={require("./mock/post.png")} // URL da imagem de fundo
                                style={styles.post}
                        >
                            <View style={styles.postHeader}>
                                <Image
                                    source={require("./mock/foto.png")} // URL da imagem de fundo
                                    style={styles.postUserImage}
                                />
                                <View style={styles.postUserInfo}>
                                    <Text style={styles.postUserName}>Marcelo</Text>
                                    <Text style={styles.postTime}>há 5 minutos</Text>
                                </View>
                            </View>
                            <View style={styles.postData}>
                                <Text style={styles.postText}>Dia de treino muito divertido com meus amigos!</Text>
                                <Icon name="heart" style={styles.postLiked}/>
                            </View>
                        </ImageBackground>
                        <ImageBackground
                                source={require("./mock/post.png")} // URL da imagem de fundo
                                style={styles.post}
                        >
                            <View style={styles.postHeader}>
                                <Image
                                    source={require("./mock/foto.png")} // URL da imagem de fundo
                                    style={styles.postUserImage}
                                />
                                <View style={styles.postUserInfo}>
                                    <Text style={styles.postUserName}>Marcelo</Text>
                                    <Text style={styles.postTime}>há 5 minutos</Text>
                                </View>
                            </View>
                            <View style={styles.postData}>
                                <Text style={styles.postText}>Dia de treino muito divertido com meus amigos!</Text>
                                <Icon name="heart-o" style={styles.postLike}/>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        </Layout>
    )
}