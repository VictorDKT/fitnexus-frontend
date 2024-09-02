import { Alert, Dimensions, Image, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from './ExercicioPageStyles';
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";

export function ExercicioPage({ navigation }: { navigation: any }) {
    const screenWidth = Dimensions.get('window').width;
    const imageHeight = (screenWidth * 3) / 5;
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [currentExercicieIndex, setCurrentExecicieIndex] = useState(0);

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

    const [exercicios, setExercicios] = useState([
        {
            name: "Flexão",
            image: require("./mock/exercicio.png"),
            description: "Faça flexões",
            load: 10,
            series: 3,
            repetitions: 10,
        },
        {
            name: "Agachamento",
            image: require("./mock/exercicio.png"),
            description: "Faça agachamentos",
            load: 5,
            series: 5,
            repetitions: 15,
        },
        {
            name: "Barra",
            image: require("./mock/exercicio.png"),
            description: "Faça barras",
            load: 2,
            series: 2,
            repetitions: 20,
        },
    ]);
    
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
                        navigation.navigate("TreinoPage");
                    }}
                />
                <Image
                    style={{ width: screenWidth, height: imageHeight }}
                    source={exercicios[currentExercicieIndex].image}
                />
                <View style={{padding: 20, flex: 1, height: "100%"}}>
                    <View style={styles.exercicieContentBox}>
                        <Text style={styles.exercicieTitle}>{exercicios[currentExercicieIndex].name}</Text>
                        <Text style={styles.exercicieDescription}>{exercicios[currentExercicieIndex].description}</Text>
                    </View>
                    <View style={styles.exercicieFooter}>
                        <View style={styles.exercicieFooterButtonBox1}>
                            <Button
                                type="secondary"
                                label={timerRunning ? `${(timer/60) > 9 ? (timer/60).toFixed(0) : "0"+(timer/60).toFixed(0)}:${(timer%60) > 9 ? (timer%60) : "0"+(timer%60)}` : "Pular"}
                                callback={()=>{
                                    if(!timerRunning) {
                                        const newExercicies = exercicios.filter((exercicie, index)=>index !== currentExercicieIndex);
                                        newExercicies.push(exercicios[currentExercicieIndex]);
                                        setExercicios(newExercicies);
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.exercicieFooterButtonBox2}>
                            <Button
                                type="primary"
                                label={timerRunning ? "Finalizar" : "Começar"}
                                callback={()=>{
                                    if(timerRunning) {
                                        if(currentExercicieIndex + 1 === exercicios.length) {
                                            Alert.alert("Parabéns!", "Exercícios do dia finalizados.", [{
                                                text: "Entendi", onPress: ()=>{
                                                    navigation.navigate("HomePage")
                                                }
                                            }]);
                                        } else {
                                            setTimer(0);
                                            setTimerRunning(false);
                                            setCurrentExecicieIndex(currentExercicieIndex+1);
                                        }
                                    } else {
                                        setTimerRunning(true);
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