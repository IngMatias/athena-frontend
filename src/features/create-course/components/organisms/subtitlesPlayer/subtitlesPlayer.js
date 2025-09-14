import React, { useEffect, useRef, useState } from "react";
import YouTubePlayer from "../youtubePlayer/youtubePlayer";
import CaptionsList from "../captionsList/captionsList";
import styles from "./subtitlesPlayer.module.css";

export default function SubtitlesPlayer({ video, captions = [], checkIntervalMs = 250 }) {
  const playerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = playerRef.current?.getCurrentTime() ?? 0;
      setCurrentTime(t);
    }, checkIntervalMs);
    return () => clearInterval(interval);
  }, [checkIntervalMs]);

  useEffect(() => {
    let idx = -1;
    for (let i = 0; i < captions.length; i++) {
      const start = captions[i].start;
      const end = start + (captions[i].duration || 0);
      if (currentTime >= start && currentTime < end) { idx = i; break; }
    }
    if (currentTime> 0 && idx == -1) idx = captions.length -1

    setActiveIndex(idx);
  }, [currentTime, captions]);

  const handleClickCaption = (start) => {
    playerRef.current?.seekTo(start, true);
  };

  return (
    <div className={styles.subtitlesPlayer}>
      <div className={styles.stickyVideo}>
        <div className={styles.videoTitle}>{video.title}</div>
        <YouTubePlayer ref={playerRef} videoId={video.id} />
      </div>
      <CaptionsList captions={captions} activeIndex={activeIndex} onClickCaption={handleClickCaption} height={500} />
    </div>
  );
}
