import { Image, Text, View } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import styles from "./SearchFriendsPageStyles";
import { FormGroup } from "../../components/FormGroup/FormGroup";
import { Button } from "../../components/Button/Button";

export function SearchFriendsPage({ navigation }: { navigation: any }) {
    return (
        <Layout
          page="friends-search"
          navigation={navigation}
          scrollable={true}
        >
            <View>
                <PageHeader 
                    title={"Buscar amigos"}
                    goBackFunction={()=>{
                        navigation.navigate("FriendsPage")
                    }}
                />
                <View style={styles.page}>
                    <View style={styles.itemBox}>
                        <View style={styles.inputBox}>
                            <FormGroup
                                placeholder="Digite o nome"
                                type="text"
                                callback={()=>{
                                    //
                                }}
                            />
                            
                        </View>
                        <View>
                            <Button
                                label={"Buscar"}
                                type={"search"}
                                callback={()=>{
                                    //
                                }}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.itemBox}>
                            <View style={styles.userBox}>
                                <View style={styles.userData}>
                                    <Image  style={styles.userImage} source={require("./mock/profile.png")}/>
                                    <Text style={styles.userName}>Luana Gomes</Text>
                                </View>
                                <Button 
                                    label="Adicionar"
                                    type="search-span" 
                                    callback={()=>{
                                        //
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.userBox}>
                                <View style={styles.userData}>
                                    <Image  style={styles.userImage} source={require("./mock/profile.png")}/>
                                    <Text style={styles.userName}>Luana Gomes</Text>
                                </View>
                                <Button 
                                    label="Adicionar"
                                    type="search-span" 
                                    callback={()=>{
                                        //
                                    }}
                                />
                            </View>
                        </View>
                        <View style={styles.itemBox}>
                            <View style={styles.userBox}>
                                <View style={styles.userData}>
                                    <Image  style={styles.userImage} source={require("./mock/profile.png")}/>
                                    <Text style={styles.userName}>Luana Gomes</Text>
                                </View>
                                <Text style={styles.solicitationSended}>Solicitação Enviada</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Layout>
    )
}