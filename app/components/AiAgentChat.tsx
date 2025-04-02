"use client";
import { Button } from "@/components/ui/button";
import { FeatureFlag } from "@/features/flags";
import { Message, useChat } from "@ai-sdk/react";
import { useSchematicFlag } from "@schematichq/schematic-react";
import { Image, LetterText, PenIcon, SendIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  result?: Record<string, unknown>;
}

interface ToolPart {
  type: "tool-invocation";
  toolInvocation: ToolInvocation;
}

const formatToolInvocation = (part: ToolPart) => {
  if (!part.toolInvocation) return "Unknown Tool";
  return `🤖 Tool Used: ${part.toolInvocation.toolName}`;
};

function AiAgentChat({ videoId }: { videoId: string }) {
  const { messages, input, handleInputChange, handleSubmit, append, status } = useChat({
    maxSteps: 5,
    body: {
      videoId,
    },
  });

  const isScriptGenerationEnabled = useSchematicFlag(FeatureFlag.SCRIPT_GENERATION)
  console.log("Logging isScriptGenerationEnabled: ", isScriptGenerationEnabled)

  const isImageGenerationEnabled = useSchematicFlag(FeatureFlag.IMAGE_GENERATION)
  console.log("Logging isImageGenerationEnabled: ", isImageGenerationEnabled)

  const isTitleGenerationEnabled = useSchematicFlag(FeatureFlag.TITLE_GENERATIONS)
  console.log("Logging isTitleGenerationEnabled: ", isTitleGenerationEnabled)

  const isVideoAnalysisEnabled = useSchematicFlag(FeatureFlag.ANALYSE_VIDEO)
  console.log("Logging isVideoAnalysisEnabled: ", isVideoAnalysisEnabled)

  const generateScript = async () => {
    const randomId = Math.random().toString(36).substring(2, 15)

    const userMessage: Message = {
      id: `generate-script-${randomId}`,
      role: "user",
      content: `Generate a step-by-step shooting script for this video that I can use on       
      my own channel to produce a video that is similar to this one, don't do any other 
      steps such as generating a image, just generate the script only.`
    };
    append(userMessage);
  }

  const generateImage = async () => {
    const randomId = Math.random().toString(36).substring(2, 15)

    const userMessage: Message = {
      id: `generate-image-${randomId}`,
      role: "user",
      content: `Generate a thumbnail for this video.`
    };
    append(userMessage);
  }  

  const generateTitle = async () => {
    const randomId = Math.random().toString(36).substring(2, 15)

    const userMessage: Message = {
      id: `generate-title-${randomId}`,
      role: "user",
      content: `Generate a title for this video. Add the words "Video Title: " as the prefix to the title.`
    };
    append(userMessage);
  }    

  return (
    <div className="flex flex-col h-full">
      <div className="hidden lg:block px-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">AI Agent</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-gray-700">
                  Welcome to Content CoPilot Agent Chat
                </h3>
                <p className="text-sm text-gray-500">
                  Ask Content CoPilot any questions about your videos.
                </p>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} space-x-4`}
            >
              {/* Check whether system message or user message */}
              <div
                className={`max-w-[85%] ${message.role === "user" ? "bg-gray-50 border-2 border-purple-800" : "bg-gray-200"} rounded-2xl px-4 py-3`}
              >
                {message.parts && message.role === "assistant" ? (
                  // Assistant message
                  <div className="space-y-3">
                    {message.parts.map((part, i) =>
                      part.type === "text" ? (
                        <div key={i} className="prose prose-sm max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                      ) : part.type === "tool-invocation" ? (
                        <div
                          key={i}
                          className="bg-white/50 rounded-lg p-2 space-y-2 text-gray-800"
                        >
                          <div className="font-semibold bg-blue-200">
                            TOOL CALL
                          </div>
                          <div className="font-medium text-xs">
                            {formatToolInvocation(part as ToolPart)}
                          </div>
                          {(part as ToolPart).toolInvocation.result && (
                            <pre className="text-xs bg-white/75 p-2 rounded overflow-auto max-h-40">
                              {JSON.stringify(
                                (part as ToolPart).toolInvocation.result,
                                null,
                                2
                              )}
                            </pre>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                ) : (
                  // User message
                  <div className="prose prose-sm max-w-none text-black">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="space-y-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              type="text"
              placeholder={!isVideoAnalysisEnabled
                ? "Upgrade to ask anything about your video"
                : "Ask anything about your video..."
              }
              value={input}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              disabled={
                status === "streaming" ||
                status === "submitted" ||
                !isVideoAnalysisEnabled
              }
              className="px-4 py-2 bg-purple-500 
                      text-white text-sm 
                      rounded-full 
                      hover:bg-purple-600 
                      transition-colors 
                      disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "streaming"
              ? "AI is replying..."
              : status === "submitted"
                ? "AI is thinking..."
              : <SendIcon />
              }
            </Button>
          </form>

          <div className="flex gap-2">
            <button 
              className="text-xs xl:text-sm w-full flex items-center justify-center 
              gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 
              rounded-full transition-colors 
              disabled:opacity-50 
              disabled:cursor-not-allowed"
              onClick={generateScript}
              type="button"
              disabled={!isScriptGenerationEnabled}
            >
              <LetterText className="w-4 h-4" />
              {isScriptGenerationEnabled ? (
                <span>Generate Script</span>
              ) : (
                <span>Upgrade to generate a Script</span>
              )}
            </button>

            <button 
              className="text-xs xl:text-sm w-full flex items-center justify-center 
              gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 
              rounded-full transition-colors 
              disabled:opacity-50 
              disabled:cursor-not-allowed"
              onClick={generateTitle}
              type="button"
              disabled={!isTitleGenerationEnabled}
            >
              <PenIcon className="w-4 h-4" />
              {isTitleGenerationEnabled ? (
                <span>Generate Title</span>
              ) : (
                <span>Upgrade to generate Titles</span>
              )}
            </button>

            <button 
              className="text-xs xl:text-sm w-full flex items-center justify-center 
              gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 
              rounded-full transition-colors 
              disabled:opacity-50 
              disabled:cursor-not-allowed"
              onClick={generateImage}
              type="button"
              disabled={!isImageGenerationEnabled}
            >
              <Image className="w-4 h-4" />
              {isImageGenerationEnabled ? (
                <span>Generate Image</span>
              ) : (
                <span>Upgrade to generate Images</span>
              )}
            </button>            

          </div>

        </div>
      </div>
    </div>
  );
}

export default AiAgentChat;
