import AddButton from '@/components/AddButton';
import HabitList from '@/components/HabitList';
import { View } from 'react-native';

export default function HabitsPage() {
    return (
        <View style={{ flex: 1 }} >
            <HabitList />
            <AddButton/>
        </View>
    );
}