import TaskCard from "@/components/TaskCard";
import { Task } from '@/types';
import { Timestamp } from 'firebase/firestore';
import { ScrollView, StyleSheet } from "react-native";
import globalStyles from "@/styles/globals";

export default function TaskList(){
    const data: Task = {
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
    }
    return (
        <ScrollView 
            contentContainerStyle={
                globalStyles.listContainer
            } 
            showsVerticalScrollIndicator={false}
        >
            <TaskCard data={data}/>
            <TaskCard data={data}/>
            <TaskCard data={data}/>
            <TaskCard data={data}/>
            <TaskCard data={data}/>
            <TaskCard data={data}/>
            <TaskCard data={data}/>
            <TaskCard data={data}/>
            <TaskCard data={data}/>
            <TaskCard data={data}/>
            <TaskCard data={data}/>
        </ScrollView>
    );
}
