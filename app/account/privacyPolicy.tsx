import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Colors } from "@/utils/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PrivacyPolicy = () => {
  const router = useRouter();

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionContent}>{children}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Privacy Policy</Text>
        <View style={{ width: 24 }} /> {/* Empty view for spacing */}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lastUpdated}>
          Last updated: {new Date().toLocaleDateString()}
        </Text>

        <Section title="Introduction">
          Welcome to Taskify. We are committed to protecting your personal
          information and your right to privacy. This Privacy Policy explains
          how we collect, use, and share your information when you use our
          mobile application.
        </Section>

        <Section title="Information We Collect">
          We collect information that you provide directly to us, including:
          {"\n\n"}• Account information (name, email, profile picture)
          {"\n"}• Task-related data (tasks, due dates, priorities)
          {"\n"}• Usage data and preferences
          {"\n"}• Device information and identifiers
        </Section>

        <Section title="How We Use Your Information">
          We use the information we collect to:
          {"\n\n"}• Provide and maintain our services
          {"\n"}• Personalize your experience
          {"\n"}• Improve our application
          {"\n"}• Communicate with you
          {"\n"}• Ensure security and prevent fraud
        </Section>

        <Section title="Data Storage and Security">
          We implement appropriate technical and organizational measures to
          protect your personal information. Your data is stored securely and
          encrypted during transmission.
        </Section>

        <Section title="Your Rights">
          You have the right to:
          {"\n\n"}• Access your personal data
          {"\n"}• Correct inaccurate data
          {"\n"}• Request deletion of your data
          {"\n"}• Object to data processing
          {"\n"}• Export your data
        </Section>

        <Section title="Third-Party Services">
          We may use third-party services that collect information about you.
          These services have their own privacy policies and terms of service.
        </Section>

        <Section title="Changes to This Policy">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page and
          updating the "Last updated" date.
        </Section>

        <Section title="Contact Us">
          If you have any questions about this Privacy Policy, please contact us
          at:
          {"\n\n"}Email: support@taskify.com
          {"\n"}Address: 123 Task Street, Productivity City, 12345
        </Section>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
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
    padding: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 20,
    fontStyle: "italic",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.PRIMARY,
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.DARK_GRAY,
  },
});

export default PrivacyPolicy;
