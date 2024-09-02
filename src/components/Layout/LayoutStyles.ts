import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({    
    layout: {
        width: "100%",
        position: "relative",
        height: "100%",
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#1C1C1C",
    },

    loader: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 10
    },

    page: {
        backgroundColor: "#1C1C1C",
        color: "white",
        height: "100%", 
        width: "100%",
    },

    pageContainer: {
        width: "100%",
        height: "100%",
    },

    navBar: {
        flexShrink: 1,
        flexDirection: 'row', 
        width: "100%",
        backgroundColor: "#4A2121",
    },

    navItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
        padding: 10,
    },

    navItemActive: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "25%",
        padding: 10,
        borderTopWidth: 3,
        borderTopColor: 'white',
    },

    navIcon: {
        color: "#CCAD8F",
        marginBottom: 10,
    },

    navText: {
        color: "#CCAD8F",
        fontFamily: "Lexend-SemiBold",
    },

    navIconActive: {
        color: "white",
        marginBottom: 10,
    },

    navTextActive: {
        color: "white",
        fontFamily: "Lexend-SemiBold",
    },
});

export default styles;