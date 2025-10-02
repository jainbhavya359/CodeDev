"use client";
import { useState, useEffect, useRef } from "react";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";

export default function SplitLayout() {
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight / 2 : 400
  );

  const minEditorHeight = 100;
  const minOutputHeight = 150;
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const containerHeight = window.innerHeight;
        const newHeight = Math.min(
          Math.max(e.clientY, minEditorHeight),
          containerHeight - minOutputHeight
        );
        setHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startDragging = () => {
    isDragging.current = true;
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Editor Panel */}
      <div
        className="p-4 overflow-auto min-h-1/5 max-h-4/5"
        style={{ height: `${height}px` }}
      >
        <EditorPanel />
      </div>

      {/* Divider */}
      <div
        onMouseDown={startDragging}
        className="h-[7px] cursor-row-resize bg-gray-600"
      />

      {/* Output Panel */}
      <div className="flex-1 p-4 overflow-auto min-h-1/5 max-h-4/5">
        <OutputPanel />
      </div>
    </div>
  );
}
