import React from "react";

import styles from "./textContent.module.css";

export default function TextContent({ text }) {
  return (
    <div style={{ width: "100%" }} className={styles.textInputContent}>
      {text}
    </div>
  );
}
