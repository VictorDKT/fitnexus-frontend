import { Image, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from './ConquestsPageStyles';
import { PageHeader } from "../../components/PageHeader/PageHeader";

export function ConquestsPage({ navigation }: { navigation: any }) {
    
    return (
        <Layout
            page='conquests'
            navigation={navigation}
            scrollable={false}
        >
            <View style={{width: "100%", flex: 1, height: "100%"}}>
                <PageHeader 
                    title="Conquistas"
                    goBackFunction={()=>{
                        navigation.navigate("MissionsPage");
                    }}
                />
                <View style={styles.conquestPage}>
                    <View style={styles.conquestItem}>
                        <Image
                            style={styles.conquestImage}
                            source={require("./mock/exercicio.png")}
                        />
                        <View style={styles.conquestDataBox}>
                            <Text style={styles.conquestTitle}>Nova conquista adquirida</Text>
                            <Text style={styles.conquestText}>Treinando pesado</Text>
                        </View>
                    </View> 
                    <View style={styles.conquestItem}>
                        <Image
                            style={styles.conquestImage}
                            source={require("./mock/exercicio.png")}
                        />
                        <View style={styles.conquestDataBox}>
                            <Text style={styles.conquestTitle}>Nova conquista adquirida</Text>
                            <Text style={styles.conquestText}>Treinando pesado</Text>
                        </View>
                    </View> 
                    <View style={styles.conquestItem}>
                        <Image
                            style={styles.conquestImage}
                            source={require("./mock/exercicio.png")}
                        />
                        <View style={styles.conquestDataBox}>
                            <Text style={styles.conquestTitle}>Nova conquista adquirida</Text>
                            <Text style={styles.conquestText}>Treinando pesado</Text>
                        </View>
                    </View> 
                </View>
            </View>
        </Layout>
    )
}