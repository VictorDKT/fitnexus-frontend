import { Image, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from './FriendsPageStyles';
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Button } from "../../components/Button/Button";

export function FriendsPage({ navigation }: { navigation: any }) {
    return (
        <Layout
            page='friends'
            navigation={navigation}
            hasNavbar={true}
            scrollable={true}
        >
            <View>
                <PageHeader title={"Amigos"} />
                <Text style={styles.homeItemTitle}>Solicitações</Text>
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
                        <View style={styles.footer}>
                            <View style={styles.footerButtonContainer1}>
                                <Button
                                    label="Aceitar"
                                    type="span"
                                    callback={()=>{
                                        //
                                    }}
                                />
                            </View>
                            <View style={styles.footerButtonContainer2}>
                                <Button
                                    label="Recusar"
                                    type="span-secondary"
                                    callback={()=>{
                                        //
                                    }}
                                />
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
                        <View style={styles.footer}>
                            <View style={styles.footerButtonContainer1}>
                                <Button
                                    label="Aceitar"
                                    type="span"
                                    callback={()=>{
                                        //
                                    }}
                                />
                            </View>
                            <View style={styles.footerButtonContainer2}>
                                <Button
                                    label="Recusar"
                                    type="span-secondary"
                                    callback={()=>{
                                        //
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={styles.homeItemTitle}>Amigos</Text>
                <View style={styles.solicitationsContainer}>
                    <View style={styles.solicitation}>
                        <View style={styles.postHeader}>
                            <View style={{flex: 1, flexDirection: "row"}}>
                                <Image
                                    source={require("./mock/profile.png")}
                                    style={styles.postUserImage}
                                />
                                <View>
                                    <Text style={styles.postUserName}>Julia</Text>
                                </View>
                            </View>
                            <View style={styles.spanButtonContainer}>
                                <Button
                                    label="Desafiar"
                                    type="span"
                                    callback={()=>{
                                        //
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Layout>
    )
}