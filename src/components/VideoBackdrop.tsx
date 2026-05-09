export function VideoBackdrop() {
  return (
    <>
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/kochi-bg.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 z-[5] bg-black/40" />
    </>
  );
}
