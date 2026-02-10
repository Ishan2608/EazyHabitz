import { StyleSheet, Text, View } from "react-native";
import { Task } from "@/types";
import { theme } from "@/styles/globals";

interface TaskCardProps {
    data: Task;
}

export default function TaskCard({ data }: TaskCardProps){
    return (
        <View style={styles.cardContainer}>
            {/* Checkbox Circle */}
            <View style={styles.checkbox} />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.title}</Text>

                {/* Conditionally render description if it exists */}
                {data.description ? (
                    <Text style={styles.description}>{data.description}</Text>
                ) : null}

                {/* Conditionally render due date with better formatting */}
                {data.dueDate ? (
                    <Text style={styles.dueDate}>
                        {data.dueDate?.toDate().toLocaleDateString(undefined, {
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Text>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        // Subtle shadow for depth, similar to Google's Material Design
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 12, // Circular checkbox
        borderWidth: 2,
        borderColor: '#8E8E93', // A neutral, secondary color
        marginRight: 16,
        marginTop: 1, // Fine-tune vertical alignment with the title
    },
    textContainer: {
        flex: 1, // Allows text to wrap and take up the remaining space
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E', // A strong, dark color for the title
        marginBottom: 4, // Space between title and description
    },
    description: {
        fontSize: 14,
        color: '#6C6C6E', // A lighter, secondary color for the description
        marginBottom: 8, // Space between description and date
    },
    dueDate: {
        fontSize: 12,
        color: theme.colors.error, // Use your app's primary theme color for emphasis
        fontWeight: '500',
    },
});