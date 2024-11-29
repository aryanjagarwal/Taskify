import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState, useCallback } from "react";
import { Colors } from "@/utils/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";

// Help categories and their respective FAQs
const helpData = {
  "Getting Started": [
    {
      question: "How do I create a new task?",
      answer:
        "To create a new task, tap the + button at the bottom of the screen. Fill in the task details like title, due date, and priority, then tap Save.",
    },
    {
      question: "How do I edit a task?",
      answer:
        "Tap on any existing task to open the edit screen. Make your changes and tap Save to update the task.",
    },
  ],
  "Account & Settings": [
    {
      question: "How do I change my profile picture?",
      answer:
        "Go to Profile > Edit Profile, then tap on your current profile picture to select a new one from your device.",
    },
    {
      question: "How do I change my password?",
      answer:
        "Go to Settings > Security, then select Change Password and follow the prompts.",
    },
  ],
  "Task Management": [
    {
      question: "How do I set task priority?",
      answer:
        "When creating or editing a task, you can select priority levels: High, Medium, or Low. This helps organize tasks by importance.",
    },
    {
      question: "How do I mark a task as complete?",
      answer:
        "Simply tap the checkbox next to any task to mark it as complete. You can view completed tasks in the Completed tab.",
    },
  ],
  Troubleshooting: [
    {
      question: "The app is running slowly",
      answer:
        "Try clearing the app cache in Settings > Storage, or restart the app. If issues persist, please contact support.",
    },
    {
      question: "I can't sync my tasks",
      answer:
        "Check your internet connection and ensure you're logged in. If problems continue, try logging out and back in.",
    },
  ],
};

const HelpCenter = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const handleCategoryPress = (category: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategory(category);
    setExpandedQuestion(null);
  };

  const handleQuestionPress = (question: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpandedQuestion(expandedQuestion === question ? null : question);
  };

  const filteredFAQs = useCallback(() => {
    let faqs: Array<{ category: string; question: string; answer: string }> =
      [];

    Object.entries(helpData).forEach(([category, questions]) => {
      questions.forEach((q) => {
        faqs.push({
          category,
          question: q.question,
          answer: q.answer,
        });
      });
    });

    if (searchQuery) {
      return faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      return faqs.filter((faq) => faq.category === selectedCategory);
    }

    return faqs;
  }, [searchQuery, selectedCategory]);

  const renderFAQItem = ({
    item,
  }: {
    item: { question: string; answer: string };
  }) => (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => handleQuestionPress(item.question)}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.question}>{item.question}</Text>
        <Feather
          name={
            expandedQuestion === item.question ? "chevron-up" : "chevron-down"
          }
          size={20}
          color={Colors.GRAY}
        />
      </View>
      {expandedQuestion === item.question && (
        <Text style={styles.answer}>{item.answer}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Help Center</Text>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => router.push("/support/contactUs")}
        >
          <Feather name="message-circle" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color={Colors.GRAY} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search help articles..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.GRAY}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Feather name="x" size={20} color={Colors.GRAY} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Categories */}
      {!searchQuery && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {Object.keys(helpData).map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonSelected,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* FAQs */}
      <FlatList
        data={filteredFAQs()}
        renderItem={renderFAQItem}
        keyExtractor={(item) => item.question}
        contentContainerStyle={styles.faqList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Feather name="search" size={48} color={Colors.GRAY} />
            <Text style={styles.emptyStateText}>No results found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try searching with different keywords
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  contactButton: {
    padding: 8,
    marginRight: -8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.LIGHT_GRAY,
    margin: 20,
    padding: 12,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: Colors.DARK_GRAY,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    marginRight: 8,
  },
  categoryButtonSelected: {
    backgroundColor: Colors.PRIMARY,
  },
  categoryText: {
    color: Colors.DARK_GRAY,
    fontSize: 14,
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: Colors.WHITE,
  },
  faqList: {
    padding: 20,
    paddingTop: 0,
  },
  faqItem: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    marginRight: 16,
  },
  answer: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.DARK_GRAY,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.GRAY,
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 8,
  },
});

export default HelpCenter;
