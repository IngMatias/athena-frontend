import { useState } from "react";
import styles from "./youtubeStudioTab.module.css";
import { useVideo } from "@/features/create-course/hooks/useVideo";
import SubtitlesPlayer from "../subtitlesPlayer/subtitlesPlayer";

export default function YoutubeStudioTab({
}) {
  const { video, captions, searchVideo } = useVideo();
  const [videoUrl, setVideoUrl] = useState("");

  const handleSearch = (videoUrl) => {
    searchVideo(videoUrl)
  };

  return (
    <div className={styles.youtubeStudioTab}>
      <div className={styles.inputUrl} >
        <input
          aria-label="URL del video"
          placeholder="https://www.youtube.com/watch?v=..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(e.target.value);
          }}
        />
        <button onClick={() => handleSearch(videoUrl)}>
          Buscar
        </button>
      </div>
      {
        video?.id &&
        <div key={video.id}>
          <SubtitlesPlayer video={video} captions={captions}></SubtitlesPlayer>
        </div>
      }

    </div>
  );
}
