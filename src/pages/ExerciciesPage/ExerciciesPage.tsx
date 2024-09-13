import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import styles from "./ExerciciesPageStyles";
import { Image, Text, View } from "react-native";
import { Exercise } from "../../services/types";
import { getExercicies } from "../../services/ExerciseService";
import { RefreshControl } from "react-native-gesture-handler";
import { Button } from "../../components/Button/Button";

export function ExerciciesPage({
  navigation,
}: {
  navigation: any;
}) {
  const [exercicies, setExercicies] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadExercicies() {
    setLoading(true);
    const exercicies = await getExercicies();
    setExercicies(exercicies);
    setLoading(false);
  }

  useEffect(() => {
    loadExercicies();
  }, []);

  return (
    <Layout 
      page="exercicies" 
      navigation={navigation} 
      scrollable={true} 
      hasTreinerBar={true}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={loadExercicies} />
      }
    >
      <View style={{ width: "100%", padding: 20 }}>
        <View style={{marginBottom: 20}}>
          <Button
            type="primary"
            label="Novo exercício"
            callback={()=>{
              navigation.navigate("ExerciseFormPage")
            }}
          />
          {exercicies.map(exercise=>{
            return (
              <View style={styles.exerciseContainer}>
                <View style={styles.exerciseHeader}>
                  <Image 
                    style={styles.exerciseImage}
                    source={{uri: exercise.image}}
                  />
                  <Text style={styles.exerciseText}>{exercise.name}</Text>
                </View>
                <View>
                <Button
                  type="span"
                  label="Editar"
                  callback={()=>{
                    navigation.navigate("ExerciseFormPage", {id: exercise.id})
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
