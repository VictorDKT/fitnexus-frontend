import { Image, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from "./FriendsPageStyles";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Button } from "../../components/Button/Button";
import { Profile } from "../../context/ProfileContext";
import { useEffect, useState } from "react";
import {
  acceptFriend,
  getMyFriends,
  getMySolicitations,
  refuseFriend,
} from "../../services/FriendsService";
import { useAuth } from "../../context/Auth";

function FriendSolicitation({
  profile,
  reload,
}: {
  profile: Profile;
  reload: () => void;
}) {
  async function accept() {
    await acceptFriend(profile.id);
    reload();
  }
  async function reject() {
    await refuseFriend(profile.id);
    reload();
  }
  return (
    <View style={styles.solicitation}>
      <View style={styles.postHeader}>
        <Image source={{ uri: profile.image }} style={styles.postUserImage} />
        <View>
          <Text style={styles.postUserName}>{profile.name}</Text>
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

function FriendProfile({ profile }: { profile: Profile }) {
  return (
    <View style={styles.solicitation}>
      <View style={styles.postHeader}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image source={{ uri: profile.image }} style={styles.postUserImage} />
          <View>
            <Text style={styles.postUserName}>{profile.name}</Text>
          </View>
        </View>
        <View style={styles.spanButtonContainer}>
          <Button
            label="Desafiar"
            type="span"
            callback={() => {
              //
            }}
          />
        </View>
      </View>
    </View>
  );
}

export function FriendsPage({ navigation }: { navigation: any }) {
  const [friends, setFriends] = useState<Profile[]>([]);
  const [requests, setRequests] = useState<Profile[]>([]);
  const { authData } = useAuth();

  async function loadFriends() {
    const [friends, requests] = await Promise.all([
      getMyFriends(),
      getMySolicitations(),
    ]);
    setFriends(friends);
    setRequests(requests);
  }

  useEffect(() => {
    loadFriends();
  }, [authData?._id]);

  return (
    <Layout
      page="friends"
      navigation={navigation}
      hasNavbar={true}
      scrollable={true}
    >
      <View>
        <PageHeader title={"Amigos"} />
        <Text style={styles.homeItemTitle}>Solicitações</Text>
        <View style={styles.solicitationsContainer}>
          {requests.map((profile, index) => (
            <FriendSolicitation key={index} profile={profile} reload={loadFriends} />
          ))}
        </View>
        <Text style={styles.homeItemTitle}>Amigos</Text>
        <View style={styles.solicitationsContainer}>
          {friends.map((profile, index) => (
            <FriendProfile key={index} profile={profile} />
          ))}
        </View>
      </View>
    </Layout>
  );
}
