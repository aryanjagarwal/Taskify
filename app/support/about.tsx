import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import { Colors } from "@/utils/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import Constants from "expo-constants";

const About = () => {
  const router = useRouter();
  const version = Constants.expoConfig?.version || "1.0.0";

  const handleLink = async (url: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Cannot open this URL");
    }
  };

  const InfoItem = ({
    icon,
    title,
    value,
  }: {
    icon: string;
    title: string;
    value: string;
  }) => (
    <View style={styles.infoItem}>
      <Feather name={icon as any} size={20} color={Colors.PRIMARY} />
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );

  const LinkButton = ({
    icon,
    title,
    url,
  }: {
    icon: string;
    title: string;
    url: string;
  }) => (
    <TouchableOpacity style={styles.linkButton} onPress={() => handleLink(url)}>
      <Feather name={icon as any} size={20} color={Colors.PRIMARY} />
      <Text style={styles.linkText}>{title}</Text>
      <Feather name="external-link" size={16} color={Colors.GRAY} />
    </TouchableOpacity>
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
        <Text style={styles.headerText}>About</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* App Logo and Info */}
        <View style={styles.appInfo}>
          <Image
            source={require("@/assets/images/app_icon.png")}
            style={styles.appIcon}
          />
          <Text style={styles.appName}>Taskify</Text>
          <Text style={styles.appVersion}>Version {version}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Taskify is your personal task management companion, designed to help
          you stay organized and boost your productivity. With intuitive
          features and a clean interface, managing your daily tasks has never
          been easier.
        </Text>

        {/* App Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoContainer}>
            <InfoItem
              icon="smartphone"
              title="Platform"
              value={Platform.OS === "ios" ? "iOS" : "Android"}
            />
            <InfoItem
              icon="code"
              title="Build Number"
              value={Constants.expoConfig?.ios?.buildNumber || "1"}
            />
            <InfoItem
              icon="calendar"
              title="Release Date"
              value="December 2024"
            />
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresList}>
            <FeatureItem icon="check-circle" text="Task Management" />
            <FeatureItem icon="clock" text="Due Dates & Reminders" />
            <FeatureItem icon="flag" text="Priority Levels" />
            <FeatureItem icon="bar-chart-2" text="Progress Tracking" />
          </View>
        </View>

        {/* Links */}
        <View style={styles.linksSection}>
          <Text style={styles.sectionTitle}>Connect With Us</Text>
          <View style={styles.linksContainer}>
            <LinkButton
              icon="globe"
              title="Website"
              url="https://taskify.com"
            />
            <LinkButton
              icon="twitter"
              title="Follow us on Twitter"
              url="https://twitter.com/taskify"
            />
            <LinkButton
              icon="mail"
              title="Contact Support"
              url="mailto:support@taskify.com"
            />
          </View>
        </View>

        {/* Credits */}
        <View style={styles.credits}>
          <Text style={styles.creditText}>
            Made with ❤️ by the Taskify Team
          </Text>
          <Text style={styles.copyright}>
            © 2024 Taskify. All rights reserved.
          </Text>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const FeatureItem = ({ icon, text }: { icon: string; text: string }) => (
  <View style={styles.featureItem}>
    <Feather name={icon as any} size={20} color={Colors.PRIMARY} />
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

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
  appInfo: {
    alignItems: "center",
    marginBottom: 24,
  },
  appIcon: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.DARK_GRAY,
    textAlign: "center",
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: Colors.PRIMARY,
  },
  infoSection: {
    marginBottom: 32,
  },
  infoContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: Colors.WHITE,
    padding: 12,
    borderRadius: 8,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    color: Colors.GRAY,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.DARK_GRAY,
  },
  featuresSection: {
    marginBottom: 32,
  },
  featuresList: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 12,
    padding: 16,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: Colors.WHITE,
    padding: 12,
    borderRadius: 8,
  },
  featureText: {
    marginLeft: 12,
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
  linksSection: {
    marginBottom: 32,
  },
  linksContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 12,
    padding: 16,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  linkText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
  credits: {
    alignItems: "center",
    marginTop: 16,
  },
  creditText: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
    marginBottom: 4,
  },
  copyright: {
    fontSize: 14,
    color: Colors.GRAY,
  },
});

export default About;
