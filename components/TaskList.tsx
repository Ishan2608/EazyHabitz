import TaskCard from "@/components/TaskCard";
import { Task } from '@/types';
import { Timestamp } from 'firebase/firestore';
import { ScrollView, StyleSheet } from "react-native";
import globalStyles from "@/styles/globals";
import { useState } from "react";

const initialTasks: Task[] = [
    {
        id: '1',
        userId: '123',
        taskListId: null,
        goalId: null,
        title: 'Complete Project Proposal',
        description: "Finish writing the proposal for the new project initiative and send it for review.",
        dueDate: Timestamp.fromDate(new Date('2024-08-15T23:59:59')),
        status: "IN_PROGRESS",
        priority: "HIGH",
        reminderOffsetMinutes: 60,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    },
    {
        id: '2',
        userId: '123',
        taskListId: null,
        goalId: null,
        title: 'Schedule a dentist appointment',
        description: null,
        dueDate: Timestamp.fromDate(new Date('2024-09-01T23:59:59')),
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        reminderOffsetMinutes: 60,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    },
];

export default function TaskList(){
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const handleDelete = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <ScrollView 
            contentContainerStyle={
                globalStyles.listContainer
            } 
            showsVerticalScrollIndicator={false}
        >
            {tasks.map(task => (
                <TaskCard key={task.id} data={task} onDelete={handleDelete}/>
            ))}
        </ScrollView>
    );
}
