import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Colors } from "@/utils/colors";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Feather } from "@expo/vector-icons";
import { format, isToday, isTomorrow } from "date-fns";
import * as Haptics from "expo-haptics";
import { Id } from "@/convex/_generated/dataModel";

interface Task {
  _id: Id<"tasks">;
  userId: Id<"users">;
  title: string;
  dueDate?: string;
  priority?: string;
  completed: boolean;
}

interface Props {
  task: Task;
  onDelete?: () => void;
}

const TaskCard: React.FC<Props> = ({ task, onDelete }) => {
  const deleteTask = useMutation(api.tasks.deleteTask);
  const markTaskAsCompleted = useMutation(api.tasks.markTaskAsCompleted);

  const formatDueDate = (dateString: string | undefined) => {
    if (!dateString) return "No due date";

    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      if (isToday(date)) {
        return "Today";
      } else if (isTomorrow(date)) {
        return "Tomorrow";
      }
      return format(date, "MMM dd");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const getPriorityColor = (priority: string | undefined) => {
    if (!priority) return Colors.GRAY;

    switch (priority.toLowerCase()) {
      case "high":
        return "#ffcccb";
      case "medium":
        return Colors.PURPLE;
      case "low":
        return Colors.GREEN;
      default:
        return Colors.GRAY;
    }
  };

  const handleDelete = async () => {
    try {
      Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Warning
            );
            await deleteTask({ taskId: task._id });
            onDelete?.();
          },
        },
      ]);
    } catch (error) {
      console.error("Error deleting task:", error);
      Alert.alert("Error", "Failed to delete task");
    }
  };

  const handleComplete = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await markTaskAsCompleted({ taskId: task._id });
    } catch (error) {
      console.error("Error completing task:", error);
      Alert.alert("Error", "Failed to complete task");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={handleComplete}>
              <View
                style={[
                  styles.checkbox,
                  task.completed && styles.checkboxChecked,
                ]}
              >
                {task.completed && (
                  <Feather name="check" size={16} color={Colors.WHITE} />
                )}
              </View>
            </TouchableOpacity>
            <Text
              style={[styles.title, task.completed && styles.completedTitle]}
            >
              {task.title}
            </Text>
          </View>

          <View style={styles.detailsRow}>
            {task.priority && (
              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityColor(task.priority) },
                ]}
              >
                <Text style={styles.priorityText}>{task.priority}</Text>
              </View>
            )}
            <Text style={styles.date}>Due: {formatDueDate(task.dueDate)}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Feather name="trash-2" size={20} color={Colors.GRAY} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 98,
    padding: 16,
    marginVertical: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    gap: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    flex: 1,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: Colors.GRAY,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  date: {
    fontSize: 12,
    color: Colors.GRAY,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    color: Colors.DARK_GRAY1,
    fontWeight: "500",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: Colors.PRIMARY,
  },
  deleteButton: {
    padding: 8,
  },
});

export default TaskCard;
