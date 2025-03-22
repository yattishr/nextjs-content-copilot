import { getVideoDetails } from "@/actions/getVideoDetails"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { VideoDetails } from "@/types/types"

function VideoComparison() {
  const searchParams = useSearchParams()
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

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        {videoDetails1 && (
          <div>
            <h2>Video 1 Details</h2>
            <pre>{JSON.stringify(videoDetails1, null, 2)}</pre>
          </div>
        )}
      </div>
      <div className="flex-1">
        {videoDetails2 && (
          <div>
            <h2>Video 2 Details</h2>
            <pre>{JSON.stringify(videoDetails2, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoComparison