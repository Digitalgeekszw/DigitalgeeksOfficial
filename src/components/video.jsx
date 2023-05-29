import React, { useState } from "react";

const VideoPlayer = ({ videoUrl }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const handleCancelClick = () => {
    setIsVideoPlaying(false);
  };

  return (
    <div className="relative w-full h-full">
      {isVideoPlaying ? (
        <video
          className="w-full h-full object-cover"
          controls
          autoPlay
          loop
          muted
          src={videoUrl}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-500">
          <button
            className="text-white px-4 py-2 rounded-lg bg-red-500"
            onClick={handleCancelClick}>
            Cancel Video
          </button>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className={`w-24 h-24 text-blue-500 animate-pulse ${
            isVideoPlaying ? "hidden" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </div>
    </div>
  );
};

export default VideoPlayer;
