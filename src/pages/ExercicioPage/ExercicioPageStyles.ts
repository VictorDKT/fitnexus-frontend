import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    exercicieContentBox: {
        flex: 1,
        height: "100%",
    },

    exercicieTitle: {
        fontFamily: "Lexend-Bold",
        color: "white",
        fontSize: 30,
        marginBottom: 10,
    },

    exercicieDescription: {
        fontSize: 15,
        color: "white",
    },

    exercicieFooter: {
        flexShrink: 1,
        flexDirection: "row",
        width: "100%",
    },

    exercicieFooterButtonBox1: {
        paddingRight: 10,
        width: "50%",
    },

    exercicieFooterButtonBox2: {
        paddingLeft: 10,
        width: "50%",
    },

    progressContainer: {
        padding: 20,
        backgroundColor: "#202020",
        width: "100%"
    },

    progressTitle: {
        color: "white",
        fontFamily: "Lexend-Bold",
        fontSize: 15,
    },

    progressBody: {
        flexShrink: 1,
        flexDirection: "row",
        paddingTop: 10,
        alignItems: "center"
    },

    progressBarContainer: {
        flex: 1,
    },

    progressLabel: {
        fontFamily: "Lexend-Regular",
        color: "white",
        marginLeft: 10,
        marginTop: -2,
    },
});

export default styles;