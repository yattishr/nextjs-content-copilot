"use client";
import { FeatureFlag } from "@/features/flags";
import { TranscriptEntry } from "@/types/types";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import React, { useCallback, useEffect, useState } from "react";
import Usage from "./Usage";
import { getYouTubeTranscript } from "@/actions/getYouTubeTranscript";

function Transcription({ videoId }: { videoId: string }) {
  const [transcript, setTranscript] = useState<{
    transcript: TranscriptEntry[];
    cache: string;
  } | null>(null);

  const { featureUsageExceeded } = useSchematicEntitlement(
    FeatureFlag.TRANSCRIPTION
  );

  // when the component first mounts, it will automatically begin the transcription.
  const handleGenerateTranscription = useCallback(
    async (videoId: string) => {
      if (featureUsageExceeded) {
        console.log("Transcription limit reached, the user must upgrade.")
        return
      } 

      const result = await getYouTubeTranscript(videoId)
      setTranscript(result)

    }, [featureUsageExceeded]) 

    useEffect(() => {
      handleGenerateTranscription(videoId)    
    }, [handleGenerateTranscription, videoId])
    

  return (
    <div className="border p-4 pb-0 rounded-xl gap-4 flex flex-col">
      <div className="min-w-52">
        <Usage featureFlag={FeatureFlag.TRANSCRIPTION} title="Transcription" />

        {/* Transcription */}
        {!featureUsageExceeded ? (
            <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto rounded-md p-4">
                {transcript ? (
                    transcript.transcript.map((entry, index) => (
                        <div key={index} className="flex gap-2">
                            <span className="text-sm text-gray-400 min-4-[50px]">
                                {entry.timestamp}
                            </span>
                            <p className="text-sm text-gray-700">{entry.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No transcription available</p>
                )}
            </div>
        ) : null}
      </div>
    </div>
  );
}

export default Transcription;
