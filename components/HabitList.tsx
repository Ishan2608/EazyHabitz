import globalStyles from '@/styles/globals';
import { Habit } from '@/types';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { ScrollView } from 'react-native';
import HabitCard from './HabitCard';

const mockHabits: Habit[] = [
    {
        id: '1',
        userId: 'user123',
        goalId: null,
        name: 'Read for 15 Minutes',
        description: 'Read a book before bed.',
        startDate: new Date(),
        endDate: new Date(),
        frequency: 'DAILY',
        daysOfWeek: [], // Not needed for DAILY
        reminderTimes: ['21:00'],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    },
    {
        id: '2',
        userId: 'user123',
        goalId: 'goal456',
        name: 'Go to the Gym',
        description: 'Complete a full workout session.',
        startDate: new Date(),
        endDate: new Date(),
        frequency: 'CUSTOM',
        daysOfWeek: ['MON', 'WED', 'FRI'],
        reminderTimes: ['08:00'],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    },
    {
        id: '3',
        userId: 'user123',
        goalId: null,
        name: 'Drink 8 Glasses of Water',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        frequency: 'DAILY',
        daysOfWeek: [],
        reminderTimes: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    },
    {
        id: '3',
        userId: 'user123',
        goalId: null,
        name: 'Drink 8 Glasses of Water',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        frequency: 'DAILY',
        daysOfWeek: [],
        reminderTimes: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    },
    {
        id: '3',
        userId: 'user123',
        goalId: null,
        name: 'Drink 8 Glasses of Water',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        frequency: 'DAILY',
        daysOfWeek: [],
        reminderTimes: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    },
];

export default function HabitList() {
    return (
        <ScrollView 
            showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.listContainer}>
            {mockHabits.map(habit => (
                <HabitCard key={habit.id} data={habit} />
            ))}
        </ScrollView>
    );
}