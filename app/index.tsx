import { useAuth } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { Redirect } from "expo-router";
import Welcome from "./welcome";

export default function Index() {
  const { userId } = useAuth();
  //const user: any = null;
  console.log("User:", userId);

  return (
    <View>{userId ? <Redirect href={"/(tabs)/tasks"} /> : <Welcome />}</View>
  );
}
