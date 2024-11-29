import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import TaskCard from "@/components/TaskCard";
import AddTaskModal from "@/components/AddTaskModal";
import { Colors } from "@/utils/colors";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const Tasks = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  // Get current user and their tasks
  const userData = useQuery(api.users.getCurrentUser);
  const tasks = useQuery(
    api.tasks.getUserTasks,
    userData?._id ? { userId: userData._id } : "skip"
  );

  // Function to open the BottomSheetModal
  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  // Check authentication
  React.useEffect(() => {
    if (!isSignedIn) {
      router.replace("/(auth)/sign-in");
    }
  }, [isSignedIn]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // Wait for a second to simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  if (!userData || !tasks) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              onDelete={() => {
                // Task will automatically update due to Convex's real-time updates
              }}
            />
          )}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={
            <View>
              <View style={styles.header}>
                <Text style={styles.headerText}>To-Do List</Text>
                <TouchableOpacity
                  onPress={() => router.push("/(tabs)/settings")}
                >
                  <Feather name="settings" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.tasks}>Tasks</Text>
              {tasks.length === 0 && (
                <Text style={styles.emptyText}>
                  No tasks yet. Tap the + button to add one!
                </Text>
              )}
            </View>
          }
          contentContainerStyle={styles.flatListContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.PRIMARY]}
            />
          }
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={openBottomSheet}
        >
          <Feather name="plus" size={52} color="white" />
        </TouchableOpacity>

        <AddTaskModal ref={bottomSheetModalRef} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tasks: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 20,
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    color: Colors.GRAY,
    marginTop: 20,
    fontSize: 16,
  },
  flatListContent: {
    padding: 20,
    paddingTop: 0,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 110,
    right: 20,
    backgroundColor: Colors.PRIMARY,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Tasks;
