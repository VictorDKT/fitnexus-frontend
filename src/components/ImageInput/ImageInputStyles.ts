import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexShrink: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
    },

    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    imageLand: {
        width: 200,
        height: 120,
        borderRadius: 10,
    },

    pictureButtonIcon: {
        fontSize: 100,
        color: "white"
    }
});

export default styles;