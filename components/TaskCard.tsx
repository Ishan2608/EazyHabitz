import { StyleSheet, Text, View } from "react-native";
import { Task } from "@/types";
import {theme} from "@/styles/globals";

interface TaskCardProps {
    data: Task;
}

export default function TaskCard({ data }: TaskCardProps){
    return (
        <View style={styles.cont}>
            <Text>{data.title}</Text>
            <Text>{data.description}</Text>
            <Text>{data.dueDate?.toDate().toLocaleString()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cont: {
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'white',
        borderColor: theme.colors.secondary_fg,
        borderWidth: 0.5,
    }
})