import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/utils/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import * as Linking from "expo-linking";
import { useUser } from "@clerk/clerk-expo";

const ContactUs = () => {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "General Inquiry",
    "Technical Support",
    "Feature Request",
    "Bug Report",
    "Other",
  ];

  const contactMethods = [
    {
      icon: "mail",
      title: "Email Us",
      subtitle: "support@taskify.com",
      action: () => handleEmail(),
    },
    {
      icon: "message-circle",
      title: "Live Chat",
      subtitle: "Available 24/7",
      action: () => handleLiveChat(),
    },
    {
      icon: "phone",
      title: "Call Us",
      subtitle: "+1 (555) 123-4567",
      action: () => handleCall(),
    },
  ];

  const handleSubmit = async () => {
    if (!selectedCategory) {
      Alert.alert("Error", "Please select a category");
      return;
    }
    if (!subject.trim()) {
      Alert.alert("Error", "Please enter a subject");
      return;
    }
    if (!message.trim()) {
      Alert.alert("Error", "Please enter your message");
      return;
    }

    try {
      setLoading(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Here you would typically send the message to your backend
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert(
        "Success",
        "Your message has been sent. We'll get back to you soon!",
        [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async () => {
    const url = `mailto:support@taskify.com?subject=${encodeURIComponent(
      subject || "Contact from Taskify App"
    )}&body=${encodeURIComponent(message)}`;
    await Linking.openURL(url);
  };

  const handleCall = () => {
    Linking.openURL("tel:+15551234567");
  };

  const handleLiveChat = () => {
    // Implement your live chat solution here
    Alert.alert("Live Chat", "Live chat feature coming soon!", [
      { text: "OK" },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Contact Us</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Contact Methods */}
        <View style={styles.contactMethods}>
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactMethod}
              onPress={method.action}
            >
              <View style={styles.methodIcon}>
                <Feather
                  name={method.icon as any}
                  size={24}
                  color={Colors.PRIMARY}
                />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodTitle}>{method.title}</Text>
                <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
              </View>
              <Feather name="chevron-right" size={20} color={Colors.GRAY} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Send us a message</Text>

          {/* Category Selection */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryContainer}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryButton,
                  selectedCategory === category &&
                    styles.categoryButtonSelected,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.categoryTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Subject Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={setSubject}
              placeholder="Enter subject"
              placeholderTextColor={Colors.GRAY}
            />
          </View>

          {/* Message Input */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message here..."
              placeholderTextColor={Colors.GRAY}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              loading && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.WHITE} />
            ) : (
              <Text style={styles.submitButtonText}>Send Message</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  contactMethods: {
    padding: 20,
  },
  contactMethod: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  methodInfo: {
    flex: 1,
    marginLeft: 12,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  methodSubtitle: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  form: {
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    marginRight: 8,
  },
  categoryButtonSelected: {
    backgroundColor: Colors.PRIMARY,
  },
  categoryText: {
    color: Colors.DARK_GRAY,
    fontSize: 14,
  },
  categoryTextSelected: {
    color: Colors.WHITE,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: Colors.DARK_GRAY,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ContactUs;
