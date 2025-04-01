'use client'
import Form from "next/form"
import AnalyseButton from "./AnalyseButton"
import { analyseYouTubeVideo } from "@/actions/analyseYouTubeVideo"

function YouTubeVideoForm() {
  return (
    <div className="w-full max-w-2xl mx-auto">
        <Form className="flex flex-col gap-4" action={analyseYouTubeVideo}>
            <div className="flex flex-col sm:flex-row gap-2 items-center">
                <input type="text" name="url1" className="flex-1 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" placeholder="Paste the first Video URL..."/>
                <input type="text" name="url2" className="flex-1 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200" placeholder="Paste the second Video URL..."/>
                <AnalyseButton />
            </div>
        </Form>
    </div>
  )
}

export default YouTubeVideoForm