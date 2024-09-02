import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        width: "100%",
    },

    buttonContainer: {
        flexShrink: 1,
        width: "100%",
        marginBottom: 20,
    },

    titlePage: {
        fontFamily: "SpaceGrotesk-Bold",
        color: "white",
        fontSize: 25,
        marginBottom: 30,
    },

    inputContainer: {
        width: "100%",
        marginBottom: 0,
    },

    forgotPasswordSpan: {
        fontFamily: "SpaceGrotesk-Regular",
        color: "#D5D5D5",
        fontSize: 15,
        marginBottom: 20,
    },
});

export default styles;