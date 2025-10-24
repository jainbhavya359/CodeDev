"use client";
import { useEffect, useRef } from "react";
import EditorPanel from "./EditorPanel";
import OutputPanel from "./OutputPanel";
import { HomeDimensions } from "@/store/useCodeEditorStore";

export default function SplitLayout() {
  const { editorHeight, setEditorHeight } = HomeDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const minEditorHeight = 300;
  const minOutputHeight = 150;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Preventing height Calculation at every Mouse Drag unless performed on dragger.
      if (!isDragging.current || !containerRef.current) return;

      // Gives us Info abt All dimension of Outer div Contaning Everything
      const containerRect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRect.height;

      // Adjust relative to the container's viewport position
      const offsetY = e.clientY - containerRect.top;
      const newHeight = Math.min(
        Math.max(offsetY, minEditorHeight),
        containerHeight - minOutputHeight
      );

      // NewHeight gives us the location of dragger 

      setEditorHeight(newHeight);
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
  }, [setEditorHeight]);

  const startDragging = () => {
    isDragging.current = true;
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";

    // Preventing Drag Selection 
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full max-h-full overflow-hidden"
    >
      {/* Editor */}
      <div
        style={{ height: `${editorHeight}px`, minHeight: `${minEditorHeight}px` }}
        className="z-10"
      >
        <EditorPanel />
      </div>

      {/* Divider */}
      <div
        onMouseDown={startDragging}
        className="h-[6px] cursor-row-resize bg-gray-700/50 hover:bg-gray-500/70 transition-all z-20"
      />

      {/* Output */}
      {/* flex-1 tells container to grow and take remaining space available */}
      <div className="flex flex-col flex-1 overflow-hidden z-11">
        <div className="flex-1 overflow-auto">
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}


