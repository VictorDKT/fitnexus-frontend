import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import styles from "./SearchFriendsPageStyles";
import { FormGroup } from "../../components/FormGroup/FormGroup";
import { Button } from "../../components/Button/Button";
import { Profile } from "../../services/types";
import { useEffect, useState } from "react";
import { getFriendSuggestions, requestFriend } from "../../services/FriendsService";
import { RefreshControl } from "react-native-gesture-handler";
import { useAuth } from "../../context/Auth";
import { closeLoader, openLoader } from "../../components/Layout/Loader/Loader";
import Spinner from "react-native-loading-spinner-overlay";

function SuggestionComponent({ profile, reload, navigation }: { profile: Profile, reload : ()=>void, navigation: any }) {
  const { authData } = useAuth();
  return (
    <TouchableOpacity 
      style={styles.itemBox}
      onPress={() => {
        navigation.navigate("ProfilePage", {id: profile.id, search: true})
      }}
    >
      <View style={styles.userBox}>
        <View style={styles.userData}>
          <Image style={styles.userImage} source={{ uri: profile.image }} />
          <Text style={styles.userName}>{profile.name}</Text>
        </View>
        {profile.solicitated ? (
          <Text style={styles.solicitationSended}>Solicitação Enviada</Text>
        ) : (
          <Button
            label="Adicionar"
            type="search-span"
            callback={async () => {
                await requestFriend(profile.id)
                reload()
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export function SearchFriendsPage({ navigation }: { navigation: any }) {
  const [suggestions, setSuggestions] = useState<Profile[]>([]);
  const [nameSearch, setNameSearch] = useState("");
  const [localLoader, setLocalLoader] = useState(false);

  async function loadSuggestions() {
    const suggestions = await getFriendSuggestions(nameSearch);
    setSuggestions(suggestions);
  }

  useEffect(() => {
    (async ()=>{
      openLoader();
      await loadSuggestions();
      closeLoader();
    })();
  }, []);

  useEffect(() => {
    (async ()=>{
      setLocalLoader(true);
      await loadSuggestions();
      setLocalLoader(false);
    })();
  }, [nameSearch]);

  return (
    <Layout
      page="friends-search"
      navigation={navigation}
      scrollable={true}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={loadSuggestions} />
      }
    >
      <View>
        <PageHeader
          title={"Buscar amigos"}
          goBackFunction={() => {
            navigation.navigate("FriendsPage");
          }}
        />
        <View style={styles.page}>
          <View style={styles.itemBox}>
            <View style={styles.inputBox}>
              <FormGroup
                placeholder="Digite o nome"
                type="text"
                callback={(name) => setNameSearch(name as string)}
              />
            </View>
          </View>
          <View>
            {suggestions.map((profile, index) => (
              <SuggestionComponent key={index} profile={profile} reload={loadSuggestions} navigation={navigation} />
            ))}
            {
              localLoader && <View style={{ position: "relative", width: "100%" }}>
                <ActivityIndicator color="#ff0000" size={"small"} />
              </View>
            }
          </View>
        </View>
      </View>
    </Layout>
  );
}
