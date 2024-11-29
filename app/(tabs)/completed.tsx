import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/utils/colors";
import TaskCard from "@/components/TaskCard";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const Completed = () => {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useAuth();

  // Get current user and their completed tasks
  const userData = useQuery(api.users.getCurrentUser);
  const completedTasks = useQuery(
    api.tasks.getCompletedTasks,
    userData?._id ? { userId: userData._id } : "skip"
  );

  // Check authentication
  React.useEffect(() => {
    if (!isSignedIn) {
      router.replace("/(auth)/sign-in");
    }
  }, [isSignedIn]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  if (!userData || !completedTasks) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={completedTasks}
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
              <Text style={styles.headerText}>Completed Tasks</Text>
              <TouchableOpacity
                onPress={() => router.push("/(tabs)/settings")}
                style={styles.iconButton}
              >
                <Feather name="settings" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{completedTasks.length}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {
                    completedTasks.filter(
                      (task) =>
                        new Date(task.dueDate || "").toDateString() ===
                        new Date().toDateString()
                    ).length
                  }
                </Text>
                <Text style={styles.statLabel}>Today</Text>
              </View>
            </View>

            {completedTasks.length === 0 && (
              <View style={styles.emptyContainer}>
                <Feather name="check-circle" size={48} color={Colors.GRAY} />
                <Text style={styles.emptyText}>No completed tasks yet</Text>
                <Text style={styles.emptySubText}>
                  Complete tasks to see them here
                </Text>
              </View>
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
    </SafeAreaView>
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
  iconButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_GRAY,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.GRAY,
    opacity: 0.2,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.GRAY,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 8,
  },
  flatListContent: {
    padding: 20,
    paddingTop: 0,
  },
});

export default Completed;
