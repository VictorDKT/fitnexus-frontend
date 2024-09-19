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

    modalBody: {
        width: "100%",
        flexShrink: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 20,
    },

    modalHeader: {
        width: "100%",
        flexShrink: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
    }, 

    modalCloseButton: {
        fontFamily: "Lexend-Regular",
        fontSize: 15,
        color: "white",
    },

    modalTitle: {
        fontFamily: "Lexend-Bold",
        fontSize: 20,
        color: "white",
        marginBottom: 20,
    },

    modalText: {
        fontFamily: "Lexend-Regular",
        fontSize: 16,
        color: "white",
        textAlign: "center"
    },

    progressValueContainer: {
        flexShrink: 1,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },

    progressValue: {
        color: "white",
        fontFamily: "Lexend-Bold",
        fontSize: 30,
    },

    progressTotalValue: {
        color: "#8D8D8D",
        fontFamily: "Lexend-Bold",
        fontSize: 20,
    },

    modalButtonBox1: {
        width: "50%",
        borderTopWidth: 1, 
        borderRightWidth: 1, 
        borderColor: "white", 
    },

    modalButtonBox2: {
        width: "50%",
        borderTopWidth: 1, 
        borderColor: "white", 
    },

    modalButtonContainer: {
        width: "100%",
        padding: 15, 
        alignItems: "center", 
        justifyContent: "center",
        flexShrink: 1,
        flexDirection: "row",
    },

    modalButtonText: {
        color: "white",
        fontFamily: "Lexend-Regular",
        fontSize: 15,
    },

    modalButtonIcon: {
        color: "white",
        fontFamily: "Lexend-Regular",
        fontSize: 20,
        marginRight: 10,
    },
});

export default styles;