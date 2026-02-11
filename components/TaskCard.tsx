import { taskCardStyle as styles } from "@/styles/index";
import { Task } from "@/types";
import { Text, View, TouchableOpacity } from "react-native";

interface TaskCardProps {
    data: Task;
    onDelete: (id: string) => void;
}

export default function TaskCard({ data, onDelete }: TaskCardProps){
    return (
        <View style={styles.cardContainer}>
            {/* Checkbox Circle */}
            <TouchableOpacity onPress={() => onDelete(data.id)}>
                <View style={styles.checkbox} />
            </TouchableOpacity>

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
