import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        marginBottom: 0,
    },

    footer: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 10,
    },

    buttonBox: {
        width: "50%",
        paddingRight: 10,
    },

    buttonBox2: {
        width: "50%",
        paddingLeft: 10,
    },

    execiciesTitle: {
        fontFamily: "Lexend-Bold",
        color: "white",
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10,
    },

    execiseBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "white",
        marginBottom: 20,
    },

    execiseName: {
        fontFamily: "Lexend-Bold",
        color: "white",
        fontSize: 15,
        marginTop: -5,
    },

    exerciseData: {
        fontFamily: "Lexend-Bold",
        color: "white",
        fontSize: 10,
    },
});

export default styles;