
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from "@/context/authContext";
import { Feather } from '@expo/vector-icons';
import { theme } from "@/styles/globals";

export default function ProfileLayout() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          <View style={styles.profileSection}>
            <TouchableOpacity style={styles.avatarContainer}>
              {user?.photoUrl ? (
                <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Feather name="camera" size={40} color="#fff" />
                </View>
              )}
               <View style={styles.cameraIcon}>
                  <Feather name="camera" size={18} color="#fff" />
              </View>
            </TouchableOpacity>
            <Text style={styles.userName}>{user?.displayName || 'Guest'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
                <Feather name="user" size={20} color="#A9A9A9" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    value={user ? user.displayName : ""}
                    placeholder="Username"
                    placeholderTextColor="#A9A9A9"
                />
            </View>
          </View>

          <View style={styles.actionsSection}>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="edit" size={20} color="#2C3E50" />
              <Text style={styles.actionText}>Update Profile</Text>
              <Feather name="chevron-right" size={20} color="#A9A9A9" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={logout}>
              <Feather name="log-out" size={20} color="#2C3E50" />
              <Text style={styles.actionText}>Sign Out</Text>
              <Feather name="chevron-right" size={20} color="#A9A9A9" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
              <Feather name="trash-2" size={20} color="#E74C3C" />
              <Text style={[styles.actionText, styles.deleteText]}>Delete Account</Text>
              <Feather name="chevron-right" size={20} color="#A9A9A9" />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      backgroundColor: theme.colors.button_bg,
      padding: 8,
      borderRadius: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  form: {
      marginBottom: 30,
  },
  inputGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: '#EDEDED',
  },
  inputIcon: {
      marginRight: 10,
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 16,
    color: '#2C3E50',
  },
  actionsSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EDEDED',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
    marginLeft: 15,
  },
  deleteButton: {
    borderBottomWidth: 0,
  },
  deleteText: {
    color: '#E74C3C',
  }
});
