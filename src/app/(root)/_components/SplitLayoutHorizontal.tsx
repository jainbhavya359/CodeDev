"use client";
import { useState, useEffect, useRef } from "react";
import EditorPanel from "./EditorPanel";
import SplitLayout from "./SplitLayout";

export default function SplitLayoutHorizontal() {
  const [width, setWidth] = useState(900);
  const minWidth = 300;
  const maxWidth =
    typeof window !== "undefined" ? window.innerWidth - 200 : 800;

  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const newWidth = Math.min(Math.max(e.clientX, minWidth), maxWidth);
        setWidth(newWidth);
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
  }, [maxWidth]);

  const startDragging = () => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none"; 
  };

  return (
    <div className="flex flex-col xl:flex-row h-screen">
      {/* Editor Panel */}
      <div
        className="p-4 overflow-auto min-w-md max-h-screen"
        style={{ width: `${width}px` }}
      >
        <EditorPanel />
      </div>

      {/* Divider */}
      <div
        onMouseDown={startDragging}
        className="w-[5px] cursor-col-resize "
      />

      {/* Output Panel */}
      <div className="flex-1 p-4 overflow-auto min-w-md max-h-screen">
        <SplitLayout />
      </div>
    </div>
  );
}
