import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { useAuth } from "../context/Auth";
import { navigationRef } from './RootNavigation';
import { MissionsPage } from "../pages/MissionsPage/MissionsPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { FriendsPage } from "../pages/FriendsPage/FriendsPage";
import { NotificationsPage } from "../pages/NotificationsPage/NotificationsPage";
import { TreinoPage } from "../pages/TreinoPage/TreinoPage";
import { ExercicioPage } from "../pages/ExercicioPage/ExercicioPage";
import { ConquestsPage } from "../pages/ConquestsPage/ConquestsPage";
import { RegisterPage } from "../pages/RegisterPage/RegisterPage";
import { SearchFriendsPage } from "../pages/SearchFriendsPage/SearchFriendsPage";
import { ChallengeFriendPage } from "../pages/ChallengeFriendPage/ChallengeFriendPage";

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
    {name: "RegisterPage", component: RegisterPage},
    {name: "SearchFriendsPage", component: SearchFriendsPage},
    {name: "ChallengeFriendPage", component: ChallengeFriendPage},
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
    {name: "RegisterPage", component: RegisterPage},
    {name: "SearchFriendsPage", component: SearchFriendsPage},
    {name: "ChallengeFriendPage", component: ChallengeFriendPage},
]

function AppStack() {
    const {authData, loading} = useAuth();

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