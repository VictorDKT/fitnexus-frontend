import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    profileBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 40,
        paddingBottom: 20,
    },
    profilePicture: {
        borderRadius: 50,
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    profileTitle: {
        color: "white",
        fontFamily: "Lexend-Bold",
        fontSize: 30,
        marginBottom: 10,
    },
    profileText: {
        color: "white",
        fontFamily: "Lexend-Regular",
        fontSize: 15,
        marginBottom: 5,
    },
    friendsBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    friendsBoxTitle: {
        color: "white",
        fontFamily: "Lexend-Bold",
        fontSize: 20,
        marginBottom: 10,
    },

    friendImagesContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },

    friendImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: -8,
    },

    achivementsBox: {
        flex: 1,
        marginLeft: 20,
        marginTop: 10,
        width: "100%",
    },

    achivementsBoxTitle: {
        color: "white",
        fontFamily: "Lexend-Bold",
        fontSize: 20,
        marginBottom: 10,
    },

    achivementsContentBox: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
    },

    achivementImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        position: "relative",
        borderRadius: 10,
    },

    achivementText: {
        position: "absolute",
        bottom: 5,
        left: 5,
        color: "white",
        fontFamily: "Lexend-SemiBold",
        fontSize: 12,
    },

    postBox: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        width: "100%",
    },

    postTitle: {
        color: "white",
        fontFamily: "Lexend-Bold",
        fontSize: 20,
        marginBottom: 10,
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
});

export default styles;