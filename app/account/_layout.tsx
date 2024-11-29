import { Stack } from "expo-router";
import { Colors } from "@/utils/colors";

const AccountLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="editProfile"
        options={{
          title: "Edit Profile",
        }}
      />
      <Stack.Screen
        name="privacyPolicy"
        options={{
          title: "Privacy Policy",
        }}
      />
    </Stack>
  );
};

export default AccountLayout;
