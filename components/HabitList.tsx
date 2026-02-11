import HabitCard from "@/components/HabitCard";
import { Habit } from "@/types";
import { Timestamp } from "firebase/firestore";
import { ScrollView } from "react-native";
import globalStyles from "@/styles/globals";

const habits: Habit[] = [
    {
        id: '1',
        userId: '1',
        goalId: null,
        name: "Read for 30 minutes",
        description: "Read a book for at least 30 minutes every day",
        startDate: new Date(),
        endDate: new Date(),
        frequency: "DAILY",
        daysOfWeek: [],
        reminderTimes: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    },
    {
        id: '2',
        userId: '1',
        goalId: null,
        name: "Drink 8 glasses of water",
        description: "Stay hydrated by drinking at least 8 glasses of water",
        startDate: new Date(),
        endDate: new Date(),
        frequency: "DAILY",
        daysOfWeek: [],
        reminderTimes: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    },
    {
        id: '3',
        userId: '1',
        goalId: null,
        name: "Exercise for 30 minutes",
        description: "Do a workout for at least 30 minutes",
        startDate: new Date(),
        endDate: new Date(),
        frequency: "DAILY",
        daysOfWeek: [],
        reminderTimes: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    }
];

export default function HabitList(){
    return (
        <ScrollView 
            contentContainerStyle={globalStyles.listContainer} 
            showsVerticalScrollIndicator={false}
        >
            {habits.map(habit => (
                <HabitCard key={habit.id} data={habit}/>
            ))}
        </ScrollView>
    );
}
