"use client";

import { getExecutionResult, useCodeEditorStore, useUserStore } from "@/store/useCodeEditorStore";
import axios from "axios";
import { motion } from "framer-motion";
import { output } from "framer-motion/client";
import { Loader2, Play } from "lucide-react";

function RunButton() {
  const { runCode, language, isRunning } = useCodeEditorStore();
  const { userId } = useUserStore()

  const handleRun = async () => {
    await runCode();
    const result = getExecutionResult();

    console.log(result);
    console.log(userId);

    if(result && userId){
        console.log("saved")
        try {
            await axios.post("/api/saveCode", { 
                language,
                code: result.code,
                output: result.output || undefined,
                error: result.error || undefined,
                userId
            });
        } catch (error: any) {
            console.log("error:" + error.message);
        }
    }
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative inline-flex items-center gap-2.5 px-5 py-2.5
        disabled:cursor-not-allowed
        focus:outline-none
      `}
    >
      {/* bg wit gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl opacity-100 transition-opacity group-hover:opacity-90" />

      <div className="relative flex items-center gap-2.5">
        {isRunning ? (
          <>
            <div className="relative">
              <Loader2 className="w-4 h-4 animate-spin text-white/70" />
              <div className="absolute inset-0 blur animate-pulse" />
            </div>
            <span className="text-sm font-medium text-white/90">Executing...</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-4 h-4">
              <Play className="w-4 h-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white" />
            </div>
            <span className="text-sm font-medium text-white/90 group-hover:text-white">
              Run Code
            </span>
          </>
        )}
      </div>
    </motion.button>
  );
}
export default RunButton;