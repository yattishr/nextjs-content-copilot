"use client";

import AiAgentChat from "@/app/components/AiAgentChat";
import ThumbnailGeneration from "@/app/components/ThumbnailGeneration";
import TitleGeneration from "@/app/components/TitleGeneration";
import Transcription from "@/app/components/Transcription";
import Usage from "@/app/components/Usage";
import YouTubeVideoDetails from "@/app/components/YouTubeVideoDetails";
import { Doc } from "@/convex/_generated/dataModel";
import { FeatureFlag } from "@/features/flags";
import { createOrGetVideo } from "@/lib/createOrGetVideo";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { toNamespacedPath } from "path";
import React, { useEffect, useState } from "react";

function AnalysisPage() {
  const { user } = useUser();
  const params = useParams<{ videoId: string }>();
  const { videoId } = params;
  const [video, setVideo] = useState<Doc<"videos"> | null | undefined>(
    undefined
  );


  useEffect(() => {
    if (!user?.id) return;

    const fetchVideo = async() => {
      // Analyse the video and add the video to the Db
      const response = await createOrGetVideo(videoId as string, user.id);
      if (!response.success) {
        toast.error("Error creating or retrieving the video", {
          description: response.error,
          duration: 10000
        })
      } else {
        setVideo(response.data!)
      }
    }
  
    fetchVideo()

  }, [videoId, user])
  


  return (
    <div className="xl:container mx-auto px-4 md:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side */}
        <div className="order-2 lg:order-1 flex flex-col gap-4 bg-white lg:border-r border-gray-200 p-6">
          {/* Analysis Section */}
          <div className="flex flex-col gap-4 p-4 border border-gray-200">
            <Usage
              featureFlag={FeatureFlag.ANALYSE_VIDEO}
              title="Analyse Video"
            />

            {/* Video Transcription status */}
          </div>

          {/* YouTube video details */}
          <YouTubeVideoDetails videoId={videoId}/>


          {/* Thumbnail generation */}
          <ThumbnailGeneration videoId={videoId}/>


          {/* Title generation */}
          <TitleGeneration videoId={videoId}/>


          {/* Transcription */}
          <Transcription videoId={videoId}/>


        </div>

        {/* Right Side */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-20 h-[500px] md:h-[calc(100vh-6rem)]">
          <AiAgentChat videoId={videoId}/>          
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
