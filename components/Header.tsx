import { View, Text, Image } from 'react-native';
import { useAuth } from '@/context/authContext';
import { headerStyle as styles } from '@/styles/index';

export default function Header({ title }: { title: string }) {
    const { user } = useAuth();

    const getInitials = (name: string) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.leftContainer}>
                <Image
                    source={require('../assets/images/icon.png')} // Assuming you have an icon at this path
                    style={styles.appIcon}
                />
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

            {user?.photoUrl ? (
                <Image
                    source={{ uri: user.photoUrl }}
                    style={styles.profileImage}
                />
            ) : (
                <View style={styles.profileInitialContainer}>
                    <Text style={styles.profileInitialText}>
                        {getInitials(user?.displayName || '')}
                    </Text>
                </View>
            )}
        </View>
    );
}