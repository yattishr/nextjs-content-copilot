import { doImageGeneration } from "@/actions/doImageGeneration";
import { FeatureFlag } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { tool } from "ai"
import { z } from "zod"

export const generateImage = ( videoId: string, userId: string ) => tool ({
    description: "Generate an image from a video",
    parameters: z.object({
        prompt: z.string().describe("The prompt to generate an image for"),
        videoId: z.string().describe("The YouTube video ID"),
    }),

    
    execute: async ({ prompt }) => {
        const schematicCtx = {
            company: { id: userId},
            user: {
                id: userId
            },
        }

        // server-side check to see if isImageGenerationEnabled is enabled on the server.
        const isImageGenerationEnabled = await client.checkFlag(
            schematicCtx,
            FeatureFlag.IMAGE_GENERATION
        );

        if (!isImageGenerationEnabled) {
            return {
                error: "Image generation is not enabled, the user must upgrade"
            };
        }

        const image = await doImageGeneration(prompt, videoId)
        return { image }
    }
})