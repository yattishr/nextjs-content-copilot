import { getYouTubeTranscript } from "@/actions/getYouTubeTranscript";
import { getVideoDetails } from "@/actions/getVideoDetails"
import { tool } from "ai"
import { z } from "zod"

export const fetchTranscript = tool ({ 
    description: "Fetch the transcript of a YouTube video in segments",
    parameters: z.object({
        videoId: z
            .string()
            .describe("The video ID to fetch the transcript for.")
    }),
    execute: async ({ videoId }) => {
        const transcript = await getYouTubeTranscript(videoId);
        return {
            transcript: transcript?.transcript,
            cache: transcript?.cache
        }
    }
})