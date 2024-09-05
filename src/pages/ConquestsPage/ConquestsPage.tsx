import { Image, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from "./ConquestsPageStyles";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import { Conquest } from "../../services/types";
import { RefreshControl } from "react-native-gesture-handler";
import { getMyConquests } from "../../services/ConquestService";
import { useAuth } from "../../context/Auth";

function ConquestItem({ conquest }: { conquest: Conquest }) {
  return (
    <View style={styles.conquestItem}>
      <Image style={styles.conquestImage} source={{ uri: conquest.image }} />
      <View style={styles.conquestDataBox}>
        <Text style={styles.conquestTitle}>{conquest.name}</Text>
        <Text style={styles.conquestText}>{conquest.description}</Text>
      </View>
    </View>
  );
}

export function ConquestsPage({ navigation }: { navigation: any }) {
  const [conquest, setConquest] = useState<Conquest[]>([]);
  const [loading, setLoading] = useState(false);
  const { authData } = useAuth();

  async function loadConquests() {
    setLoading(true);
    const conquests = await getMyConquests();
    setConquest(conquests);
    setLoading(false);
  }

  useEffect(() => {
    loadConquests();
  }, [authData?._id]);

  return (
    <Layout
      page="conquests"
      navigation={navigation}
      scrollable={false}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadConquests} />
      }
    >
      <View style={{ width: "100%", flex: 1, height: "100%" }}>
        <PageHeader
          title="Conquistas"
          goBackFunction={() => {
            navigation.navigate("MissionsPage");
          }}
        />
        <View style={styles.conquestPage}>
          {conquest.map((conquest, index) => (
            <ConquestItem key={index} conquest={conquest} />
          ))}
        </View>
      </View>
    </Layout>
  );
}
