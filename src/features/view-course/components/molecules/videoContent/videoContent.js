import React, { useEffect, useRef, useState } from "react";

import styles from "./videoContent.module.css";
import YouTubePlayer from "@/features/create-course/components/organisms/youtubePlayer/youtubePlayer";
import { getVideoId, isValidUrl } from "@/utils/video";

export default function VideoContent({ text, time, onChangeTime }) {
  const [videoId, setVideoId] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (isValidUrl(text))
      setVideoId(getVideoId(text))
    else
      setVideoId(null)
  })

  return (
    <div style={{ width: "100%" }} className={styles.videoContent}>
      {videoId &&
        <YouTubePlayer ref={playerRef} videoId={videoId} time={time} />
      }
    </div>
  );
}
