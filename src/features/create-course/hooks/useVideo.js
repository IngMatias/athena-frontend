import { useEffect, useState } from 'react'
import { getInfo, getTranscription } from '@/services/video.service'
import { getVideoId, getVideoUrl, isValidUrl } from '@/utils/video'

export const useVideo = () => {
  const [video, setVideo] = useState(null)
  const [captions, setCaptions] = useState([]);

  useEffect(() => {
    loadCaptions()
  }, [video])

  const searchVideo = async (inputURL) => {
    try {
      if (video?.url === inputURL) return

      const valid = isValidUrl(inputURL)

      if (!valid) return

      const url = getVideoUrl(inputURL)

      const { title, description } = await getInfo({ url })

      setVideo({
        id: getVideoId(url),
        url,
        title,
        description
      })
    } catch (e) {
      console.error(e)
    }
  }

  const loadCaptions = async () => {
    try {
      if (video?.url) {
        await getTranscription({
          url: video.url,
          onChunk: setCaptions
        })
      }
    } catch (err) {
      console.error(e)
    }
  }

  return { video, captions, searchVideo }
}
