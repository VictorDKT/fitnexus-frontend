import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    conquestPage: {
        padding: 20,
    },
    conquestItem: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "white",
        flexShrink: 1,
        flexDirection: "row",
        marginBottom: 10,
        padding: 10,
    },
    conquestImage: {
        borderRadius: 5,
        width: 60,
        height: 60,
    },
    conquestDataBox: {
        flexShrink: 2,
        justifyContent: "center",
        paddingLeft: 20,
    },
    conquestTitle: {
        marginBottom: 5,
        fontFamily: "Lexend-Bold",
        fontSize: 15,
        color: "white",
    },
    conquestText: {
        fontFamily: "Lexend-Regular",
        fontSize: 10,
        color: "white",
    },
});

export default styles;