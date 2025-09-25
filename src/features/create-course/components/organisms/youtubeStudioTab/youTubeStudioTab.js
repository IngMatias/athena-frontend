import { useState } from "react";
import styles from "./youtubeStudioTab.module.css";
import { useVideo } from "@/features/create-course/hooks/useVideo";
import SubtitlesPlayer from "../subtitlesPlayer/subtitlesPlayer";
import UrlInput from "../../atoms/urlInput/urlInput";

export default function YoutubeStudioTab({
}) {
  const { video, captions, searchVideo } = useVideo();
  const [videoUrl, setVideoUrl] = useState("");

  const handleSearch = (videoUrl) => {
    searchVideo(videoUrl)
  };

  return (
    <div className={styles.youtubeStudioTab}>
      <UrlInput onSearch={handleSearch}></UrlInput>
      {
        video?.id &&
        <div key={video.id}>
          <SubtitlesPlayer video={video} captions={captions}></SubtitlesPlayer>
        </div>
      }

    </div>
  );
}
