import HabitList from '@/components/HabitList';
import globalStyles from '@/styles/globals';
import { View } from 'react-native';

export default function HabitsPage() {
    return (
        <View 
            style={globalStyles.container}
        >
            <HabitList />
        </View>
    );
}