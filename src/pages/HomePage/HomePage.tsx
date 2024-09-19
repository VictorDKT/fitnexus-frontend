import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from "./HomePageStyles";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { Button } from "../../components/Button/Button";
import { SocialPostInput } from "../../components/SocialPost/SocialPost";
import { Challenge, Post, Profile, Training } from "../../services/types";
import { getFriendsPosts } from "../../services/PostService";
import { useAuth } from "../../context/Auth";
import { PostComponent } from "../ProfilePage/Post";
import { getMyTrainings } from "../../services/TrainingService";
import { getProfile } from "../../services/ProfileService";
import { getMyChallenges } from "../../services/ChallengeService";
import { ChallengeComponent } from "../MissionsPage/MissionsPage";
import { closeLoader, openLoader } from "../../components/Layout/Loader/Loader";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons'

export function HomePage({ navigation }: { navigation: any }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const { authData } = useAuth();

  async function loadPosts() {
    return getFriendsPosts().then(posts=>{
      setPosts(posts);
    });
  }

  async function loadTrainings() {
    return getMyTrainings(authData?._id || "").then(trainings=>{
      setTrainings(trainings);
    });
  }

  async function loadProfile() {
    return getProfile(authData?._id || "").then(profile=>{
      setProfile(profile);
    });
  }

  async function loadChallenges() {
    return getMyChallenges().then(challenges=>{
      setChallenges(challenges);
    });
  }

  async function loadAll() {
    openLoader();
    const r = await Promise.all([loadPosts(), loadTrainings(), loadProfile(), loadChallenges()]);
    closeLoader();
  }

  useEffect(() => {
    if (!authData?._id) return;
    loadAll();
  }, [authData?._id]);

  return (
    <Layout
      page="home"
      navigation={navigation}
      hasNavbar={true}
      scrollable={true}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={loadAll} />
      }
    >
      <View>
        <ImageBackground
          source={require("./home.png")} // URL da imagem de fundo
          style={styles.homeImage}
        >
          <LinearGradient
            style={styles.gradiant1}
            colors={["rgba(0, 0, 0, 0.8)", "transparent"]}
          />
          <View style={styles.homeImageContainer}>
            <Text style={styles.academyTitle}>Academia FitNexus</Text>
            <Text style={styles.academySubTitle}>Olá, {authData?.name?.trim()}!</Text>
          </View>
          <LinearGradient
            style={styles.gradiant2}
            colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
          />
        </ImageBackground>
        <View style={{marginBottom: 20, marginTop: 20}}>
          <Text style={styles.homeItemTitle}>Progresso semanal</Text>
          <View style={styles.semanalProgressContainer}>
            <View style={styles.progressValueContainer}>
              <Text style={styles.progressValue}>{profile.training_dates?.length}</Text>
              <Text style={styles.progressTotalValue}>/{profile.workouts_per_week}</Text>
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.progressLabel}>
                Você treinou {profile.training_dates?.length} {profile.training_dates?.length !== 1 ? 'vezes' : 'vez'} nessa semana
              </Text>
              <ProgressBar progress={(profile.training_dates?.length/profile.workouts_per_week) * 100} />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.homeItemTitle}>Meus desafios</Text>
          {challenges.map((challenge, index) => (
            <ChallengeComponent key={index} challenge={challenge} />
          ))}
        </View>
        <View>
          <Text style={styles.homeItemTitle}>Meus Treinos</Text>
          <View style={styles.buttonsContainer}>
            {trainings.map((training, index) => (
              <View style={{...styles.buttonContainer, marginBottom: index === trainings.length -1 ? 0 : 20}} key={index}>
                <TouchableOpacity 
                  style={styles.exerciseButtom}
                  onPress={()=>{
                    navigation.navigate("TreinoPage", { training })
                  }}
                >
                  <View style={{flex: 1}}>
                    <Text style={styles.exerciseButtomText}>{training.name}</Text>
                  </View>
                  <View>
                    <Icon
                      name="chevron-forward"
                      style={styles.exerciseButtomIcon}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.homeItemTitle}>Timeline</Text>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <SocialPostInput reload={loadPosts} setLoading={(value: boolean)=>{value ? openLoader() : closeLoader()}}/>
          </View>
          <View style={styles.postsContainer}>
            {posts.map((post, index) => {
              return (
                <PostComponent
                  key={index}
                  post={post}
                  reload={loadPosts}
                  setLoading={(value: boolean)=>{value ? openLoader() : closeLoader()}}
                />
              );
            })}
          </View>
        </View>
      </View>
    </Layout>
  );
}
