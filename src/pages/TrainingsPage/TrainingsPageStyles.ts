import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    exerciseContainer: {
        flexShrink: 1,
        justifyContent: "space-between",
        padding: 20,
        borderRadius: 20,
        marginTop: 20,
        borderColor: "white",
        borderWidth: 1,
        flexDirection: "row",
    },
    exerciseHeader: {
        flex: 1,
        flexDirection: "row",
    },
    exerciseImage: {
        marginRight: 10,
    },
    exerciseText: {
        fontFamily: "Lexend-Bold",
        fontSize: 15,
        color: "white",
    },
});

export default styles;