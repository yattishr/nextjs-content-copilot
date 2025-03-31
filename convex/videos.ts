import { mutation, query } from "./_generated/server";
import { v } from "convex/values"

// Get all videos for a user
export const get = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (identity === null) {
            throw new Error("Unauthorised user.")
        }
        return await ctx.db
            .query("videos")
            .withIndex("by_user_id", (q) => q.eq("userId", identity.subject))
            .collect()
    }
});

export const getVideoById = query({
    args: {videoId: v.string(), userId: v.string()},
    handler: async (ctx, args) => {
        return await ctx.db
        .query("videos")
        .withIndex("by_user_and_video", 
            (q) => q.eq("userId", args.userId).eq("videoId", args.videoId)
        ).unique()
    }
});

export const createVideoEntry = mutation({
    args: {
        videoId: v.string(),
        userId: v.string(),
    },
    handler: async (ctx, args) => {
        const videoId = await ctx.db.insert("videos", {
            videoId: args.videoId,
            userId: args.userId,
        })
        return videoId
    }
})