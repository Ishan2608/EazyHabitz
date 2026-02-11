import { useAuth } from '@/context/authContext';
import { Text, View } from 'react-native';

export default function Home(){
    const {user} = useAuth();
    return (
        <View>
            <Text>
                Welcome to Home
            </Text>
        </View>
    );
}