import { Image, Text, TouchableOpacity, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from "./FriendsPageStyles";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Button } from "../../components/Button/Button";
import { useEffect, useState } from "react";
import {
  acceptFriend,
  getMyFriends,
  getMySolicitations,
  refuseFriend,
} from "../../services/FriendsService";
import { RefreshControl } from "react-native-gesture-handler";
import { Profile } from "../../services/types";
import { closeLoader, openLoader } from "../../components/Layout/Loader/Loader";

function FriendSolicitation({
  profile,
  reload,
}: {
  profile: Profile;
  reload: () => void;
}) {
  async function accept() {
    openLoader();
    await acceptFriend(profile.id);
    reload();
  }
  async function reject() {
    openLoader();
    await refuseFriend(profile.id);
    reload();
  }
  return (
    <View style={styles.solicitation}>
      <View style={styles.postHeader}>
        <Image source={{ uri: profile.image }} style={styles.postUserImage} />
        <View>
          <Text style={styles.postUserName}>{profile.name.trim()}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerButtonContainer1}>
          <Button label="Aceitar" type="span" callback={accept} />
        </View>
        <View style={styles.footerButtonContainer2}>
          <Button label="Recusar" type="span-secondary" callback={reject} />
        </View>
      </View>
    </View>
  );
}

function FriendProfile({ profile, navigation }: { profile: Profile, navigation: any }) {
  return (
    <TouchableOpacity 
      style={styles.solicitation}
      onPress={() => {
        navigation.navigate("ProfilePage", {id: profile.id})
      }}
    >
      <View style={styles.postHeader}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image source={{ uri: profile.image }} style={styles.postUserImage} />
          <View>
            <Text style={styles.postUserName}>{profile.name.trim()}</Text>
          </View>
        </View>
        <View style={styles.spanButtonContainer}>
          <Button
            label="Desafiar"
            type="span"
            callback={() => {
              navigation.navigate("ChallengeFriendPage", {requested: profile})
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function FriendsPage({ navigation }: { navigation: any }) {
  const [friends, setFriends] = useState<Profile[]>([]);
  const [requests, setRequests] = useState<Profile[]>([]);

  async function loadFriends() {
    openLoader();
    const [friends, requests] = await Promise.all([
      getMyFriends(),
      getMySolicitations(),
    ]);
    setFriends(friends);
    setRequests(requests);
    closeLoader();
  }

  useEffect(() => {
    loadFriends();
  }, []);

  return (
    <Layout
      page="friends"
      navigation={navigation}
      hasNavbar={true}
      scrollable={true}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={loadFriends}
        />
      }
    >
      <View>
        <PageHeader title={"Amigos"} />
        <View style={{padding: 20}}>
          <Button
            label="Buscar amigos"
            type="primary"
            callback={()=>{
              navigation.navigate("SearchFriendsPage");
            }}
          />
        </View>
        <Text style={styles.homeItemTitle}>Solicitações</Text>
        <View style={styles.solicitationsContainer}>
          {requests.map((profile, index) => (
            <FriendSolicitation key={index} profile={profile} reload={loadFriends} />
          ))}
        </View>
        <Text style={styles.homeItemTitle}>Amigos</Text>
        <View style={styles.solicitationsContainer}>
          {friends.map((profile, index) => (
            <FriendProfile key={index} profile={profile} navigation={navigation} />
          ))}
        </View>
      </View>
    </Layout>
  );
}
