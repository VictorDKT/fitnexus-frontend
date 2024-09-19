import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    conquestPage: {
        padding: 20,
    },
    homeItemTitle: {
        marginBottom: 20,
        color: "white",
        fontFamily: "Lexend-Bold", 
        fontSize: 20,
    },
    conquestsContainer: {
        flexShrink: 1,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    conquestItem: {
        width: "33.33%",
        padding: 10,
    },
    conquestItemLocked: {
        opacity: 0.5,
    },
    conquestImage: {
        borderRadius: 5,
        width: "100%",
        aspectRatio: 1/1,
    },
    conquestTitle: {
        marginBottom: 5,
        fontFamily: "Lexend-Bold",
        fontSize: 15,
        color: "white",
        textAlign: "center",
    },
    conquestText: {
        fontFamily: "Lexend-Regular",
        fontSize: 10,
        color: "#CCAD8F",
        textAlign: "center",
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
        fontSize: 15,
        color: "white",
    },
    modalSpan: {
        fontFamily: "Lexend-Regular",
        fontSize: 10,
        color: "#CCAD8F",
        margin: 10,
    },
    modalSpanBlocked: {
        fontFamily: "Lexend-Regular",
        fontSize: 10,
        color: "#A1A1A1",
        margin: 10,
    },
    modalImage: {
        width: 120,
        height: 120,
    },
});

export default styles;