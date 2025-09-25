import { useState } from "react";
import styles from "./urlInput.module.css";

export default function UrlInput({ value = "", onSearch
}) {
  const [videoUrl, setVideoUrl] = useState(value);

  const handleSearch = (videoUrl) => {
    onSearch(videoUrl)
  };

  return (
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
  );
}
