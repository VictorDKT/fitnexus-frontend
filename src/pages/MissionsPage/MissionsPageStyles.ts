import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    homeItemTitle: {
        padding: 20,
        paddingTop: 0,
        color: "white",
        fontFamily: "Lexend-Bold", 
        fontSize: 20,
    },

    goalText: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 10,
        color: "white",
        fontFamily: "Lexend-Regular", 
        marginBottom: 20,
    },

    goalContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },

    goalLabelText: {
        color: "white",
        fontFamily: "Lexend-Regular", 
        fontSize: 15,
    },

    dateText: {
        padding: 20,
        paddingTop: 0,
        paddingBottom: 10,
        color: "white",
        fontFamily: "Lexend-Bold", 
        fontSize: 15,
    },

    challengeContainer: {
        borderColor: "#303030",
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        padding: 15,
        marginBottom: 20,
    },

    challengeProgressContainer: {
        width: "100%",
        flexShrink: 1,
        flexDirection: "row",
        alignItems: "center"
    },

    challengeProgressBarContainer: {
        flex: 1,
        paddingRight: 10,
    },

    progressLabel: {
        color: "white",
        fontFamily: "Lexend-Regular",
        fontSize: 15,
        marginBottom: 5,
    },

    solicitationsContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    solicitation: {
        marginBottom: 20,
        borderColor: "#303030",
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        width: "100%",
    },

    postHeader: {
        flexShrink: 1,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    postUserImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },

    postUserName: {
        fontFamily: "Lexend-Bold",
        color: "white",
        fontSize: 20,
    },

    solicitationFooter: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        marginTop: 10,
    },

    solicitationFooterButtonContainer1: {
        marginRight: 20,
        width: "50%",
        flex: 1,
    },

    solicitationFooterButtonContainer2: {
        flex: 1,
        width: "50%",
    },
});

export default styles;