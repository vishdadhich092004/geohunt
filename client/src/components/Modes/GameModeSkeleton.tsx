import { motion } from "framer-motion";
import { Heart, Clock } from "lucide-react";
import { GameModeType } from "../../../../server/shared/types";

export const ClassicSkeleton = ({ mode }: { mode: GameModeType }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-t-lg p-4 flex-col space-y-4"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1577436705536-4f2b677b1639?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "transparent",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="h-8 w-8 rounded-full bg-black/50 text-amber-400 flex items-center justify-center font-bold">
          {mode.maxLives}
        </div>
        <Heart className="h-6 w-6 text-amber-400 drop-shadow-md" />
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="text-2xl font-bold text-amber-400 drop-shadow-lg">
          Classic Mode
        </div>
      </div>
    </motion.div>
  );
};

export const SpeedSkeleton = ({ mode }: { mode: GameModeType }) => {
  const variants = {
    initial: {
      width: "0%",
    },
    animate: {
      width: "100%",
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-t-lg p-4 flex-col space-y-4"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1573068111653-f18bef611c8a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "transparent",
      }}
    >
      <div className="flex items-center justify-between">
        <Clock className="h-6 w-6 text-amber-400 drop-shadow-md" />
        <div className="text-amber-400 font-semibold drop-shadow-md">
          {Math.floor(mode.timeLimit! / 60)}:
          {(mode.timeLimit! % 60).toString().padStart(2, "0")}
        </div>
      </div>
      <motion.div
        variants={variants}
        className="h-2 bg-amber-400 rounded-full shadow-lg"
      />
    </motion.div>
  );
};

export const BlitzSkeleton = ({ mode }: { mode: GameModeType }) => {
  const variants = {
    initial: {
      width: "0%",
    },
    animate: {
      width: "100%",
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-t-lg p-4 flex-col space-y-4"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "transparent",
      }}
    >
      <div className="flex items-center justify-between">
        <Clock className="h-6 w-6 text-amber-400 drop-shadow-md" />
        <div className="text-amber-400 font-semibold drop-shadow-md">
          {Math.floor(mode.timeLimit! / 60)}:
          {(mode.timeLimit! % 60).toString().padStart(2, "0")}
        </div>
      </div>
      <motion.div
        variants={variants}
        className="h-2 bg-amber-400 rounded-full shadow-lg"
      />
    </motion.div>
  );
};

export const InfiniteSkeleton = () => {
  const variants = {
    initial: {
      opacity: 0.8,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-t-lg flex-col space-y-2"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1504197832061-98356e3dcdcf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "transparent",
      }}
    >
      <div className="h-full w-full rounded-lg flex items-center justify-center">
        <span className="text-amber-400 text-4xl font-bold drop-shadow-lg">
          ∞
        </span>
      </div>
    </motion.div>
  );
};

export const HardcoreSkeleton = () => {
  const variants = {
    initial: { scale: 1 },
    animate: { scale: 1.1 },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-t-lg p-4"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1597952681778-21b365d312ca?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "transparent",
      }}
    >
      <motion.div
        variants={variants}
        className="flex items-center justify-center w-full"
      >
        <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
          <Heart className="h-6 w-6 text-amber-400" />
          <span className="text-2xl font-bold text-amber-400">1</span>
        </div>
      </motion.div>
    </motion.div>
  );
};
