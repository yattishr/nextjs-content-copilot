"use server"
import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { formatTimestamp } from "@/lib/helper";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { Innertube } from "youtubei.js";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export interface TranscriptEntry {
  text: string;
  timestamp: string;
}

const youtube = await Innertube.create({
  lang: "en",
  location: "US",
  retrieve_player: false,
});

async function fetchTranscript(videoId: string): Promise<TranscriptEntry[]> {
  try {
    const info = await youtube.getInfo(videoId);
    const transcriptData = await info.getTranscript();
    const transcript: TranscriptEntry[] =
      transcriptData.transcript.content?.body?.initial_segments.map(
        (segment) => ({
          text: segment.snippet.text ?? "No transcript available",
          timestamp: formatTimestamp(Number(segment.start_ms)),
        })
      ) ?? [];

    return transcript;
  } catch (error) {
    console.error("Error fetching transcript: ", error);
    throw error;
  }
}

export async function getYouTubeTranscript(videoId: string) {
  const user = await currentUser();

  if (!user?.id) {
    console.log("Error: User not found.");
    throw new Error("User not found");
  }

  // Check if the transcript exists in the database
  const existingTranscript = await convex.query(
    api.transcript.getTranscriptByVideoId,
    { videoId, userId: user.id }
  );

  if (existingTranscript) {
    console.log("🔍 Transcript found in database");
    return {
      cache:
        "This video has already been transcribed - Accessing cached transcript instead of using a token",
      transcript: existingTranscript.transcript,
    };
  }

  try {
    const transcript = await fetchTranscript(videoId);

    // Store the transcript in the Db
    await convex.mutation(api.transcript.storeTranscript, {
      videoId,
      userId: user.id,
      transcript,
    });

    await client.track({
      event: featureFlagEvents[FeatureFlag.TRANSCRIPTION].event,
      company: {
        id: user.id
      },
      user: {
        id: user.id,
      }
    })

    return {
        transcript,
        cache: "This video was transcribed using a token, the transcript is now stored in the database"
    }
  } catch (error) {
    console.error("❎ Error fetching transcript: ", error);
    return {
      transcript: [],
      cache: "Error fetching the transcript, please try again.",
    };
  }
}
