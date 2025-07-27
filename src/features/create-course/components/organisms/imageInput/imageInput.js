import React, { useContext } from "react";
import { CourseContext } from "../../../stores/CourseContextProvider";

import styles from "./imageInput.module.css";
import Image from "next/image";

export default function ImageInput() {
  const { imagePreview, setImage } = useContext(CourseContext);

  const handleChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div className={styles.imageInput}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Imagen"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
        )}
      </div>

      <input type="file" onChange={handleChange} />
    </div>
  );
}
