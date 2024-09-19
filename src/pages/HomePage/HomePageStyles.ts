import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    homeImage: {
        width: "100%",
        aspectRatio: 4/3,
    },
    homeImageContainer: {
        position: "relative",
        padding: 10,
        flexShrink: 1,
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
    },
    academyTitle: {
        color: "white",
        fontFamily: "Lexend-Bold",
        fontSize: 20,
        zIndex: 2,
    },
    academySubTitle: {
        color: "white",
        fontFamily: "Lexend-Bold",
        fontSize: 30,
        zIndex: 2,
    },
    gradiant1: {
        position: "absolute",
        width: "100%",
        height: "30%",
        top: 0,
        left: 0,
        zIndex: 1,
    },
    gradiant2: {
        position: "absolute",
        width: "100%",
        height: "30%",
        bottom: 0,
        left: 0,
        zIndex: 1,
    },

    homeItemTitle: {
        padding: 20,
        paddingTop: 0,
        color: "white",
        fontFamily: "Lexend-Bold", 
        fontSize: 15,
    },

    semanalProgressContainer: {
        flexShrink: 1,
        flexDirection: "row",
        padding: 20,
        backgroundColor: "#202020",
        alignItems: "center",
    },

    progressValueContainer: {
        flexShrink: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    progressValue: {
        color: "#BB161E",
        fontFamily: "Lexend-Bold",
        fontSize: 30,
    },

    progressTotalValue: {
        color: "#8D8D8D",
        fontFamily: "Lexend-Bold",
        fontSize: 20,
    },

    progressContainer: {
        paddingLeft: 20,
        flex: 1,
    },

    progressLabel: {
        color: "white",
        fontFamily: "Lexend-Regular",
        fontSize: 15,
        marginBottom: 5,
    },

    challengeContainer: {
        borderColor: "#303030",
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        padding: 20,
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

    buttonsContainer: {
        padding: 20,
        paddingTop: 0,
    },

    buttonContainer: {
        marginBottom: 20,
    },

    postsContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    post: {
        position: "relative",
        marginBottom: 20,
        width: "100%",
        aspectRatio: 5/5,
        borderRadius: 20,
        overflow: "hidden",
    },

    postHeader: {
        position: "absolute",
        top: 0,
        left: 0,
        padding: 10,
        backgroundColor: "transparent",
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

    postUserInfo: {

    },

    postUserName: {
        fontFamily: "Lexend-Bold",
        color: "white",
        fontSize: 15,
    },

    postTime: {
        fontFamily: "Lexend-Regular",
        color: "white",
        fontSize: 10,
    },

    postData: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        flex: 1,
        flexDirection: "row",
        padding: 20,
    },

    postText: {
        fontFamily: "Lexend-Regular",
        color: "white",
        fontSize: 10,
        flex: 1,
    },

    postLike: {
        fontSize: 25,
        color: "white",
    },

    postLiked: {
        fontSize: 25,
        color: "#E71D27",
    },

    exerciseButtom: {
        flexShrink: 1, 
        flexDirection: "row", 
        alignItems: "center", 
        padding: 20,
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: "#303030",
    },

    exerciseButtomText: {
        color: "white", 
        fontSize: 20, 
        fontFamily: "Lexend-Bold",
    },

    exerciseButtomIcon: {
        color: "white", 
        fontSize: 30,
    },
});

export default styles;