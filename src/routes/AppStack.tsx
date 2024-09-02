import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { useAuth } from "../context/Auth";
import AppLoading from "expo-app-loading";
import { navigationRef } from './RootNavigation';
import { MissionsPage } from "../pages/MissionsPage/MissionsPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { FriendsPage } from "../pages/FriendsPage/FriendsPage";
import { NotificationsPage } from "../pages/NotificationsPage/NotificationsPage";
import { TreinoPage } from "../pages/TreinoPage/TreinoPage";
import { ExercicioPage } from "../pages/ExercicioPage/ExercicioPage";
import { ConquestsPage } from "../pages/ConquestsPage/ConquestsPage";

const { Navigator, Screen } = createDrawerNavigator();

type Route = {
    name: string,
    component: React.ComponentType<any>
}

const publicRoutes: Route[] = [
    {name: "LoginPage", component: LoginPage},
    {name: "HomePage", component: HomePage},
    {name: "MissionsPage", component: MissionsPage},
    {name: "ProfilePage", component: ProfilePage},
    {name: "FriendsPage", component: FriendsPage},
    {name: "NotificationsPage", component: NotificationsPage},
    {name: "TreinoPage", component: TreinoPage},
    {name: "ExercicioPage", component: ExercicioPage},
    {name: "ConquestsPage", component: ConquestsPage},
]

const privateRoutes: Route[] = [
    {name: "HomePage", component: HomePage},
    {name: "MissionsPage", component: MissionsPage},
    {name: "ProfilePage", component: ProfilePage},
    {name: "FriendsPage", component: FriendsPage},
    {name: "NotificationsPage", component: NotificationsPage},
    {name: "TreinoPage", component: TreinoPage},
    {name: "ExercicioPage", component: ExercicioPage},
    {name: "ConquestsPage", component: ConquestsPage},
]

function AppStack() {
    const {authData, loading} = useAuth();

    if (loading) {
        return <AppLoading/>
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Navigator 
                screenOptions={{
                    headerShown: false,
                }}
                backBehavior="history"
            >
                {(authData ? privateRoutes : publicRoutes).map(route => {
                        return(
                            <Screen key={route.name} name={route.name} component={route.component} />
                        )
                    }
                )}
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack;