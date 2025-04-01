import Link from "next/link"
import { Play, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import YouTubeVideoForm from "./components/YouTubeVideoForm"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-fuchsia-600">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Transform your video content with AI-powered analysis</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10">
            Design engaging content in just a few clicks with our powerful AI-powered tool.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <YouTubeVideoForm />
            
            <Button
              variant="outline"
              className="bg-transparent text-white border-white px-8 py-6 text-lg rounded-full hover:bg-white/10 transition-colors"
            >
              Watch Demo
            </Button> 
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-fuchsia-600 rounded-xl overflow-hidden">
              <div className="flex">
                <div className="w-20 bg-white p-3 flex flex-col gap-4">
                  <div className="w-full h-10 bg-blue-500 rounded-md flex items-center justify-center text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <div className="w-full h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-md"></div>
                  <div className="w-full h-10 bg-blue-600 rounded-md"></div>
                  <div className="w-full h-10 bg-amber-400 rounded-md"></div>
                </div>
                <div className="flex-1 p-6">
                  <div className="bg-gradient-to-r from-blue-500 to-fuchsia-500 p-6 rounded-xl">
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg inline-block mb-2">
                      <h3 className="text-white text-2xl font-bold">CREATOR COPILOT</h3>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="space-y-2">
                        <div className="h-2 w-24 bg-black/20 rounded-full">1</div>
                        <div className="h-2 w-32 bg-white/20 rounded-full">2</div>
                      </div>
                      <div className="h-16 w-16 bg-white/20 rounded-full">3</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}