import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    exercicieContentBox: {
        flex: 1,
        height: "100%",
    },

    exercicieTitle: {
        fontFamily: "Lexend-Regular",
        color: "white",
        fontSize: 30,
    },

    exercicieDescription: {
        fontSize: 20,
        color: "white",
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
});

export default styles;