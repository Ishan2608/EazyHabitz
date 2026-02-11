import { useAuth } from '@/context/authContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";

export default function TabLayout() {
    const {user} = useAuth()
    return (
        <Tabs screenOptions={{ 
                tabBarActiveTintColor: 'coral',
                headerShadowVisible: false,
                // headerShown: false
            }}>
            <Tabs.Screen name='index' options={
                {
                    title: `Hi, ${user?.displayName}`,
                    tabBarIcon: ({ color, focused }) => {
                        return <AntDesign name="home" size={24} color={focused?color:"black"} />
                    }
                }
            } />

            <Tabs.Screen name='habits' options={{
                title: "Your Habits", tabBarIcon: ({ color, focused }) => {
                    return <MaterialIcons name="offline-bolt" size={24} color={focused? color: "black"} />
                }

            }} />
            <Tabs.Screen name='tasks' options={{
                title: "Your Tasks", tabBarIcon: ({ color, focused }) => {
                    return <MaterialIcons name="add-task" size={24} color={focused?color: "black"} />
                }

            }} />

            <Tabs.Screen name='profile' options={{
                title: "Hey, It's You", tabBarIcon: ({ color, focused }) => {
                    return <FontAwesome name="user-circle" size={24} color={focused?color:"black"} />
                }

            }} />
        </Tabs>
    );
}