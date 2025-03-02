import { useRef, useEffect } from "react";
import geohuntdemo from "@/media/geohuntdemo.mp4";
import BackButton from "@/components/BackButton";
const Demo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video setup
    const playVideo = async () => {
      try {
        await videoRef.current?.play();
        console.log("Video playing");
      } catch (error) {
        console.error("Video play error:", error);
      }
    };

    playVideo();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Back button */}
      <div className="absolute top-4 left-4 mt-20">
        <BackButton />
      </div>

      <div className="w-full max-w-4xl">
        <div className="relative rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl shadow-black/50 group">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl"
            preload="auto"
            onError={(e) => console.error("Video error:", e)}
          >
            <source src={geohuntdemo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white text-sm font-medium bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
              GeoHunt Demo
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-3 text-center">
          Experience the thrill of exploring global landmarks and landscapes
        </p>
      </div>
    </div>
  );
};

export default Demo;
