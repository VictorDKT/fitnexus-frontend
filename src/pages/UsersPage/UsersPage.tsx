import { Image, Text } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from "./UsersPageStyles";
import { View } from "react-native";
import { Button } from "../../components/Button/Button";
import { getUsers } from "../../services/FriendsService";
import { useEffect, useState } from "react";
import { Profile } from "../../services/types";
import { RefreshControl } from "react-native-gesture-handler";

export function UsersPage({
  navigation,
}: {
  navigation: any;
}) {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadUsers() {
    setLoading(true);
    const users = await getUsers();
    setUsers(users);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout 
      page="users" 
      navigation={navigation} 
      scrollable={true} 
      hasTreinerBar={true}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadUsers} />
      }
    >
      <View style={{ width: "100%", padding: 20 }}>
        <View style={{marginBottom: 20}}>
          {users.map(user=>{
            return (
              <View key={user.id} style={styles.exerciseContainer}>
                <View style={styles.exerciseHeader}>
                  <Image
                    style={styles.exerciseImage}
                    source={{uri: user.image}}
                  />
                  <Text style={styles.exerciseText}>{user.name.trim()}</Text>
                </View>
                <View>
                <Button
                  type="span"
                  label="Atribuir treino"
                  callback={()=>{
                    navigation.navigate("UserFormPage", {user})
                  }}
                />
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </Layout>
  );
}
