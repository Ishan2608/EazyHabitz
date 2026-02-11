
import { theme } from "@/styles/globals";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import { usePathname } from 'expo-router';

export default function AddButton(){
    const pathname = usePathname();

    const handlePress = () => {
        const screenName = pathname.split('/').pop();
        if (screenName && screenName !== '(tabs)') {
            const formatScreenName = screenName.charAt(0).toUpperCase() + screenName.slice(1);
            console.log(formatScreenName);
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePress}>
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
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Elevation for Android
        elevation: 5,
        // Box-shadow for Web
        ...Platform.select({
            web: {
                boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
            }
        })
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    }
});
