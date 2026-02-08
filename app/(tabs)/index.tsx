import { Text, View } from 'react-native';
import {useAuth} from '@/context/authContext';

export default function Home(){
    const {user} = useAuth();
    return (
        <View>
            <Text>
                {`Welcome ${user?user.displayName:''}`}
            </Text>
        </View>
    );
}