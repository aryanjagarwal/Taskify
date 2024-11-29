import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Octicons from "@expo/vector-icons/Octicons";
import { Colors } from "@/utils/colors";

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const icons: Record<string, (props: { color: string }) => JSX.Element> = {
    tasks: (props) => <Octicons name="checklist" size={24} {...props} />,
    completed: (props) => <Octicons name="check-circle" size={24} {...props} />,
    settings: (props) => <Octicons name="tools" size={24} {...props} />,
    profile: (props) => <Octicons name="person" size={24} {...props} />,
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: string =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabbarItem}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            //testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[route.name]?.({
              color: isFocused ? Colors.PRIMARY : "#969696",
            })}
            <Text
              style={{
                ...styles.label,
                color: isFocused ? Colors.PRIMARY : "#969696",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FEFEFA",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 14,
    shadowOpacity: 0.1,
    zIndex: 10,
  } as ViewStyle,
  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  label: {
    fontSize: 15,
  } as TextStyle,
});

export default TabBar;
