import React, { useEffect, useRef } from "react";

export default function Demo() {
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <div className="h-[20dvh] hidden min-[480px]:block sm:min-h-[40dvh] w-full mb-10 ">
      <div className="w-full mx-auto sm:w-[95%] md:w-10/12 ">
        <video
          style={{
            width: "100%",
          }}
          className="sm:rounded-[10px] border-[4px] border-black"
          playsInline
          loop
          muted
          controls={false}
          alt="All the devices"
          src="/demo.mp4"
          ref={videoEl}
        />
      </div>
    </div>
  );
}
