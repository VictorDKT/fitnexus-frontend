import { Dimensions, Image, Text } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from './TreinoPageStyles';
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { View } from "react-native";
import { Button } from "../../components/Button/Button";

export function TreinoPage({ navigation }: { navigation: any }) {
    const screenWidth = Dimensions.get('window').width;
    const imageHeight = (screenWidth * 3) / 5;
    return (
        <Layout
            page='treino'
            navigation={navigation}
            scrollable={true}
        >
            <View style={{width: "100%"}}>
                <PageHeader 
                    title="Treino"
                    goBackFunction={()=>{
                        navigation.navigate("HomePage")
                    }}
                />
                <Image
                    style={{ width: screenWidth, height: imageHeight }}
                    source={require("./mock/treino.png")}
                />
                <View style={styles.exerciciesContainer}>
                    <Text style={styles.title}>Execícios</Text>
                    <View style={styles.exerciceBox}>
                        <Image 
                            style={styles.exerciceImage}
                            source={require("./mock/exercicio.png")}
                        />
                        <View style={styles.exerciceDataBox}>
                            <Text style={styles.exerciceName}>Supino reto</Text>
                            <Text style={styles.exerciceInfo}>4 kg, 3 sets, 10 repetições</Text>
                        </View>
                    </View>
                    <View style={styles.exerciceBox}>
                        <Image 
                            style={styles.exerciceImage}
                            source={require("./mock/exercicio.png")}
                        />
                        <View style={styles.exerciceDataBox}>
                            <Text style={styles.exerciceName}>Supino reto</Text>
                            <Text style={styles.exerciceInfo}>4 kg, 3 sets, 10 repetições</Text>
                        </View>
                    </View>
                    <View style={styles.exerciceBox}>
                        <Image 
                            style={styles.exerciceImage}
                            source={require("./mock/exercicio.png")}
                        />
                        <View style={styles.exerciceDataBox}>
                            <Text style={styles.exerciceName}>Supino reto</Text>
                            <Text style={styles.exerciceInfo}>4 kg, 3 sets, 10 repetições</Text>
                        </View>
                    </View>
                    <View style={styles.exerciceBox}>
                        <Image 
                            style={styles.exerciceImage}
                            source={require("./mock/exercicio.png")}
                        />
                        <View style={styles.exerciceDataBox}>
                            <Text style={styles.exerciceName}>Supino reto</Text>
                            <Text style={styles.exerciceInfo}>4 kg, 3 sets, 10 repetições</Text>
                        </View>
                    </View>
                    <View style={styles.exerciceBox}>
                        <Image 
                            style={styles.exerciceImage}
                            source={require("./mock/exercicio.png")}
                        />
                        <View style={styles.exerciceDataBox}>
                            <Text style={styles.exerciceName}>Supino reto</Text>
                            <Text style={styles.exerciceInfo}>4 kg, 3 sets, 10 repetições</Text>
                        </View>
                    </View>
                    <Button
                        type="primary"
                        label="Iniciar treino"
                        callback={()=>{
                            navigation.navigate("ExercicioPage")
                        }}
                    />
                </View>
            </View>
        </Layout>
    )
}