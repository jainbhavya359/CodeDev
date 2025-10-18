  "use client";
  import { useState, useEffect, useRef } from "react";
  import SplitLayout from "./SplitLayout";
  import { HomeDimensions } from "@/store/useCodeEditorStore";
  import DescriptionPanel from "./DescriptionPanel";

  export default function SplitLayoutHorizontal() {
    const minWidth = 250;
    const isDragging = useRef(false);
    const { height, width, setWidth } = HomeDimensions(); 

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
          const maxWidth = window.innerWidth - 300; // prevent right collapse
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
    }, []);

    const startDragging = () => {
      isDragging.current = true;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    };

    return (
      <div
        className="flex flex-row w-full h-full"
        style={{ height: `calc(100vh - ${height}px)` }} 
      >
        
        <div
          className="overflow-auto h-full"
          style={{ width: `${width}px`, minWidth: `${minWidth}px` }}
        >
          <DescriptionPanel />
        </div>

        {/* Divider */}
        <div
          onMouseDown={startDragging}
          className="w-[5px] cursor-col-resize bg-gray-700 opacity-50"
        />

        <div className="flex-1 h-full overflow-hidden">
          <SplitLayout />
        </div>
      </div>
    );
  }
