import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import styles from "./TrainingsPageStyles";
import { Text, View } from "react-native";
import { Training } from "../../services/types";
import { RefreshControl } from "react-native-gesture-handler";
import { Button } from "../../components/Button/Button";
import { getTrainings } from "../../services/TrainingService";

export function TrainingsPage({
  navigation,
}: {
  navigation: any;
}) {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadTrainings() {
    setLoading(true);
    const trainings = await getTrainings();
    setTrainings(trainings);
    setLoading(false);
  }

  useEffect(() => {
    loadTrainings();
  }, []);

  return (
    <Layout 
      page="trainings" 
      navigation={navigation} 
      scrollable={true} 
      hasTreinerBar={true}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadTrainings} />
      }
    >
      <View style={{ width: "100%", padding: 20 }}>
        <View style={{marginBottom: 20}}>
          <Button
            type="primary"
            label="Novo treino"
            callback={()=>{
              navigation.navigate("TrainingFormPage")
            }}
          />
          {trainings.map(training=>{
            return (
              <View style={styles.exerciseContainer}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseText}>{training.name}</Text>
                </View>
                <View>
                <Button
                  type="span"
                  label="Editar"
                  callback={()=>{
                    navigation.navigate("TrainingFormPage", {id: training.id})
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
