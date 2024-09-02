import { View, ScrollView, ActivityIndicator, Text, Dimensions, TouchableOpacity } from "react-native";
import styles from "./LayoutStyles";
import { useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome5';

interface ILayoutProps {
    page: string,
    children: JSX.Element | JSX.Element[];
    navigation: any,
    refreshControl?: JSX.Element,
    scrollable?: boolean,
    hasNavbar?: boolean,
}

export let openLoader: ()=>void;
export let closeLoader: ()=>void;

export function Layout(props: ILayoutProps) {
    const [loading, setLoading] = useState(false);
    const { height: screenHeight } = Dimensions.get('window');

    openLoader = ()=>{setLoading(true)}
    closeLoader = ()=>{setLoading(false)}

    return (
        <View style={styles.layout}>
            {loading && <ActivityIndicator style={styles.loader} size="large" color="#E71D27" />}
            <View style={{height: props.hasNavbar ? screenHeight - 75 : "100%"}}>
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
                    <Icon size={20} name="home-variant-outline" style={props.page === "home" ? styles.navIconActive : styles.navIcon} />
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
                        props.navigation.navigate("ProfilePage")
                    }}
                >
                    <Icon3 size={20} name="user"  style={props.page === "profile" ? styles.navIconActive : styles.navIcon} />
                    <Text style={props.page === "profile" ? styles.navTextActive : styles.navText}>Perfil</Text>
                </TouchableOpacity>
            </View>}
        </View>
    )
}