import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, RefreshControl, Text, View } from 'react-native';
import { Layout } from '../../components/Layout/Layout';
import styles from "./HomePageStyles";
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Button } from '../../components/Button/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SocialPostInput } from '../../components/SocialPost/SocialPost';
import { Post } from '../../services/types';
import { getFriendsPosts } from '../../services/PostService';
import { useAuth } from '../../context/Auth';
import { PostComponent } from '../ProfilePage/Post';

export function HomePage({ navigation }: { navigation: any }) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const {authData} = useAuth();

    async function loadPosts(){
        const posts = await getFriendsPosts()
        setPosts(posts)
    }

    function loadAll(){
        loadPosts()
    }

    useEffect(() => {
        loadAll()
    }, [])

    return (
        <Layout
            page='home'
            navigation={navigation}
            hasNavbar={true}
            scrollable={true}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={loadAll}
                />
            }
        >
            <View>
                <ImageBackground
                    source={require("./home.png")} // URL da imagem de fundo
                    style={styles.homeImage}
                >
                    <LinearGradient style={styles.gradiant1} colors={['rgba(0, 0, 0, 0.8)', "transparent"]}/>
                    <View style={styles.homeImageContainer}>
                        <Text style={styles.academyTitle}>Academia FitNexus</Text>
                        <Text style={styles.academySubTitle}>Olá, {authData?.name}!</Text>
                    </View>
                    <LinearGradient style={styles.gradiant2} colors={["transparent", 'rgba(0, 0, 0, 0.8)']}/>
                </ImageBackground>
                <View>
                    <Text style={styles.homeItemTitle}>Progresso semanal</Text>
                    <View style={styles.semanalProgressContainer}>
                        <View style={styles.progressValueContainer}>
                            <Text style={styles.progressValue}>2</Text>
                            <Text style={styles.progressTotalValue}>/4</Text>
                        </View>
                        <View style={styles.progressContainer}>
                            <Text style={styles.progressLabel}>Você treinou 2 vezes essa semana</Text>
                            <ProgressBar progress={50} />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.homeItemTitle}>Meus desafios</Text>
                    <View style={styles.challengeContainer}>
                        <Text style={styles.progressLabel}>Desafio com João</Text>
                        <View style={styles.challengeProgressContainer}>
                            <View style={styles.challengeProgressBarContainer}><ProgressBar progress={50} /></View>
                            <Text style={styles.progressLabel}>50%</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.homeItemTitle}>Meus Treinos</Text>
                    <View style={styles.buttonsContainer}>
                        <View style={styles.buttonContainer}>
                            <Button
                                type='terciary'
                                label='Braço'
                                callback={()=>{
                                    navigation.navigate("TreinoPage")
                                }}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                type='terciary'
                                label='Peito'
                                callback={()=>{
                                    navigation.navigate("TreinoPage")
                                }}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                type='terciary'
                                label='Perna'
                                callback={()=>{
                                    navigation.navigate("TreinoPage")
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.homeItemTitle}>Timeline</Text>
                    <View style={{ paddingLeft: 20, paddingRight: 20}}><SocialPostInput reload={loadPosts}/></View>
                    <View style={styles.postsContainer}>
                        {posts.map((post, index) => {
                            return <PostComponent key={index} post={post} reload={loadPosts} setLoading={setLoading}/>
                        })}
                    </View>
                </View>
            </View>
        </Layout>
    )
}