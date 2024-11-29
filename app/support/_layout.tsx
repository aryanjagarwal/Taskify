import { Stack } from "expo-router";
import { Colors } from "@/utils/colors";

const SupportLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="helpCenter"
        options={{
          title: "Help Center",
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: "About",
        }}
      />
    </Stack>
  );
};

export default SupportLayout;
