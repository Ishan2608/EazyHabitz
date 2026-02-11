import { useAuth } from '@/context/authContext';
import { Text, View } from 'react-native';
import Header from '@/components/Header'; // Import the new Header component

export default function Home(){
    const {user} = useAuth();
    return (
        <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
            <Header title="Home" />
            <View style={{ padding: 16 }}>
                <Text style={{ fontSize: 18, color: '#333' }}>
                    Welcome, {user?.displayName || 'Guest'}!
                </Text>
            </View>
        </View>
    );
}