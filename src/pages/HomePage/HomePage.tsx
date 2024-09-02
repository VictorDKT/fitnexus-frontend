import React, { useState } from 'react';
import { Image, ImageBackground, RefreshControl, Text, View } from 'react-native';
import { Layout } from '../../components/Layout/Layout';
import styles from "./HomePageStyles";
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Button } from '../../components/Button/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SocialPostInput } from '../../components/SocialPost/SocialPost';

export function HomePage({ navigation }: { navigation: any }) {
    const [refreshing, setRefreshing] = useState(false);
    
    return (
        <Layout
            page='home'
            navigation={navigation}
            hasNavbar={true}
            scrollable={true}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => setRefreshing(true)}
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
                        <Text style={styles.academySubTitle}>Olá, Marcelo!</Text>
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
                    <View style={{ paddingLeft: 20, paddingRight: 20}}><SocialPostInput/></View>
                    <View style={styles.postsContainer}>
                        <ImageBackground
                            source={require("./mock/post.png")} // URL da imagem de fundo
                            style={styles.post}
                        >
                            <View style={styles.postHeader}>
                                <Image
                                    source={require("./mock/profile.png")} // URL da imagem de fundo
                                    style={styles.postUserImage}
                                />
                                <View style={styles.postUserInfo}>
                                    <Text style={styles.postUserName}>Julia</Text>
                                    <Text style={styles.postTime}>há 5 minutos</Text>
                                </View>
                            </View>
                            <View style={styles.postData}>
                                <Text style={styles.postText}>Dia de treino muito divertido com meus amigos!</Text>
                                <Icon name="heart-o" style={styles.postLike}/>
                            </View>
                        </ImageBackground>
                        <ImageBackground
                            source={require("./mock/post.png")} // URL da imagem de fundo
                            style={styles.post}
                        >
                            <View style={styles.postHeader}>
                                <Image
                                    source={require("./mock/profile.png")} // URL da imagem de fundo
                                    style={styles.postUserImage}
                                />
                                <View style={styles.postUserInfo}>
                                    <Text style={styles.postUserName}>Julia</Text>
                                    <Text style={styles.postTime}>há 5 minutos</Text>
                                </View>
                            </View>
                            <View style={styles.postData}>
                                <Text style={styles.postText}>Dia de treino muito divertido com meus amigos!</Text>
                                <Icon name="heart" style={styles.postLiked}/>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </View>
        </Layout>
    )
}