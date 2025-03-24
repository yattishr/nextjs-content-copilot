import { getVideoDetails } from "@/actions/getVideoDetails"
import { tool } from "ai"
import { z } from "zod"

export const generateImage = ( videoId: string ) => tool ({
    description: "Generate an image from a video",
    parameters: z.object({
        videoId: z.string()
    }),

    execute: async ({ videoId }) => {
        const videoDetails = await getVideoDetails(videoId)
    }
})