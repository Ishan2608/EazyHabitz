import { theme } from "@/styles/globals";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function AddButton(){
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>New</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: theme.colors.button_bg,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    }
});
