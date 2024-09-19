import { Alert, Dimensions, Image, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from './ExercicioPageStyles';
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { Profile, Training, TrainingExercise } from "../../services/types";
import { finishTraining } from "../../services/TrainingService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { closeLoader, openLoader } from "../../components/Layout/Loader/Loader";
import { getProfile } from "../../services/ProfileService";
import { useAuth } from "../../context/Auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Modal } from "../../components/Modal/Modal";
import Icon from 'react-native-vector-icons/Ionicons';
import { SocialPostInput } from "../../components/SocialPost/SocialPost";

function FinishModal({ training, profile, close, navigation }: { training: Training, profile: Profile, close: ()=>void, navigation: any }) {
    const [posting, setPosting] = useState(false);
    const { authData } = useAuth();

    return (
      <Modal
        body={!posting ?
          <View style={styles.modalBody}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={()=>{close()}}><Text style={styles.modalCloseButton}>X</Text></TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Parabéns</Text>
            <View style={{padding: 20, flexShrink: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={styles.modalText}>{`Você terminou o treino ${training.name}`}</Text>
            <View style={styles.progressValueContainer}>
              <Text style={styles.progressValue}>{profile.training_dates?.length}</Text>
              <Text style={styles.progressTotalValue}>/{profile.workouts_per_week}</Text>
            </View>
            <View style={{flexShrink: 1, flexDirection: "row", marginBottom: 40, marginTop: 10}}><ProgressBar progress={(profile.training_dates.length/profile.workouts_per_week*100)}/></View>
            <Text style={styles.modalText}>{`Faltam ${profile.workouts_per_week-profile.training_dates.length} dias de treino para concluir sua meta semanal`}</Text>
            </View>
          </View>
          :
          <View style={{flexShrink: 1, justifyContent: "center", alignItems: "center"}}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={()=>{close()}}><Text style={styles.modalCloseButton}>X</Text></TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>Diga algo</Text>
            <View style={{width: "100%"}}>
            <SocialPostInput 
                noMargin={true}
                onFinish={()=>{
                    Alert.alert("Sucesso!", "Post enviado.", [{
                        text: "Entendi", onPress: ()=>{close()}
                    }]);
                }} 
                setLoading={(value: boolean)=>{
                    value ? openLoader() : closeLoader()
                }}
            />
            </View>
            </View>
        }
        footer={!posting ?
            <View style={{flexShrink: 1, flexDirection: "row"}}>
                <View style={styles.modalButtonBox1}>
                    <TouchableOpacity style={styles.modalButtonContainer} onPress={()=>{close()}}>
                        <Icon style={styles.modalButtonIcon} name="checkbox-outline"/>
                        <Text style={styles.modalButtonText}>
                            Finalizar
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalButtonBox2}>
                    <TouchableOpacity style={styles.modalButtonContainer} onPress={()=>{setPosting(true)}}>
                    <Icon style={styles.modalButtonIcon} name="camera-outline"/>
                        <Text style={styles.modalButtonText}>
                            Registrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            : <View/>
        }
      />
    );
}

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
    const [progress, setProgress] = useState(0);
    const [profile, setProfile] = useState<Profile>();
    const [showModal, setShowModal] = useState(false);
    const { authData } = useAuth();

    useEffect(()=>{
        if(exercicios) {
            let total = 0;
            let feito = 0;

            exercicios.forEach((exercicio, index)=>{
                if(index < currentExercicieIndex) {
                    feito = feito + exercicio.series;
                }
                if(index === currentExercicieIndex) {
                    feito = feito + currentSerie;
                }
                total = total + exercicio.series;
            });

            setProgress(parseFloat((feito/total*100).toFixed(2)));
        }
    }, [currentExercicieIndex, exercicios, currentSerie])

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
        openLoader();
        
        try { 
            await finishTraining();
        } 
        catch (error) {
        }

        const profile = await getProfile(authData?._id || "");
        setProfile(profile);
        setShowModal(true);
        
        closeLoader();
    }    

    return (
        <Layout
            page='exercicio'
            navigation={navigation}
            scrollable={false}
        >
            {showModal ? 
                <FinishModal
                    navigation={navigation}
                    profile={profile as Profile}
                    training={training}
                    close={async ()=>{
                        setShowModal(false);
                        await AsyncStorage.removeItem('@exercise_data');
                        navigation.navigate("HomePage");
                    }}
                /> : <View/>
            }
            <View style={{width: "100%", flex: 1, height: "100%"}}>
                <PageHeader 
                    title={training.name}
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
                <View style={styles.progressBarContainer}><ProgressBar progress={progress}/></View>
                <View style={{padding: 20, paddingTop: 5, flex: 1, height: "100%"}}>
                    <View style={styles.exercicieContentBox}>
                        <Text style={styles.exercicieTitle}>{currentExercise?.exercise?.name}</Text>
                        <Text style={styles.exercicieDescription}>{currentExercise?.exercise?.description}</Text>
                        <View style={styles.dataContainer}>
                            <View style={styles.dataContainerItem}>
                                <Text style={styles.dataContainerTitle}>Séries</Text>
                                <Text style={styles.dataContainerText}>{currentSerie}/{currentExercise?.series}</Text>
                            </View>
                            <View style={styles.dataContainerItem}> 
                                <Text style={styles.dataContainerTitle}>Repetições</Text>
                                <Text style={styles.dataContainerText}>{currentExercise?.repetitions}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.exercicieFooter}>
                        <View style={styles.exercicieFooterButtonBox1}>
                            <Button
                                type="secondary"
                                label={timerRunning ? `${(timer/60) > 9 ? (timer/60).toFixed(0) : "0"+(timer/60).toFixed(0)}:${(timer%60) > 9 ? (timer%60) : "0"+(timer%60)}` : "Pular exercício"}
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