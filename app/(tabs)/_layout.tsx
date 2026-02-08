import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ 
                tabBarActiveTintColor: 'coral',
                headerShadowVisible: false,
                // headerShown: false
            }}>
            <Tabs.Screen name='index' options={
                {
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => {
                        return focused ? (
                            <AntDesign name="home" size={24} color={color} />
                        ) : (
                            <Entypo name="home" size={24} color="black" />
                        )
                    }

                }
            } />

            <Tabs.Screen name='profile' options={{
                title: "Profile", tabBarIcon: ({ color, focused }) => {
                    return focused ? (
                        <FontAwesome name="user-circle" size={24} color={color} />
                    ) : (
                        <FontAwesome name="user-circle-o" size={24} color="black" />
                    )
                }

            }} />

            <Tabs.Screen name='habits' options={{
                title: "Habits", tabBarIcon: ({ color, focused }) => {
                    return focused ? (
                        <MaterialIcons name="offline-bolt" size={24} color={color} />
                    ) : (
                        <FontAwesome6 name="bolt" size={24} color="black" />
                    )
                }

            }} />
            <Tabs.Screen name='tasks' options={{
                title: "Tasks", tabBarIcon: ({ color, focused }) => {
                    return focused ? (
                        <MaterialIcons name="add-task" size={24} color={color} />
                    ) : (
                        <MaterialIcons name="task-alt" size={24} color="black" />
                    )
                }

            }} />
        </Tabs>
    );
}