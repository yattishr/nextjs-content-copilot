"use client";

import AiAgentChat from "@/app/components/AiAgentChat";
import ThumbnailGeneration from "@/app/components/ThumbnailGeneration";
import TitleGeneration from "@/app/components/TitleGeneration";
import Transcription from "@/app/components/Transcription";
import Usage from "@/app/components/Usage";
import YouTubeVideoDetails from "@/app/components/YouTubeVideoDetails";
import { FeatureFlag } from "@/features/flags";
import { useParams } from "next/navigation";
import React from "react";

function AnalysisPage() {
  const params = useParams<{ videoId: string }>();
  const { videoId } = params;


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
