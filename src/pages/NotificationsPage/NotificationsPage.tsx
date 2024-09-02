import { Text } from "react-native";
import { Layout } from "../../components/Layout/Layout";
import styles from './NotificationsPageStyles';

export function NotificationsPage({ navigation }: { navigation: any }) {
    return (
        <Layout
            page='notification'
            navigation={navigation}
            scrollable={true}
        >
            <Text>Notificações</Text>
        </Layout>
    )
}