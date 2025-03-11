"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";
import Usage from "./Usage";
import { FeatureFlag } from "@/features/flags";
import { useSchematicEntitlement } from "@schematichq/schematic-react";
import { Copy } from "lucide-react";

function TitleGeneration({ videoId }: { videoId: string }) {
  const { user } = useUser();
  const titles = [];

  const { value: isTitleGenerationEnabled } = useSchematicEntitlement (
    FeatureFlag.TITLE_GENERATIONS
  )

  const copyToClipBoard = (text: string) => {
    navigator.clipboard.writeText(text);
    // toast.success("Copied to clipboard");
  }

  return (
    <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
        <div className="min-w-52">
            <Usage 
            featureFlag={FeatureFlag.TITLE_GENERATIONS}
            title="Titles"
            />
        </div>

        {/* Titles have been generated */}
        <div className="space-y-3 mt-4 max-h-[200px] overflow-y-auto">
            {titles?.map((title) => (
                <div key={title._id} className="group relative p-4 rounded-lg border border-gray-100 bg-gray-50 hover:border-purple-100 hover:bg-purple-50 transition-all duration-200">
                    <div className="flex items-start justify-between gap-4">
                        <p className="text-sm text-gray-900 leading-relaxed">Title: {title.title}</p>

                        <button
                            onClick={() => copyToClipBoard(title.title)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 hover:bg-purple-100 rounded-md" title="Copy to Clipboard"
                        >
                            <Copy className="w-4 h-4 text-blue-600"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* No titles generated yet */}
        {!titles?.length && !!isTitleGenerationEnabled && (
            <div className="text-center py-8 px-4 rounded-lg mt-4 border-2 border-dashed border-gray-200">
                <p className="text-gray-500">No titles have been generated yet.</p>
                <p className="text-sm text-gray-400 mt-1">Generate titles to see them appear here.</p>
            </div>
        )}
    </div>

  )
}

export default TitleGeneration;
