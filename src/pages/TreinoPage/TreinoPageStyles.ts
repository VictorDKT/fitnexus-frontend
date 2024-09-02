import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        marginBottom: 20,
        color: "white",
        fontFamily: "Lexend-Bold",
        fontSize: 20,
    },

    exerciciesContainer: {
        padding: 20,
    },

    exerciceBox: {
        flexShrink: 1,
        flexDirection: "row",
        marginBottom: 20,
    },

    exerciceImage: {
        borderRadius: 10,
        width: 80,
        height: 80,
        marginRight: 20,
    },

    exerciceDataBox: {
        flexShrink: 1,
        justifyContent: "center"
    },

    exerciceName: {
        color: "white",
        fontFamily: "Lexend-Bold",
        fontSize: 16,
    },

    exerciceInfo: {
        color: "#CCAD8F",
        fontFamily: "Lexend-Bold",
        fontSize: 12,
    },
});

export default styles;