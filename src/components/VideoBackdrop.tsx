import { useState } from "react";
import { Loader2 } from "lucide-react";

export function VideoBackdrop() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setIsLoaded(true)}
      >
        <source src="/kochi-bg.mp4" type="video/mp4" />
      </video>
      {!isLoaded && (
        <div className="fixed inset-0 z-[4] bg-black flex items-center justify-center">
          <Loader2 size={32} className="text-white animate-spin" />
        </div>
      )}
      <div className="fixed inset-0 z-[5] bg-black/40" />
    </>
  );
}
