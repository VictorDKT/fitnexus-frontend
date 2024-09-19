import { Image, Text, TouchableOpacity, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from "./ConquestsPageStyles";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import { Conquest } from "../../services/types";
import { RefreshControl } from "react-native-gesture-handler";
import { getAllConquests, getMyConquests } from "../../services/ConquestService";
import { useAuth } from "../../context/Auth";
import { closeLoader, openLoader } from "../../components/Layout/Loader/Loader";
import { Modal } from "../../components/Modal/Modal";

function ConquestModal({ conquest, close }: { conquest?: Conquest, close: ()=>void }) {
  return (
    <Modal
      body={
        <View style={styles.modalBody}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={()=>{close()}}><Text style={styles.modalCloseButton}>X</Text></TouchableOpacity>
          </View>
          <Text style={styles.modalTitle}>{conquest?.name}</Text>
          <Image style={styles.modalImage} source={{ uri: conquest?.image }} />
          <Text style={styles.modalSpan}>Nível 1</Text>
          <Text style={styles.modalText}>{conquest?.description}</Text>
        </View>
      }
    />
  );
}

function ConquestItem({ conquest, callback }: { conquest: Conquest, callback: (conquest: Conquest)=>void }) {
  return (
    <TouchableOpacity style={[styles.conquestItem, conquest.unlocked ? undefined : styles.conquestItemLocked]} onPress={()=>{callback(conquest)}}>
      <Image style={styles.conquestImage} source={{ uri: conquest.image }} />
      <Text style={styles.conquestTitle}>{conquest.name}</Text>
      <Text style={styles.conquestText}>Nível 1</Text>
    </TouchableOpacity>
  );
}

export function ConquestsPage({ 
  navigation,
  route: {
    params: { fromProfile },
  },
}: {
  navigation: any;
  route: { params: { fromProfile?: boolean} };
}) {
  const [conquest, setConquest] = useState<Conquest[]>([]);
  const [showConquest, setShowConquest] = useState(false);
  const [selectedConquest, setSelectedConquest] = useState<Conquest>();
  const {authData} = useAuth();

  async function loadConquests() {
    openLoader();
    const [all, my] = await Promise.all([getAllConquests(), getMyConquests()]);
    const conquests = all.map(conquest => ({...conquest, unlocked: my.some(myConquest => myConquest.id === conquest.id)}));
    conquests.sort((a, b) => a.unlocked ? -1 : 1);
    setConquest(conquests);
    closeLoader();
  }

  useEffect(() => {
    loadConquests();
  }, []);

  return (
    <Layout
      page="conquests"
      navigation={navigation}
      scrollable={false}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={loadConquests} />
      }
    >
      {showConquest ? <ConquestModal conquest={selectedConquest} close={()=>{setSelectedConquest(undefined); setShowConquest(false)}}/> : <View/>}
      <View style={{ width: "100%", flex: 1, height: "100%" }}>
        <PageHeader
          title="Conquistas"
          goBackFunction={() => {
            if(fromProfile) {
              navigation.navigate("ProfilePage", {id: authData?._id })
            } else {
              navigation.navigate("MissionsPage");
            }
          }}
        />
        <View style={styles.conquestPage}>
          <Text style={styles.homeItemTitle}>Seus emblemas</Text>
          <View style={styles.conquestsContainer}>
            {conquest.map((conquest, index) => (
              <ConquestItem 
                key={index} 
                conquest={conquest} 
                callback={(conquest: Conquest)=>{
                  setSelectedConquest(conquest);
                  setShowConquest(true);
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
}
