import { formatTimestamp } from "@/lib/helper";
import { currentUser } from "@clerk/nextjs/server";
import { Innertube} from "youtubei.js"

export interface TranscriptEntry {
    text: string;
    timestamp: string;
}

const youtube = await Innertube.create({
    lang: "en",
    location: "US",
    retrieve_player: false,
})

async function fetchTranscript (videoId: string): Promise<TranscriptEntry[]> {
    try {
        const info = await youtube.getInfo(videoId)
        const transcriptData = await info.getTranscript()
        const transcript: TranscriptEntry[] =
          transcriptData.transcript.content?.body?.initial_segments.map(
            (segment) => ({
              text: segment.snippet.text ?? "No transcript available",
              timestamp: formatTimestamp(Number(segment.start_ms)),
            })
          ) ?? [];

        return transcript
    } catch (error) {
        console.error("Error fetching transcript: ", error)
        throw error
    }
}

export async function getYouTubeTranscript(videoId: string) {
    const user = await currentUser();

    if (!user?.id) {
        throw new Error("User not found");
    }

    const transcript = await fetchTranscript(videoId)
    console.log(`Transcript fetched with ${transcript.length} segments`)
    return {
        transcript, 
        cache: 'This was not cached'
    }

}