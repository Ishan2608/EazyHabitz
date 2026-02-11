import { View } from "react-native";
import AddButton from '@/components/AddButton';
import TaskList from '@/components/TaskList'
import Header from '@/components/Header';

export default function TasksLayout(){
    return (
        // This View now takes up the full screen, providing a container for its children.
        <View style={{ flex: 1 }}>
            <Header title="Tasks" />
            <TaskList/>
            <AddButton />
        </View>
    );
}