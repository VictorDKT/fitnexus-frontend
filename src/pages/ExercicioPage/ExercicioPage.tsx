import { Alert, Dimensions, Image, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from './ExercicioPageStyles';
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Training, TrainingExercise } from "../../services/types";
import { finishTraining } from "../../services/TrainingService";
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveExerciseData = async (serie: number, exercicios: Record<string, unknown>[], currentExercicieIndex: number, id: string) => {
    try {
      const date = new Date().toISOString();
      const exerciseData = {
        exercicios: exercicios,
        currentExercicieIndex: currentExercicieIndex,
        serie: serie,
        date: date,
        id: id,
      };
  

      const jsonValue = JSON.stringify(exerciseData);
 
      await AsyncStorage.setItem('@exercise_data', jsonValue);
    } catch (e) {
      console.error('Erro ao salvar os dados no AsyncStorage', e);
    }
  };

export function ExercicioPage({ navigation, route: { params: { training },},  }: { navigation: any, route: { params: { training: Training } } }) {
    const screenWidth = Dimensions.get('window').width;
    const imageHeight = (screenWidth * 3) / 5;
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [currentExercicieIndex, setCurrentExecicieIndex] = useState(0);
    const [exercicios, setExercicios] = useState<TrainingExercise[]>([]);
    const currentExercise: TrainingExercise = exercicios[currentExercicieIndex];
    const [currentSerie, setCurrentSerie] = useState(0);

    useEffect(() => {
        (
            async () => {
                try {
                  const jsonValue = await AsyncStorage.getItem('@exercise_data');
                  
                  if (jsonValue !== null) {
                    const exerciseData = JSON.parse(jsonValue);
                    const currentDate = new Date().toISOString().split('T')[0];
                    const storedDate = new Date(exerciseData.date).toISOString().split('T')[0];
                    
                    if (storedDate === currentDate && exerciseData.id === training?.id) {
                        setExercicios(exerciseData.exercicios);
                        setCurrentSerie(exerciseData.serie);
                        setCurrentExecicieIndex(exerciseData.currentExercicieIndex);
                    }
                  }
                } catch (e) {
                  console.error('Erro ao buscar os dados do AsyncStorage', e);
                }
            }
        )()
      }, []);

    useEffect(()=>{
        let interval = null;
        if (timerRunning) {
            interval = setInterval(() => {
                setTimer((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else if (!timerRunning && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerRunning, timer])

    useEffect(() => {
        if(training) {
            (
                async ()=> {
                    const jsonValue = await AsyncStorage.getItem('@exercise_data');
                            
                    if (jsonValue !== null) {
                        const exerciseData = JSON.parse(jsonValue);
                        const currentDate = new Date().toISOString().split('T')[0];
                        const storedDate = new Date(exerciseData.date).toISOString().split('T')[0];
                
                        if (storedDate !== currentDate || exerciseData.id !== training.id) {
                            saveExerciseData(currentSerie, exercicios, currentExercicieIndex, training.id);
                            setExercicios(JSON.parse(JSON.stringify(training.exercises)));
                            setCurrentExecicieIndex(0);
                            setCurrentSerie(0);
                        }
                    } else {
                        saveExerciseData(currentSerie, exercicios, currentExercicieIndex, training?.id);
                        setExercicios(JSON.parse(JSON.stringify(training.exercises)));
                        setCurrentExecicieIndex(0);
                        setCurrentSerie(0);
                    }
                }
            )()
        }
    }, [training])

    async function finish(){
        await finishTraining()
        Alert.alert("Parabéns!", "Exercícios do dia finalizados.", [{
            text: "Entendi", onPress: async ()=>{
                await AsyncStorage.removeItem('@exercise_data');
                navigation.navigate("HomePage")
            }
        }]);
    }    

    return (
        <Layout
            page='exercicio'
            navigation={navigation}
            scrollable={false}
        >
            <View style={{width: "100%", flex: 1, height: "100%"}}>
                <PageHeader 
                    title="Treino"
                    goBackFunction={()=>{
                        setTimer(0);
                        setTimerRunning(false);
                        navigation.navigate("TreinoPage", { training });
                    }}
                />
                <Image
                    style={{ width: screenWidth, height: imageHeight }}
                    source={{uri: currentExercise?.exercise?.image}}
                />
                <View style={{padding: 20, flex: 1, height: "100%"}}>
                    <View style={styles.exercicieContentBox}>
                        <Text style={styles.exercicieTitle}>{currentExercise?.exercise?.name}</Text>
                        <Text style={styles.exercicieDescription}>Carga: {currentExercise?.load} KG</Text>
                        <Text style={styles.exercicieDescription}>Repetições: {currentExercise?.repetitions}</Text>
                        <Text style={styles.exercicieDescription}>Series: {currentSerie}/{currentExercise?.series}</Text>
                        <Text style={styles.exercicieDescription}>{currentExercise?.exercise?.description}</Text>
                    </View>
                    <View style={styles.exercicieFooter}>
                        <View style={styles.exercicieFooterButtonBox1}>
                            <Button
                                type="secondary"
                                label={timerRunning ? `${(timer/60) > 9 ? (timer/60).toFixed(0) : "0"+(timer/60).toFixed(0)}:${(timer%60) > 9 ? (timer%60) : "0"+(timer%60)}` : "Pular"}
                                callback={()=>{
                                    if(!timerRunning) {
                                        const newExercicies = exercicios.filter((exercicie, index)=>index !== currentExercicieIndex);
                                        newExercicies.push(currentExercise);
                                        setExercicios(newExercicies);
                                        setCurrentSerie(0);
                                        saveExerciseData(currentSerie, exercicios, currentExercicieIndex, training?.id);
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.exercicieFooterButtonBox2}>
                            <Button
                                type="primary"
                                label={timerRunning && currentSerie === currentExercise.series ? "Finalizar" : timerRunning ? "Finalizar série" : "Começar série"}
                                callback={()=>{
                                    if(timerRunning && currentSerie === currentExercise.series) {
                                        if(currentExercicieIndex + 1 === exercicios.length) {
                                           finish()
                                        } else {
                                            setTimer(0);
                                            setTimerRunning(false);
                                            setCurrentExecicieIndex(currentExercicieIndex+1);
                                            setCurrentSerie(0);
                                            saveExerciseData(currentSerie, exercicios, currentExercicieIndex, training?.id);
                                        }
                                    } if(timerRunning) {
                                        setTimer(0);
                                        setTimerRunning(false);
                                        saveExerciseData(currentSerie, exercicios, currentExercicieIndex, training?.id);
                                    } else {
                                        setTimerRunning(true);
                                        setCurrentSerie(currentSerie+1);
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Layout>
    )
}