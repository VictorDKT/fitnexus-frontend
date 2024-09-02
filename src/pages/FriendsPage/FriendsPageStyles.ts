import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    homeItemTitle: {
        padding: 20,
        color: "white",
        fontFamily: "Lexend-Bold", 
        fontSize: 20,
    },

    solicitationsContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    solicitation: {
        marginBottom: 10,
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

    footer: {
        marginTop: 10,
        flexShrink: 1,
        width: "100%",
        flexDirection: "row",
    },

    footerButtonContainer1: {
        width: "50%",
        marginRight: 10,
    },

    footerButtonContainer2: {
        width: "50%",
    },
    
    spanButtonContainer: {}
});

export default styles;