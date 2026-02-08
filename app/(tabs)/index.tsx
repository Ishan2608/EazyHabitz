import { useAuth } from '@/context/authContext';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Home(){
    const {user, logout} = useAuth();
    return (
        <View>
            <Text>
                {`Welcome ${user?user.displayName:''}`}
            </Text>
            <TouchableOpacity
                onPress={logout}
            >Sign out</TouchableOpacity>
        </View>
    );
}