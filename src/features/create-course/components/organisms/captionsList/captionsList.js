import { formatTime } from "@/utils/date";
import React, { useEffect, useRef } from "react";
import styles from "./captionsList.module.css";

export default function CaptionsList({ captions, activeIndex, onClickCaption }) {
  const itemRefs = useRef([]);
  itemRefs.current = [];

  const setItemRef = (el) => { if (el) itemRefs.current.push(el); };

  useEffect(() => {
    if (activeIndex === -1) return;
    const el = itemRefs.current[activeIndex];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex]);

  return (
    <div className={styles.captionList}>
      {captions.map((c, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            className={`${styles.captionItem} ${isActive ? styles.active : ""}`}
            key={i}
            ref={setItemRef}
          >
            <div className={styles.captionTime} 
            onClick={() => onClickCaption(c.start)}
            >{formatTime(c.start)}</div>
            <div className={styles.captionText}
            >{c.text}</div>
          </div>
        );
      })}
    </div>
  );
}


