import React from "react";

import styles from "./courseCard.module.css";
import Image from "next/image";

export default function CourseCard({
  tags,
  title,
  description,
  imageUrl,
  onClick,
}) {
  console.log("title", title, imageUrl);

  return (
    <button className={styles.courseCard} onClick={onClick}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Imagen"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
            unoptimized
          />
        )}
      </div>

      <div className={styles.tags}>
        {tags &&
          tags.map((t) => (
            <div key={t.id} className={styles.tag}>
              {t.labels[0].label}
            </div>
          ))}
      </div>

      <div className={styles.title}>{title}</div>

      <div className={styles.description}>{description}</div>
    </button>
  );
}
