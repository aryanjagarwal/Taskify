import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";

const TabLayOut = () => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          title: "Completed",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayOut;
