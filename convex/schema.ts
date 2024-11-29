import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// Define the User schema
export const User = {
  email: v.string(),
  clerkId: v.string(),
  imageUrl: v.optional(v.string()),
  first_name: v.optional(v.string()),
  last_name: v.optional(v.string()),
  username: v.optional(v.string()), // Added username to the User schema
};

// Define the Task schema
export const Task = {
  userId: v.id('users'), // Foreign key to User table, specifying the 'users' table name
  title: v.string(), // Title of the task
  completed: v.boolean(), // Task completion status
  dueDate: v.optional(v.string()), // Optional due date (ISO string format)
  priority: v.optional(v.string()), // Priority with enum values (Low, Medium, High)
};

// Define the tables
export default defineSchema({
    users: defineTable(User).index('byClerkId', ['clerkId']).searchIndex('searchUsers', {
      searchField: 'username',
    }),
    tasks: defineTable(Task)
      .index('byUserId', ['userId']) 
      .index('byUserIdDueDate', ['userId', 'dueDate']),  // This is the compound index
  });
