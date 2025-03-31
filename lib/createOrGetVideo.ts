"use server"

import { Doc } from "@/convex/_generated/dataModel";
import { currentUser } from "@clerk/nextjs/server";
import { getConvexClient } from "./convex";
import { checkFeatureUsageLimit } from "./checkFeatureUsageLimit";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { api } from "@/convex/_generated/api";
import { client } from "./schematic";

export interface VideoResponse {
    success: boolean;
    data?: Doc<"videos">;
    error?: string;    
}

export const createOrGetVideo = async (
    videoId: string,
    userId: string,
) : Promise<VideoResponse> => {
    const convex = getConvexClient();
    const user = await currentUser();
    

    if(!user) {
        return {
            success: false,
            error: "User not found"
        }
    }

    const featureCheck = await checkFeatureUsageLimit(
        user.id,
        featureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event
    )

    if (!featureCheck.success) {
        return {
            success: false,
            error: featureCheck.error
        }
    }

    try {
        const video = await convex.query(api.videos.getVideoById, {
            videoId,
            userId,
        })

        if (!video) {
            // analyse event
            console.log(`--- Analyse event for video ${videoId} - Tokens will be used ---`)
            const newVideoId = await convex.mutation(api.videos.createVideoEntry, {
                videoId, userId
            });

            const newVideo = await convex.query(api.videos.getVideoById, {
                videoId: newVideoId, userId,
            });

            console.log("--- Tracking analyse video event ---")
            await client.track({
                event: featureFlagEvents[FeatureFlag.ANALYSE_VIDEO].event,
                company: {
                    id: userId
                },
                user: {
                    id: userId
                }
            });

            return {
                success: true,
                data: newVideo!
            }
        } else {
            console.log("--- Video already exists. No token required to be used ---");
            return {
                success: true,
                data: video,
            }
        }

    } catch (error) {
        console.error(`Error creating or retrieving video: ${videoId}. `, error)
        return {
            success: false,
            error: "An unexpected error occured. please try again later."
        }
    }

}