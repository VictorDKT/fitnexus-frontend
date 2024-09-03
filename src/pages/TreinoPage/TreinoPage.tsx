import { Dimensions, Image, Text } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from "./TreinoPageStyles";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { View } from "react-native";
import { Button } from "../../components/Button/Button";
import { Training, TrainingExercise } from "../../services/types";

function ExerciseComponent({ exercise }: { exercise: TrainingExercise }) {
  return (
    <View style={styles.exerciceBox}>
      <Image
        style={styles.exerciceImage}
        source={{ uri: exercise.exercise.image }}
      />
      <View style={styles.exerciceDataBox}>
        <Text style={styles.exerciceName}>{exercise.exercise.name}</Text>
        <Text style={styles.exerciceInfo}>
          {exercise.load} kg, {exercise.series} sets, {exercise.repetitions}{" "}
          repetições
        </Text>
      </View>
    </View>
  );
}

export function TreinoPage({
  navigation,
  route: {
    params: { training },
  },
}: {
  navigation: any;
  route: { params: { training: Training } };
}) {
  const screenWidth = Dimensions.get("window").width;
  const imageHeight = (screenWidth * 3) / 5;

  return (
    <Layout page="treino" navigation={navigation} scrollable={true}>
      <View style={{ width: "100%" }}>
        <PageHeader
          title="Treino"
          goBackFunction={() => {
            navigation.navigate("HomePage");
          }}
        />
        <Image
          style={{ width: screenWidth, height: imageHeight }}
          source={{ uri: training.image }}
        />
        <View style={styles.exerciciesContainer}>
          <Text style={styles.title}>Execícios</Text>
          {training?.exercises?.map((exercise, index) => (
            <ExerciseComponent key={index} exercise={exercise} />
          ))}
          <Button
            type="primary"
            label="Iniciar treino"
            callback={() => {
              navigation.navigate("ExercicioPage", { training });
            }}
          />
        </View>
      </View>
    </Layout>
  );
}
