import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/utils/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import * as Haptics from "expo-haptics";

const EditProfile = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const handleSave = async () => {
    try {
      setLoading(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      await user?.update({
        firstName,
        lastName,
      });

      Alert.alert("Success", "Profile updated successfully");
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setLoading(true);
        await user?.setProfileImage({
          file: await fetch(result.assets[0].uri).then((r) => r.blob()),
        });
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to update profile picture");
    }
  };

  if (!isLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.PRIMARY} />
          ) : (
            <Text style={styles.saveButton}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Profile Picture */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: user?.imageUrl || "https://via.placeholder.com/150" }}
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={styles.changePhotoButton}
          onPress={handleImagePick}
        >
          <Text style={styles.changePhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
            placeholderTextColor={Colors.GRAY}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
            placeholderTextColor={Colors.GRAY}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={user?.emailAddresses[0].emailAddress}
            editable={false}
          />
        </View>
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
    backgroundColor: Colors.WHITE,
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
    fontSize: 20,
    fontWeight: "600",
  },
  saveButton: {
    color: Colors.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  changePhotoButton: {
    backgroundColor: Colors.LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changePhotoText: {
    color: Colors.PRIMARY,
    fontSize: 14,
    fontWeight: "500",
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.DARK_GRAY,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: Colors.WHITE,
  },
  disabledInput: {
    backgroundColor: Colors.LIGHT_GRAY,
    color: Colors.GRAY,
  },
});

export default EditProfile;
