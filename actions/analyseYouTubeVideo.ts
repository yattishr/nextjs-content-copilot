'use server'

import { getVideoIdFromUrl } from "@/lib/youtube/getVideoIdFromUrl"
import { redirect } from "next/navigation"

export async function analyseYouTubeVideo(formData: FormData) { 
    const url1 = formData.get('url1')?.toString()
    const url2 = formData.get('url2')?.toString()
    if (!url1) return

    const videoId1 = getVideoIdFromUrl(url1)
    const videoId2 = url2 ? getVideoIdFromUrl(url2) : null
    console.log(`Fetched Video IDs: ${videoId1}, ${videoId2}`)

    if (!videoId1) return

    if (videoId2) {
        // Redirect to the video comparison page
        redirect(`/video/comparison?videoId1=${videoId1}&videoId2=${videoId2}`)
    } else {
        // Redirect to the video analysis page
        redirect(`/video/${videoId1}/analysis`)
    }
}