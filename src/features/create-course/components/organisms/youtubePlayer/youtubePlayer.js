import React, { forwardRef, useImperativeHandle, useRef } from "react";
import YouTube from "react-youtube";
import styles from "./youtubePlayer.module.css";

const YouTubePlayer = forwardRef(({ videoId, time = 0 }, ref) => {
  const playerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getCurrentTime: () => playerRef.current?.getCurrentTime() ?? 0,
    seekTo: (seconds, allowSeekAhead = true) =>
      playerRef.current?.seekTo(seconds, allowSeekAhead),
  }));

  return (
    <div className={styles.videoWrapper}>
      <YouTube
        videoId={videoId}
        onReady={(e) => (playerRef.current = e.target)}
        opts={{
          playerVars: { modestbranding: 1, controls: 1, start: time },
        }}
      />
    </div>
  );
});

YouTubePlayer.displayName = "YouTubePlayer";

export default YouTubePlayer;
