import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ 
                tabBarActiveTintColor: 'coral',
                headerShadowVisible: false,
                
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
            <Tabs.Screen name='auth' options={{
                title: "Auth", tabBarIcon: ({ color, focused }) => {
                    return focused ? (
                        <AntDesign name="login" size={24} color={color} />
                    ) : (
                        <Entypo name="login" size={24} color="black" />
                    )
                }

            }} />
        </Tabs>
    );
}