"use client";
import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";

import React from "react";

function AiAgentChat({ videoId }: { videoId: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
    body: {
      videoId,
    },
  });

  return (
    <div className="flex flex-col h-full">
      <div className="hidden lg:block px-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">AI Agent</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space--y-6">
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
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} space-x-4`}>
              {/* Check whether system message or user message */}
              <div
                className={`max-w-[85%] ${message.role === "user" ? "bg-blue-500" : "bg-gray-200"} rounded-2xl px-4 py-3`}
              >
                {message.parts && message.role === "assistant" ? (
                    // Assistant message
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                ) : (
                    // User message
                  <div className="prose prose-sm max-w-none text-white">
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
              placeholder="Enter your question..."
              value={input}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white text-sm rounded-full hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AiAgentChat;
