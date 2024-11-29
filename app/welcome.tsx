import { Colors } from "@/utils/colors";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Welcome: React.FC = () => {
  const router = useRouter();

  return (
    <View
      style={{
        backgroundColor: Colors.PRIMARY,
      }}
    >
      <Image
        source={require("../assets/images/p1.png")}
        style={{ width: "100%", height: 520 }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Taskify</Text>
        <Text style={styles.subtitle}>
          Stay Organized, Achieve More. Conquer Your Day with Ease and
          Confidence!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(auth)/sign-in")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFF0",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: "100%",
    padding: 25,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    fontFamily: "Roboto",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 22,
    textAlign: "center",
    marginTop: 15,
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 99,
    marginTop: "15%",
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 18,
  },
});

export default Welcome;
