import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },

    itemBox: {
        marginBottom: 20,
        flex: 1,
        flexDirection: "row",
    },

    inputBox: {
        marginRight: 10,
        flex: 1,
    },

    userData: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
    },

    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 20,
    },

    userName: {
        color: "white",
        fontSize: 15,
        fontFamily: "Lexend-Bold",
        marginBottom: 5,
    },

    userBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    solicitationSended: {
        color: "white",
    },
});

export default styles;