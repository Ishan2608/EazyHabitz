import React from 'react';
import { View, Text } from 'react-native';
import { Habit } from '@/types';
import { habitCardStyle as styles } from '@/styles';

interface HabitCardProps {
    data: Habit;
}

// Helper to get the first letter of the habit name for the icon
const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
};

// Helper to render the days of the week
const renderDay = (day: string, index: number, daysOfWeek: string[]) => {
    const isActive = daysOfWeek.includes(day.toUpperCase());
    return (
        <View key={index} style={[styles.dayCircle, isActive && styles.activeDayCircle]}>
            <Text style={[styles.dayText, isActive && styles.activeDayText]}>
                {day.charAt(0)}
            </Text>
        </View>
    );
};

export default function HabitCard({ data }: HabitCardProps) {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <View style={styles.cardContainer}>
            {/* Title container with icon and name */}
            <View style={styles.titleContainer}>
                <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>{getInitials(data.name)}</Text>
                </View>
                <Text style={styles.name}>{data.name}</Text>
            </View>

            {/* Description, indented below title */}
            {data.description && (
                <Text style={styles.description}>{data.description}</Text>
            )}

            {/* Schedule container, indented below title */}
            <View style={styles.scheduleContainer}>
                <Text style={styles.scheduleText}>{data.frequency}</Text>
            </View>

            {/* Display day circles for CUSTOM frequency, indented below title */}
            {data.frequency === 'CUSTOM' && data.daysOfWeek && (
                <View style={styles.daysContainer}>
                    {weekDays.map((day, index) => renderDay(day, index, data.daysOfWeek))}
                </View>
            )}
        </View>
    );
}