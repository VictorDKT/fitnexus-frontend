import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
        flexShrink: 1,
        padding: 10,
        backgroundColor: "#2A2A2A",
        paddingLeft: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    headerTitle: {
        color: "white",
        fontFamily: "Lexend-Bold",
        fontSize: 20,
    },

    backIconContainer: {
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },
    
    backIcon: {
        color: "white",
        fontSize: 25,
    }
});

export default styles;