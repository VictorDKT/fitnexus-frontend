import { Image, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from './MissionsPageStyles';
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Button } from "../../components/Button/Button";

export function MissionsPage({ navigation }: { navigation: any }) {
    return (
        <Layout
            page='missions'
            navigation={navigation}
            hasNavbar={true}
            scrollable={true}
        >
            <View>
                <PageHeader 
                    title={"Missões"} 
                    notificationsFunction={()=>{
                        navigation.navigate("ConquestsPage")
                    }}
                />
                <Text style={styles.homeItemTitle}>Meus desafios</Text>
                <View style={styles.challengeContainer}>
                    <Text style={styles.progressLabel}>Desafio com João</Text>
                    <View style={styles.challengeProgressContainer}>
                        <View style={styles.challengeProgressBarContainer}><ProgressBar progress={50} /></View>
                        <Text style={styles.progressLabel}>50%</Text>
                    </View>
                </View>
                <View style={styles.challengeContainer}>
                    <Text style={styles.progressLabel}>Desafio com Lucas</Text>
                    <View style={styles.challengeProgressContainer}>
                        <View style={styles.challengeProgressBarContainer}><ProgressBar progress={75} /></View>
                        <Text style={styles.progressLabel}>75%</Text>
                    </View>
                </View>
                <Text style={styles.homeItemTitle}>Pendentes</Text>
                <View style={styles.solicitationsContainer}>
                    <View style={styles.solicitation}>
                        <View style={styles.postHeader}>
                            <Image
                                source={require("./mock/profile.png")}
                                style={styles.postUserImage}
                            />
                            <View>
                                <Text style={styles.postUserName}>Julia</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.progressLabel}>Início: 10/09/2024</Text>
                            <Text style={styles.progressLabel}>Duração: 4 semanas</Text>
                            <View style={styles.solicitationFooter}>
                                <View style={styles.solicitationFooterButtonContainer1}>
                                    <Button
                                        type={"primary"}
                                        label={"Aceitar"}
                                        callback={()=>{
                                            //
                                        }}
                                    />
                                </View>
                                <View style={styles.solicitationFooterButtonContainer2}>
                                    <Button
                                        type={"secondary"}
                                        label={"Recusar"}
                                        callback={()=>{
                                            //
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.solicitation}>
                        <View style={styles.postHeader}>
                            <Image
                                source={require("./mock/profile.png")}
                                style={styles.postUserImage}
                            />
                            <View>
                                <Text style={styles.postUserName}>Julia</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.progressLabel}>Início: 10/09/2024</Text>
                            <Text style={styles.progressLabel}>Duração: 4 semanas</Text>
                            <View style={styles.solicitationFooter}>
                                <View style={styles.solicitationFooterButtonContainer1}>
                                    <Button
                                        type={"primary"}
                                        label={"Aceitar"}
                                        callback={()=>{
                                            //
                                        }}
                                    />
                                </View>
                                <View style={styles.solicitationFooterButtonContainer2}>
                                    <Button
                                        type={"secondary"}
                                        label={"Recusar"}
                                        callback={()=>{
                                            //
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Layout>
    )
}