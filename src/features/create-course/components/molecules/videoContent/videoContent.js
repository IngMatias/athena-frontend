import React, { useEffect, useRef, useState } from "react";

import { ContentType } from "@/features/create-course/enum/ContentType";

import styles from "./videoContent.module.css";
import { getVideoId, isValidUrl } from "@/utils/video";
import YouTubePlayer from "../../organisms/youtubePlayer/youtubePlayer";
import UrlInput from "../../atoms/urlInput/urlInput";

export default function VideoContent({ id, text, onChange }) {

  const [videoId, setVideoId] = useState(null);
  const playerRef = useRef(null);

  const handleSearch = (videoUrl) => {
    onChange({
      content: {
        id,
        type: ContentType.VIDEO,
        text: videoUrl,
      },
    });
  };

  useEffect(() => {
    if (isValidUrl(text))
      setVideoId(getVideoId(text))
    else {
      setVideoId(null)
    }

  },
    [text])

  return (
    <div className={styles.videoContent}>
      <UrlInput 
        value={text} onSearch={handleSearch}></UrlInput>
      {videoId &&
        <YouTubePlayer ref={playerRef} videoId={videoId} />
      }
    </div>

  );
}
