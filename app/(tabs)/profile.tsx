import { View, Text } from "react-native";
import { useAuth } from "@/context/authContext";

export default function ProfileLayout(){
    const {user} = useAuth();
    return(
        <View>
            <Text>
                {user? user.displayName: ""}
            </Text>
            <Text>
                {user? user.email: ""}
            </Text>
        </View>
    );
}