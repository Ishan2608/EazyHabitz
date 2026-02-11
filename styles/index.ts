import { StyleSheet } from "react-native";
import { theme } from "./globals";

// Existing style for Task Cards
export const taskCardStyle = StyleSheet.create(
    {
        cardContainer: {
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'flex-start',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        checkbox: {
            width: 18,
            height: 18,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#8E8E93',
            marginRight: 16,
            marginTop: 1,
        },
        textContainer: {
            flex: 1,
        },
        title: {
            fontSize: 16,
            fontWeight: '600',
            color: '#1C1C1E',
            marginBottom: 4,
        },
        description: {
            fontSize: 14,
            color: '#6C6C6E',
            marginBottom: 8,
        },
        dueDate: {
            fontSize: 12,
            color: theme.colors.error,
            fontWeight: '500',
        },
    }
);

// Updated style for Habit Cards
export const habitCardStyle = StyleSheet.create({
    cardContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.secondary_fg + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    iconText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: theme.colors.secondary_fg,
    },
    name: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1C1C1E',
        flex: 1,
    },
    description: {
        fontSize: 14,
        color: '#8E8E93',
        marginBottom: 8,
    },
    scheduleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    scheduleText: {
        fontSize: 12,
        color: theme.colors.secondary_fg,
        fontWeight: '500',
        marginLeft: 4,
    },
    daysContainer: {
        flexDirection: 'row',
        marginTop: 8,
    },
    dayCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#F2F2F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    dayText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#8E8E93',
    },
    activeDayCircle: {
        backgroundColor: theme.colors.secondary_fg,
    },
    activeDayText: {
        color: 'white',
    },
});