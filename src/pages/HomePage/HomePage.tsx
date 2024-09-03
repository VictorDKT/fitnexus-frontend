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
import Icon from "react-native-vector-icons/FontAwesome";
import { SocialPostInput } from "../../components/SocialPost/SocialPost";
import { Post, Profile, Training } from "../../services/types";
import { getFriendsPosts } from "../../services/PostService";
import { useAuth } from "../../context/Auth";
import { PostComponent } from "../ProfilePage/Post";
import { getMyTrainings } from "../../services/TrainingService";
import { getProfile } from "../../services/ProfileService";

export function HomePage({ navigation }: { navigation: any }) {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const { authData } = useAuth();

  async function loadPosts() {
    const posts = await getFriendsPosts();
    setPosts(posts);
  }

  async function loadTrainings() {
    const trainings = await getMyTrainings(authData?._id || "");
    setTrainings(trainings);
  }

  async function loadProfile() {
    const profile = await getProfile(authData?._id || "");
    setProfile(profile);
  }

  function loadAll() {
    loadPosts();
    loadTrainings();
    loadProfile()
  }

  useEffect(() => {
    loadAll();
  }, [authData?._id]);

  return (
    <Layout
      page="home"
      navigation={navigation}
      hasNavbar={true}
      scrollable={true}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadAll} />
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
            <Text style={styles.academySubTitle}>Olá, {authData?.name}!</Text>
          </View>
          <LinearGradient
            style={styles.gradiant2}
            colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
          />
        </ImageBackground>
        <View>
          <Text style={styles.homeItemTitle}>Progresso semanal</Text>
          <View style={styles.semanalProgressContainer}>
            <View style={styles.progressValueContainer}>
              <Text style={styles.progressValue}>{profile.training_dates?.length}</Text>
              <Text style={styles.progressTotalValue}>/{profile.workouts_per_week}</Text>
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.progressLabel}>
                Você treinou {profile.training_dates?.length} vezes essa semana
              </Text>
              <ProgressBar progress={(profile.training_dates?.length/profile.workouts_per_week) * 100} />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.homeItemTitle}>Meus desafios</Text>
          <View style={styles.challengeContainer}>
            <Text style={styles.progressLabel}>Desafio com João</Text>
            <View style={styles.challengeProgressContainer}>
              <View style={styles.challengeProgressBarContainer}>
                <ProgressBar progress={50} />
              </View>
              <Text style={styles.progressLabel}>50%</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.homeItemTitle}>Meus Treinos</Text>
          <View style={styles.buttonsContainer}>
            {trainings.map((training, index) => (
              <View style={styles.buttonContainer} key={index}>
                <Button
                  type="terciary"
                  label={training.name}
                  callback={() => {
                    navigation.navigate("TreinoPage", { training });
                  }}
                />
              </View>
            ))}
          </View>
        </View>
        <View>
          <Text style={styles.homeItemTitle}>Timeline</Text>
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <SocialPostInput reload={loadPosts} />
          </View>
          <View style={styles.postsContainer}>
            {posts.map((post, index) => {
              return (
                <PostComponent
                  key={index}
                  post={post}
                  reload={loadPosts}
                  setLoading={setLoading}
                />
              );
            })}
          </View>
        </View>
      </View>
    </Layout>
  );
}
