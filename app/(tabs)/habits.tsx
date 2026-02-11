import AddButton from '@/components/AddButton';
import HabitList from '@/components/HabitList';
import globalStyles from '@/styles/globals';
import { View } from 'react-native';

export default function HabitsPage() {
    return (
        <View style={{ flex: 1 }} >
            <HabitList />
            <AddButton/>
        </View>
    );
}