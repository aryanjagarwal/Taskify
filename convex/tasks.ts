import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// New function: Create task
export const createTask = mutation({
  args: {
    title: v.string(),
    dueDate: v.string(),
    priority: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", {
      title: args.title,
      dueDate: args.dueDate,
      priority: args.priority,
      userId: args.userId,
      completed: false,
    });
    return taskId;
  },
});

// New function: Get all tasks for a user
export const getUserTasks = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// New function: Update task
export const updateTask = mutation({
  args: {
    taskId: v.id("tasks"),
    title: v.optional(v.string()),
    dueDate: v.optional(v.string()),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { taskId, ...updates } = args;
    await ctx.db.patch(taskId, updates);
    return { success: true };
  },
});


export const deleteTask = mutation({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    // Verify the task exists
    const existingTask = await ctx.db.get(args.taskId);
    if (!existingTask) {
      throw new Error("Task not found");
    }

    // Get the current user's identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Delete the task
    await ctx.db.delete(args.taskId);
    return { success: true };
  },
});

// Mutation: Mark a task as completed
export const markTaskAsCompleted = mutation({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    // Verify the task exists
    const existingTask = await ctx.db.get(args.taskId);
    if (!existingTask) {
      throw new Error("Task not found");
    }

    // Get the current user's identity
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    // Toggle the completed status
    const newStatus = !existingTask.completed;
    
    // Update the task
    await ctx.db.patch(args.taskId, { 
      completed: newStatus 
    });
    
    return { 
      success: true,
      completed: newStatus
    };
  },
});

export const getCompletedTasks = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("tasks")
      .withIndex("byUserId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("completed"), true))
      .order("desc")
      .collect();
  },
});