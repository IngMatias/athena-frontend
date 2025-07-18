import { Handle, Position } from "@xyflow/react";
import { useState } from "react";

import styles from "./mindMapNode.module.css";

export default function MindMapNode({ id, label, selected, onChangeLabel }) {
  const [editing, setEditing] = useState(false);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    onChangeLabel(id, label);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditing(false);
    }
  };

  const handleChangeLabel = (e) => {
    onChangeLabel({
      nodeId: id,
      label: e.target.value,
    });
  };

  return (
    <div
      className={
        `${styles.mindMapNode}` + (selected ? ` ${styles.selected}` : "")
      }
      onDoubleClick={handleDoubleClick}
    >
      {editing ? (
        <input
          className={styles.input}
          value={label}
          onChange={handleChangeLabel}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div>{label}</div>
      )}

      <Handle type="target" position={Position.Top} id="t" />
      <Handle type="source" position={Position.Top} id="t" />

      <Handle type="target" position={Position.Right} id="r" />
      <Handle type="source" position={Position.Right} id="r" />

      <Handle type="target" position={Position.Bottom} id="b" />
      <Handle type="source" position={Position.Bottom} id="b" />

      <Handle type="target" position={Position.Left} id="l" />
      <Handle type="source" position={Position.Left} id="l" />
    </div>
  );
}
