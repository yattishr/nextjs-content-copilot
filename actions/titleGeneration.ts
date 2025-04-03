"use server"

import { api } from "@/convex/_generated/api"
import { FeatureFlag, featureFlagEvents } from "@/features/flags"
import { getConvexClient } from "@/lib/convex"
import { client } from "@/lib/schematic"
import { currentUser } from "@clerk/nextjs/server"
import OpenAI from "openai"

const convexClient = getConvexClient()

export async function titleGeneration(
    videoId: string,
    videoSummary: string,
    considerations: string,
) {
    const user = await currentUser()

    if (!user?.id) {
        throw new Error("User not found")
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        console.log("Video summary:", videoSummary);
        console.log(`--- Generating title for video: ${videoId} ---`)
        console.log(`--- Considerations: ${considerations} ---`)

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful YouTube video creator assistant that creates high quality SEO friendly concise video titles."
                },
                {
                    role: "user",
                    content: `Provide ONE concise YouTube title (and nothing else) for this video.
                    Focus on the main points and key takeaways. 
                    It should be SEO friendly and 100 characters or less: \n\n${videoSummary}\n\n${considerations}`
                },
            ],
            temperature: 0.7,
            max_tokens: 500,
        })

        const title = response.choices[0]?.message?.content || "Unable to generate title"

        if (!title) {
            return {
                error: "System error. Failed to generate title"
            }
        }

        await convexClient.mutation(api.titles.generate, {
            videoId,
            userId: user.id,
            title: title
        });

        await client.track({
            event: featureFlagEvents[FeatureFlag.TITLE_GENERATIONS].event,
            company: {
                id: user.id,
            },
            user: {
                id: user.id
            }
        });

        console.log("Title generated: ", title)

    } catch (error) {
        console.error("Error generating titles: ", error)
        throw new Error("Failed to generate titles")
    }
}

// NB: Use this as a template for video comparison functionality.