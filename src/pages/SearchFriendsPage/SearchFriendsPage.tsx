import { Image, Text, View } from "react-native";
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

function SuggestionComponent({ profile, reload }: { profile: Profile, reload : ()=>void }) {
  const { authData } = useAuth();
  return (
    <View style={styles.itemBox}>
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
    </View>
  );
}

export function SearchFriendsPage({ navigation }: { navigation: any }) {
  const [suggestions, setSuggestions] = useState<Profile[]>([]);
  const [nameSearch, setNameSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadSuggestions() {
    setLoading(true);
    const suggestions = await getFriendSuggestions(nameSearch);
    setSuggestions(suggestions);
    setLoading(false);
  }

  useEffect(() => {
    loadSuggestions();
  }, [nameSearch]);

  return (
    <Layout
      page="friends-search"
      navigation={navigation}
      scrollable={true}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadSuggestions} />
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
              <SuggestionComponent key={index} profile={profile} reload={loadSuggestions} />
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
}
