import { View, Text, TouchableOpacity, } from "react-native";
import { useAuth } from "@/context/authContext";

export default function ProfileLayout(){
    const {user, logout} = useAuth();
    return(
        <View>
            <Text>
                {user? user.displayName: ""}
            </Text>
            <Text>
                {user? user.email: ""}
            </Text>
            <TouchableOpacity
                onPress={logout}
            >   
                <Text> Sign out </Text>
            </TouchableOpacity>
        </View>
    );
}