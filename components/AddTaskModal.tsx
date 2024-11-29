import React, { forwardRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Colors } from "@/utils/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import * as Haptics from "expo-haptics";
import { format } from "date-fns";

type Priority = "Low" | "Medium" | "High";

const AddTaskModal = forwardRef<BottomSheetModal>((_, ref) => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [priority, setPriority] = useState<Priority>("Medium");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current user
  const userData = useQuery(api.users.getCurrentUser);
  // Create task mutation
  const createTask = useMutation(api.tasks.createTask);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }

    if (!userData?._id) {
      Alert.alert("Error", "User not found");
      return;
    }

    try {
      setIsSubmitting(true);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      await createTask({
        title: title.trim(),
        dueDate: dueDate.toISOString(),
        priority,
        userId: userData._id,
      });

      // Reset form
      setTitle("");
      setDueDate(new Date());
      setPriority("Medium");

      // Close modal
      ref?.current?.dismiss();
    } catch (error) {
      console.error("Error creating task:", error);
      Alert.alert("Error", "Failed to create task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const PriorityButton = ({ level }: { level: Priority }) => (
    <TouchableOpacity
      style={[
        styles.priorityButton,
        priority === level && styles.priorityButtonActive,
        { backgroundColor: getPriorityColor(level) },
      ]}
      onPress={() => setPriority(level)}
    >
      <Text
        style={[
          styles.priorityButtonText,
          priority === level && styles.priorityButtonTextActive,
        ]}
      >
        {level}
      </Text>
    </TouchableOpacity>
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={["85%"]}
      backgroundComponent={CustomBackground}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Add New Task</Text>

        {/* Task Title Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter task title"
            placeholderTextColor={Colors.GRAY}
          />
        </View>

        {/* Due Date Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {format(dueDate, "MMM dd, yyyy")}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              style={{
                backgroundColor: "black",
                borderRadius: 10,
                marginTop: 5,
              }}
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Priority Selection */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            <PriorityButton level="Low" />
            <PriorityButton level="Medium" />
            <PriorityButton level="High" />
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={Colors.WHITE} />
          ) : (
            <Text style={styles.submitButtonText}>Add Task</Text>
          )}
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const CustomBackground = ({ style }: any) => {
  return (
    <BlurView
      intensity={2}
      style={[style, { backgroundColor: "rgba(255, 255, 255, 0.97)" }]}
    />
  );
};

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "Low":
      return Colors.GREEN;
    case "Medium":
      return Colors.PURPLE;
    case "High":
      return "#ffcccb";
    default:
      return Colors.GRAY;
  }
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
    padding: 12,
  },
  dateButtonText: {
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  priorityButtonActive: {
    opacity: 1,
  },
  priorityButtonText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
  priorityButtonTextActive: {
    color: "black",
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddTaskModal;
