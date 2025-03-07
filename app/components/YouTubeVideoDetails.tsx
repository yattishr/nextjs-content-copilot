"use client";

import { getVideoDetails } from "@/actions/getVideoDetails";
import { VideoDetails } from "@/types/types";
import React, { useEffect, useState } from "react";

function YouTubeVideoDetails({ videoId }: { videoId: string }) {
  const [video, setVideo] = useState<VideoDetails | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const video = await getVideoDetails(videoId);
      setVideo(video);
    };

    fetchVideoDetails()
  }, [videoId]);

  if (!video) return <div>Video not found</div>

  return (
    <div>
        YouTubeVideoDetails: {videoId}
        <div className="flex flex-col @md:flex-row gap-8">

        </div>
    
    </div>

  )
}

export default YouTubeVideoDetails;
