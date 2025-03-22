'use client'
import { getVideoDetails } from "@/actions/getVideoDetails"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { VideoDetails } from "@/types/types"

function VideoComparison() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const videoId1 = searchParams.get('videoId1')
  const videoId2 = searchParams.get('videoId2')

  const [videoDetails1, setVideoDetails1] = useState<VideoDetails | null>(null)
  const [videoDetails2, setVideoDetails2] = useState<VideoDetails | null>(null)

  useEffect(() => {
    async function fetchVideoDetails() {
      if (videoId1) {
        const details1 = await getVideoDetails(videoId1)
        setVideoDetails1(details1)
      }
      if (videoId2) {
        const details2 = await getVideoDetails(videoId2)
        setVideoDetails2(details2)
      }
    }
    fetchVideoDetails()
  }, [videoId1, videoId2])

  const handleVideoClick = (videoId: string) => {
    router.push(`/video/${videoId}/analysis`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Video Comparison</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer" onClick={() => handleVideoClick(videoId1!)}>
          {videoDetails1 ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">{videoDetails1.title}</h2>
              <img src={videoDetails1.thumbnail} alt={videoDetails1.title} className="w-full h-auto mb-4" />
              <p><strong>Views:</strong> {videoDetails1.views}</p>
              <p><strong>Likes:</strong> {videoDetails1.likes}</p>
              <p><strong>Comments:</strong> {videoDetails1.comments}</p>
              <p><strong>Published At:</strong> {new Date(videoDetails1.publishedAt).toLocaleDateString()}</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Channel Details</h3>
                <p><strong>Title:</strong> {videoDetails1.channel.title}</p>
                <img src={videoDetails1.channel.thumbnail} alt={videoDetails1.channel.title} className="w-16 h-16 rounded-full mt-2" />
                <p><strong>Subscribers:</strong> {videoDetails1.channel.subscribers}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer" onClick={() => handleVideoClick(videoId2!)}>
          {videoDetails2 ? (
            <div>
              <h2 className="text-xl font-semibold mb-2">{videoDetails2.title}</h2>
              <img src={videoDetails2.thumbnail} alt={videoDetails2.title} className="w-full h-auto mb-4" />
              <p><strong>Views:</strong> {videoDetails2.views}</p>
              <p><strong>Likes:</strong> {videoDetails2.likes}</p>
              <p><strong>Comments:</strong> {videoDetails2.comments}</p>
              <p><strong>Published At:</strong> {new Date(videoDetails2.publishedAt).toLocaleDateString()}</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Channel Details</h3>
                <p><strong>Title:</strong> {videoDetails2.channel.title}</p>
                <img src={videoDetails2.channel.thumbnail} alt={videoDetails2.channel.title} className="w-16 h-16 rounded-full mt-2" />
                <p><strong>Subscribers:</strong> {videoDetails2.channel.subscribers}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoComparison