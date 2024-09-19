import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fade: {
        flex: 1, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        position: "absolute", 
        zIndex: 900, top: 0, 
        left: 0, 
        width: "100%", 
        height: "100%", 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    body: {
        borderRadius: 20,
        backgroundColor: "#303030",
        width: "80%",
    },
    content: {
        padding: 15,
    },
});

export default styles;