"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import Image from "next/image";
import { useQuery} from "convex/react"
import { api } from "@/convex/_generated/api";

function ThumbnailGeneration({ videoId }: { videoId: string }) {
  const { user } = useUser();
  const images = useQuery(api.images.getImages, {
    videoId,
    userId: user?.id ?? ""
  });

  return (
    <div className="rounded-xl flex flex-col p-4 border">
        <div className="min-w-52">
            <Usage 
                featureFlag={FeatureFlag.IMAGE_GENERATION}
                title="Thumbnail Generation"
            />
        </div>

        {/* Horizontal scrolling for images */}
        <div className={`flex overflow-x-auto gap-4 ${images?.length && "mt-4"}`}>
            {images?.map(
                (image) => (
                image.url && (
                    <div key={image._id} className="w-40 h-24 relative">
                        <Image 
                            loading="lazy"
                            src={image.url} 
                            alt="Generated image" 
                            width={200}
                            height={200}
                            className="object-cover" 
                        />
                    </div>
                )
            ))}
        </div>

        {/* No images show a message. */}
        {!images?.length && (
            <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-gray-200">
                <p className="text-gray-500">You have no thumbnails generated yet.</p>
                <p className="text-sm text-gray-400 mt-1">Generate thumbnails to see them appear here.</p>
            </div>
        )}
    </div>
  )
}

export default ThumbnailGeneration;
