import { v } from 'convex/values';
import { internalMutation, mutation, query, QueryCtx } from './_generated/server';
import { Id } from './_generated/dataModel';

export const getUserByClerkId = query({
    args: {
      clerkId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const user = await ctx.db
        .query('users')
        .filter((q) => q.eq(q.field('clerkId'), args.clerkId))
        .unique();
  
      if (!user?.imageUrl || user.imageUrl.startsWith('http')) {
        return user;
      }
  
      const url = await ctx.storage.getUrl(user.imageUrl as Id<'_storage'>);
  
      return {
        ...user,
        imageUrl: url,
      };
    },
  });

  export const getUserById = query({
    args: {
      userId: v.id('users'),
    },
    handler: async (ctx, args) => {
      const user = await ctx.db.get(args.userId);
      if (!user?.imageUrl || user.imageUrl.startsWith('http')) {
        return user;
      }
  
      const url = await ctx.storage.getUrl(user.imageUrl as Id<'_storage'>);
  
      return {
        ...user,
        imageUrl: url,
      };
    },
  });

  export const createUser = internalMutation({
    args: {
      clerkId: v.string(),
      email: v.string(),
      first_name: v.optional(v.string()),
      last_name: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
      username: v.union(v.string(), v.null()),
    },
    handler: async (ctx, args) => {
      const userId = await ctx.db.insert('users', {
        ...args,
        username: args.username || `${args.first_name}${args.last_name}`,
      });
      return userId;
    },
  });

  export const updateUserProfile = mutation({
    args: {
      userId: v.id("users"),
      first_name: v.optional(v.string()),
      last_name: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
      username: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const { userId, ...updates } = args;
      await ctx.db.patch(userId, updates);
      return { success: true };
    },
  });

  export const getUserProfile = query({
    args: {
      userId: v.id("users"),
    },
    handler: async (ctx, args) => {
      const user = await ctx.db.get(args.userId);
      if (!user) throw new Error("User not found");
      return user;
    },
  });

  export const deleteFromClerk = internalMutation({
    args: { clerkUserId: v.string() },
    async handler(ctx, { clerkUserId }) {
      const user = await userByExternalId(ctx, clerkUserId);
      if (!user) {
        throw new Error(`User not found for Clerk ID: ${clerkUserId}`);
      }
      await ctx.db.delete(user._id);
      return { success: true };
    },
  });

  export const getCurrentUser = query({
    args: {},
    async handler(ctx) {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Not authenticated");
      }
      const user = await userByExternalId(ctx, identity.subject);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },
  });
  
  async function userByExternalId(ctx: QueryCtx, externalId: string) {
    return await ctx.db
      .query('users')
      .withIndex('byClerkId', (q) => q.eq('clerkId', externalId))
      .unique();
  }