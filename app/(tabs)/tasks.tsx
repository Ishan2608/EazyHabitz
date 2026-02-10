import { View } from "react-native";
import AddButton from '@/components/AddButton';
import TaskList from '@/components/TaskList'

export default function TasksLayout(){
    return (
        // This View now takes up the full screen, providing a container for its children.
        <View style={{ flex: 1 }}>
            <TaskList/>
            <AddButton />
        </View>
    );
}