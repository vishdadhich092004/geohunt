import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GameTimerProps {
  timeLimit: number;
  startedAt: string;
  timeRemaining: number;
  setTimeRemaining: (timeRemaining: number) => void;
}

function GameTimer({
  timeLimit,
  startedAt,
  timeRemaining,
  setTimeRemaining,
}: GameTimerProps) {
  const parsedStartedAt = new Date(startedAt.replace(" ", "T"));
  const [showFullscreenCount, setShowFullscreenCount] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(
        timeLimit - (Date.now() - parsedStartedAt.getTime()) / 1000
      );
    }, 100);
    return () => clearInterval(interval);
  }, [timeLimit]);

  useEffect(() => {
    setShowFullscreenCount(timeRemaining <= 5 && timeRemaining > 0);
  }, [timeRemaining]);

  return (
    <>
      <div className="flex items-center gap-1.5 rounded-lg p-2 shadow-md w-fit bg-zinc-800">
        <svg
          className="w-5 h-5 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-lg font-medium text-zinc-200">
          {Math.ceil(timeRemaining)}s
        </span>
      </div>

      <AnimatePresence>
        {showFullscreenCount && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center mt-10"
          >
            <motion.div
              key={Math.ceil(timeRemaining)}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[200px] font-bold text-white"
            >
              {Math.ceil(timeRemaining)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default GameTimer;
