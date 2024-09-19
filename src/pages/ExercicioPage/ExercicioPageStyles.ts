import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    exercicieContentBox: {
        flex: 1,
        height: "100%",
    },

    exercicieTitle: {
        fontFamily: "Lexend-Bold",
        color: "white",
        fontSize: 25,
        marginBottom: 10,
    },

    exercicieDescription: {
        fontSize: 15,
        color: "#A0A0A0",
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
        flexShrink: 1,
    },

    progressLabel: {
        fontFamily: "Lexend-Regular",
        color: "white",
        marginLeft: 10,
        marginTop: -2,
    },

    dataContainer: {
        flexShrink: 1,
        flexDirection: "row",
        marginTop: 10,
    },

    dataContainerItem: {
        marginRight: 20,
    },

    dataContainerTitle: {
        fontFamily: "Lexend-Bold",
        fontSize: 15,
        marginBottom: 10,
        color: "white",
    },

    dataContainerText: {
        fontFamily: "Lexend-Regular",
        fontSize: 15,
        color: "#CCAD8F",
    },
});

export default styles;