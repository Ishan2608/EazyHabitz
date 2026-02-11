import AddButton from '@/components/AddButton';
import HabitList from '@/components/HabitList';
import { View } from 'react-native';
import Header from '@/components/Header';

export default function HabitsPage() {
    return (
        <View style={{ flex: 1 }} >
            <Header title="Habits" />
            <HabitList />
            <AddButton/>
        </View>
    );
}