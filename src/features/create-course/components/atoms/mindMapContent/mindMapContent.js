import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import MindMapNode from "../mindMapNode/mindMapNode";

let idCounter = 100;
const generateNodeId = () => `${idCounter++}`;

function getClosestHandle(sourcePos, targetPos) {
  const dx = targetPos.x - sourcePos.x;
  const dy = targetPos.y - sourcePos.y;

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? "r" : "l";
  } else {
    return dy > 0 ? "b" : "t";
  }
}

const getClosest = (nodes, edges) => {
  return edges.map((edge) => {
    const sourceNode = nodes.find((n) => n.id === edge.source);
    const targetNode = nodes.find((n) => n.id === edge.target);

    const sourceHandle = getClosestHandle(
      sourceNode.position,
      targetNode.position
    );
    const targetHandle = getClosestHandle(
      targetNode.position,
      sourceNode.position
    );

    return {
      ...edge,
      sourceHandle,
      targetHandle,
    };
  });
};

const nodeTypes = {
  node: (props) => {
    return (
      <MindMapNode
        id={props.id}
        label={props.data.label}
        selected={props.selected}
        onChangeLabel={props.data.onChangeLabel}
      />
    );
  },
};

export default function MindMapContent({ id, nodes, edges, onChange }) {
  const handleChange = (changes) => {
    const newNodes = applyNodeChanges(changes, nodes);
    const newEdges = getClosest(newNodes, applyEdgeChanges(changes, edges));
    onChange({
      content: {
        id,
        type: "MINDMAP",
        nodes: newNodes,
        edges: newEdges,
      },
    });
  };

  const handleConnect = (changes) => {
    const newNodes = nodes;
    const newEdges = getClosest(newNodes, addEdge(changes, edges));
    onChange({
      content: {
        id,
        type: "MINDMAP",
        nodes: newNodes,
        edges: newEdges,
      },
    });
  };

  const handlePaneClick = (e) => {
    const bounds = e.target.getBoundingClientRect();
    const position = {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };

    const newNode = {
      id: generateNodeId().toString(),
      type: "node",
      position,
    };

    const newNodes = [...nodes, newNode];
    const newEdges = edges;

    onChange({
      content: {
        id,
        type: "MINDMAP",
        nodes: newNodes,
        edges: newEdges,
      },
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        const newNodes = nodes.filter((node) => !node.selected);
        const selectedNode = nodes.find((node) => node.selected);
        const newEdges = edges.filter(
          (edge) =>
            edge.source !== selectedNode.id &&
            edge.target !== selectedNode.id &&
            !edge.selected
        );

        onChange({
          content: {
            id,
            type: "MINDMAP",
            nodes: newNodes,
            edges: newEdges,
          },
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nodes, edges]);

  const handleChangeLabel = ({ nodeId, label }) => {
    const newNodes = nodes.map((node) =>
      node.id === nodeId
        ? {
            ...node,
            data: {
              ...node.data,
              label,
            },
          }
        : node
    );
    const newEdges = edges;

    onChange({
      content: {
        id,
        type: "MINDMAP",
        nodes: newNodes,
        edges: newEdges,
      },
    });
  };

  return (
    <div style={{ width: "100%", height: "50vh" }}>
      {nodes && edges && (
        <ReactFlow
          nodes={nodes.map((n) => {
            return {
              ...n,
              data: {
                ...n.data,
                onChangeLabel: handleChangeLabel,
              },
            };
          })}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={handleChange}
          onEdgesChange={handleChange}
          onConnect={handleConnect}
          onPaneClick={handlePaneClick}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={24} size={3} />
        </ReactFlow>
      )}
    </div>
  );
}
