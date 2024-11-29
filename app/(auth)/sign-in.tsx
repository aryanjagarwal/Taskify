import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAuth, useOAuth, useUser } from "@clerk/clerk-expo";
import { Colors } from "@/utils/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Link, useRouter } from "expo-router";

export const useWarmUpBrowser = () => {
  const { user } = useUser();
  const router = useRouter();
  const isSignedIn = useAuth();

  React.useEffect(() => {
    if (user) {
      router.replace("/(tabs)/tasks");
    }
  }, [isSignedIn]);

  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_facebook" });
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  const handleFacebookLogin = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/(tabs)/tasks", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  const handleGoogleLogin = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startGoogleOAuthFlow({
          redirectUrl: Linking.createURL("/(tabs)/tasks", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/panda3.png")}
        style={styles.loginImage}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>How would you like to use Taskify?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleFacebookLogin}
          >
            <View style={styles.loginButtonContent}>
              <FontAwesome name="facebook-square" size={24} color="white" />
              <Text style={styles.buttonText}>Continue with Facebook</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleGoogleLogin}
          >
            <View style={styles.loginButtonContent}>
              <FontAwesome name="google" size={24} color="white" />
              <Text style={styles.buttonText}>Continue with Google</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.subTitle}>Manage your tasks at ease</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  loginImage: {
    width: "100%",
    height: 500,
    resizeMode: "cover",
    borderRadius: 30,
  },
  scrollView: {
    flex: 1,
    gap: 20,
    alignItems: "center",
    //width: "100%",
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  buttonContainer: {
    gap: 20,
  },
  loginButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  loginButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    borderRadius: 99,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.GRAY,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "Roboto",
    fontSize: 18,
  },
  subTitle: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    marginTop: 20,
  },
});

export default SignIn;
