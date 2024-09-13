import { View, ScrollView, ActivityIndicator, Text, Dimensions, TouchableOpacity } from "react-native";
import styles from "./LayoutStyles";
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome5';
import Icon5 from 'react-native-vector-icons/FontAwesome6';
import Icon6 from 'react-native-vector-icons/MaterialIcons';
import Icon7 from 'react-native-vector-icons/Ionicons';
import { useAuth } from "../../context/Auth";

interface ILayoutProps {
    page: string,
    children: JSX.Element | JSX.Element[];
    navigation: any,
    refreshControl?: JSX.Element,
    scrollable?: boolean,
    hasNavbar?: boolean,
    hasTreinerBar?: boolean,
}

export let openLoader: ()=>void;
export let closeLoader: ()=>void;

export function Layout(props: ILayoutProps) {
    const [loading, setLoading] = useState(false);
    const { height: screenHeight } = Dimensions.get('window');
    const {authData} = useAuth();

    openLoader = ()=>{setLoading(true)}
    closeLoader = ()=>{setLoading(false)}

    return (
        <View style={styles.layout}>
            {loading && <ActivityIndicator style={styles.loader} size="large" color="#E71D27" />}
            <View style={{height: props.hasNavbar || props.hasTreinerBar ? screenHeight - 75 : "100%"}}>
                {!props.scrollable ?
                    <View  style={styles.page}>
                        <View style={{height: "100%", width: "100%"}}>
                            {props.children}
                        </View>
                    </View> 
                :
                    <ScrollView style={styles.pageContainer} refreshControl={props.refreshControl}>
                        <View style={styles.page}>
                            {props.children}
                        </View>
                    </ScrollView>
                }
            </View>
            {props.hasNavbar && <View style={styles.navBar}>
                <TouchableOpacity 
                    style={props.page === "home" ? styles.navItemActive : styles.navItem}
                    onPress={()=>{
                        props.navigation.navigate("HomePage")
                    }}
                >
                    <Icon7 size={20} name="home-sharp" style={props.page === "home" ? styles.navIconActive : styles.navIcon} />
                    <Text style={props.page === "home" ? styles.navTextActive : styles.navText}>Início</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={props.page === "missions" ? styles.navItemActive : styles.navItem}
                    onPress={()=>{
                        props.navigation.navigate("MissionsPage")
                    }}
                >
                    <Icon size={20} name="flag-variant"  style={props.page === "missions" ? styles.navIconActive : styles.navIcon} />
                    <Text style={props.page === "missions" ? styles.navTextActive : styles.navText}>Missões</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={props.page === "friends" ? styles.navItemActive : styles.navItem}
                    onPress={()=>{
                        props.navigation.navigate("FriendsPage")
                    }}
                >
                    <Icon4 size={20} name="user-friends"  style={props.page === "friends" ? styles.navIconActive : styles.navIcon} />
                    <Text style={props.page === "friends" ? styles.navTextActive : styles.navText}>Amigos</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={props.page === "profile" ? styles.navItemActive : styles.navItem}
                    onPress={()=>{
                        props.navigation.navigate("ProfilePage", {id: authData?._id })
                    }}
                >
                    <Icon3 size={20} name="user"  style={props.page === "profile" ? styles.navIconActive : styles.navIcon} />
                    <Text style={props.page === "profile" ? styles.navTextActive : styles.navText}>Perfil</Text>
                </TouchableOpacity>
            </View>}
            {props.hasTreinerBar && <View style={styles.navBar}>
                <TouchableOpacity 
                    style={props.page === "users" ? styles.navItemActive : styles.navItem}
                    onPress={()=>{
                        props.navigation.navigate("UsersPage")
                    }}
                >
                    <Icon4 size={20} name="user-friends"  style={props.page === "users" ? styles.navIconActive : styles.navIcon} />
                    <Text style={props.page === "users" ? styles.navTextActive : styles.navText}>Usuários</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={props.page === "trainings" ? styles.navItemActive : styles.navItem}
                    onPress={()=>{
                        props.navigation.navigate("TrainingsPage")
                    }}
                >
                    <Icon6 size={20} name="sports-kabaddi"  style={props.page === "trainings" ? styles.navIconActive : styles.navIcon} />
                    <Text style={props.page === "trainings" ? styles.navTextActive : styles.navText}>Treinos</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={props.page === "exercicies" ? styles.navItemActive : styles.navItem}
                    onPress={()=>{
                        props.navigation.navigate("ExerciciesPage")
                    }}
                >
                    <Icon5 size={20} name="dumbbell"  style={props.page === "exercicies" ? styles.navIconActive : styles.navIcon} />
                    <Text style={props.page === "exercicies" ? styles.navTextActive : styles.navText}>Exercicios</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={props.page === "profile" ? styles.navItemActive : styles.navItem}
                    onPress={()=>{
                        props.navigation.navigate("ProfilePage", { id: authData?._id, trainer: true, })
                    }}
                >
                    <Icon3 size={20} name="user"  style={props.page === "profile" ? styles.navIconActive : styles.navIcon} />
                    <Text style={props.page === "profile" ? styles.navTextActive : styles.navText}>Perfil</Text>
                </TouchableOpacity>
            </View>}
        </View>
    )
}