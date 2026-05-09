import { useState } from "react";

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
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23000' width='1920' height='1080'/%3E%3C/svg%3E"
      >
        <source src="/kochi-bg.mp4" type="video/mp4" />
      </video>
      {!isLoaded && (
        <div className="fixed inset-0 z-[4] bg-black" />
      )}
      <div className="fixed inset-0 z-[5] bg-black/40" />
    </>
  );
}
