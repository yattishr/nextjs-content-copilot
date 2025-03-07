"use server";

import { google } from "googleapis";
import { VideoDetails } from "@/types/types";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

export async function getVideoDetails(videoId: string) {
  console.log(`--- Fetching video details for: ${videoId} ---`);

  try {
    const videoResponse = await youtube.videos.list({
      part: ["statistics", "snippet"],
      id: [videoId],
    });

    const videoDetails = videoResponse.data.items?.[0];
    if (!videoDetails) throw new Error("Video not found");

    // get YouTube channel details
    const channelResponse = await youtube.channels.list({
      part: ["snippet", "statistics"],
      id: [videoDetails.snippet?.channelId || ""],
      key: process.env.YOUTUBE_API_KEY,
    });

    const channelDetails = channelResponse.data.items?.[0];
    console.log("--- Fetched video details successfully ---");

    const video: VideoDetails = {
      // Video Info
      title: videoDetails.snippet?.title || "Unknown Title",
      thumbnail:
        videoDetails.snippet?.thumbnails?.maxres?.url ||
        videoDetails.snippet?.thumbnails?.high?.url ||
        videoDetails.snippet?.thumbnails?.default?.url ||
        "",
      publishedAt:
        videoDetails.snippet?.publishedAt || new Date().toISOString(),

      // Video metrics
      views: videoDetails.statistics?.viewCount || "0",
      likes: videoDetails.statistics?.likeCount || "Not available",
      comments: videoDetails.statistics?.commentCount || "Not available",

      // Channel metrics
      channel: {
        title: videoDetails.snippet?.channelTitle || "Unknown Channel",
        thumbnail: channelDetails?.snippet?.thumbnails?.default?.url || "",
        subscribers: channelDetails?.statistics?.subscriberCount || "0",
      },
    };

    return video;
  } catch (error) {
    console.log("❌ Error fetching video details: ", error);
    return null;
  }
}
