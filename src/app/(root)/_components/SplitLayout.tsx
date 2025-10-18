"use client";
import { useState, useEffect, useRef } from "react";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";
import { HomeDimensions } from "@/store/useCodeEditorStore";

export default function SplitLayout() {
  const { editorHeight, setEditorHeight} = HomeDimensions();
  const minEditorHeight = 120;
  const minConsoleHeight = 120;
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerHeight = rect.height;
        const offsetY = e.clientY - rect.top;

        const newHeight = Math.min(
          Math.max(offsetY, minEditorHeight),
          containerHeight - minConsoleHeight
        );
        setEditorHeight(newHeight);
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
    <div ref={containerRef} className="flex flex-col h-full">
      {/* Editor */}
      <div
        className="z-10"
        style={{ height: `${editorHeight}px`, minHeight: `${minEditorHeight}px` }}
      >
        <EditorPanel />
      </div>

      {/* Divider */}
      <div
        onMouseDown={startDragging}
        className="h-[5px] cursor-row-resize bg-gray-600 opacity-50 z-10"
      />

      <div
        className="flex-1 overflow-auto z-11"
        style={{ minHeight: `${minConsoleHeight}px` }}
      >
        <OutputPanel />
      </div>
    </div>
  );
}
