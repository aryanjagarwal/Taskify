import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/utils/colors";
import { Feather } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

const Settings = () => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
          );
          await signOut();
          router.replace("/(auth)/sign-in");
        },
      },
    ]);
  };

  const SettingItem = ({
    icon,
    title,
    onPress,
    value,
    isSwitch,
    showBorder = true,
  }: {
    icon: string;
    title: string;
    onPress?: () => void;
    value?: boolean;
    isSwitch?: boolean;
    showBorder?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.settingItem, showBorder && styles.settingItemBorder]}
      onPress={onPress}
      disabled={isSwitch}
    >
      <View style={styles.settingItemLeft}>
        <Feather name={icon as any} size={22} color={Colors.PRIMARY} />
        <Text style={styles.settingItemText}>{title}</Text>
      </View>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onPress}
          trackColor={{ false: Colors.GRAY, true: Colors.PRIMARY }}
          thumbColor={Colors.WHITE}
        />
      ) : (
        <Feather name="chevron-right" size={22} color={Colors.GRAY} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user?.imageUrl || "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.profileEmail}>
            {user?.emailAddresses[0].emailAddress}
          </Text>
        </View>
      </View>

      {/* Settings Groups */}
      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>Preferences</Text>
        <View style={styles.groupContainer}>
          <SettingItem
            icon="bell"
            title="Notifications"
            onPress={() => setNotifications(!notifications)}
            value={notifications}
            isSwitch
          />
          <SettingItem
            icon="moon"
            title="Dark Mode"
            onPress={() => setDarkMode(!darkMode)}
            value={darkMode}
            isSwitch
          />
        </View>
      </View>

      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>Account</Text>
        <View style={styles.groupContainer}>
          <SettingItem
            icon="user"
            title="Edit Profile"
            onPress={() => {
              router.push("/account/editProfile");
            }}
          />
          <SettingItem icon="lock" title="Change Password" onPress={() => {}} />
          <SettingItem
            icon="shield"
            title="Privacy"
            onPress={() => {
              router.push("/account/privacyPolicy");
            }}
            showBorder={false}
          />
        </View>
      </View>

      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>Support</Text>
        <View style={styles.groupContainer}>
          <SettingItem
            icon="help-circle"
            title="Help Center"
            onPress={() => {
              router.push("/support/helpCenter");
            }}
          />
          <SettingItem
            icon="message-circle"
            title="Contact Us"
            onPress={() => {
              router.push("/support/contactUs");
            }}
          />
          <SettingItem
            icon="info"
            title="About"
            onPress={() => {
              router.push("/support/about");
            }}
            showBorder={false}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.WHITE,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  settingsGroup: {
    marginBottom: 25,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.GRAY,
    marginLeft: 20,
    marginBottom: 10,
  },
  groupContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
  },
  settingItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
  signOutButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: "#ffcccb",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  signOutText: {
    color: "#d63031",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Settings;
