"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineRobot } from "react-icons/ai";
import ChatPanel from "./ChatPanel";

export default function FloatingButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <button
          aria-label={open ? "Close assistant" : "Open assistant"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full bg-accent p-3 text-white shadow-lg transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          <span className="sr-only">Assistant</span>
          <motion.span initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-lg text-white">
            <AiOutlineRobot className="h-6 w-6" />
          </motion.span>
        </button>
      </div>
      {open && <ChatPanel onClose={() => setOpen(false)} />}
    </>
  );
}
