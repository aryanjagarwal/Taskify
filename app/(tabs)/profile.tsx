import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "@/utils/colors";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const userData = useQuery(api.users.getCurrentUser);
  const tasks = useQuery(
    api.tasks.getUserTasks,
    userData ? { userId: userData._id } : "skip"
  );

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!user || !userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  const completedTasks = tasks?.filter((task) => task.completed)?.length ?? 0;
  const pendingTasks = tasks?.filter((task) => !task.completed)?.length ?? 0;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Feather name="log-out" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: user.imageUrl || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.email}>{user.emailAddresses[0].emailAddress}</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{pendingTasks}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      {/* Settings Options */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            router.push("/account/editProfile");
          }}
        >
          <Feather name="user" size={24} color={Colors.PRIMARY} />
          <Text style={styles.settingText}>Edit Profile</Text>
          <Feather name="chevron-right" size={24} color={Colors.GRAY} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Feather name="bell" size={24} color={Colors.PRIMARY} />
          <Text style={styles.settingText}>Notifications</Text>
          <Feather name="chevron-right" size={24} color={Colors.GRAY} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            router.push("/account/privacyPolicy");
          }}
        >
          <Feather name="lock" size={24} color={Colors.PRIMARY} />
          <Text style={styles.settingText}>Privacy</Text>
          <Feather name="chevron-right" size={24} color={Colors.GRAY} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => {
            router.push("/support/helpCenter");
          }}
        >
          <Feather name="help-circle" size={24} color={Colors.PRIMARY} />
          <Text style={styles.settingText}>Help & Support</Text>
          <Feather name="chevron-right" size={24} color={Colors.GRAY} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.WHITE,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  signOutButton: {
    padding: 8,
  },
  profileInfo: {
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: Colors.GRAY,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    marginHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.GRAY,
    opacity: 0.3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 5,
  },
  settingsContainer: {
    padding: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
});

export default Profile;
