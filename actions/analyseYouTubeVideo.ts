'use server'

import { getVideoIdFromUrl } from "@/lib/youtube/getVideoIdFromUrl"
// import { getVideoIdFromUrl } from "@lib/youtube/getVideoIdFromUrl";
import { redirect } from "next/navigation"

export async function analyseYouTubeVideo(formData: FormData) { 
    const url = formData.get('url')?.toString()
    if (!url) return

    // const videoId = getVideoIdFromUrl(url)
    const videoId = getVideoIdFromUrl(url)
    console.log(`Fetched Video ID: ${videoId}`)

    if (!videoId) return

    // Redirect to the video analysis page
    redirect(`/video/${videoId}/analysis`)
}