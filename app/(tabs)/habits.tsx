import HabitList from '@/components/HabitList';
import globalStyles from '@/styles/globals';
import { ScrollView } from 'react-native';

export default function HabitsPage() {
    return (
        <ScrollView style={globalStyles.container}>
            <HabitList />
        </ScrollView>
    );
}