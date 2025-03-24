import React from "react";
import { useMusicContext } from "../context/MusicContext";
import YouTubePlayer from "../pages/Music/YouTubePlayer";

const tracks = [
  { url: "https://www.youtube.com/live/zhDwjnYZiCo?si=rXziRA3ULZ60fTDI" },
  { url: "https://www.youtube.com/live/DEWzT1geuPU?si=nHVwLbAXTxKDTfWx" },
  { url: "https://www.youtube.com/live/2b0YiuEcIJs?si=i44kZDktjlrSQiVC" },
  { url: "https://youtu.be/HQwLPhE2zys?si=lJv-xE-zk5k4wTaS" },
];

const PersistentPlayer = () => {
  const { isPlaying, currentTrack, setIsPlaying, setCurrentTrack } =
    useMusicContext();

  const getCurrentVideoId = () => {
    const url = tracks[currentTrack]?.url || "";
    let videoId = "";

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("youtube.com/live/")) {
      videoId = url.split("youtube.com/live/")[1].split("?")[0];
    } else if (url.includes("youtube.com")) {
      const match = url.match(/[?&]v=([^&]+)/);
      videoId = match ? match[1] : "";
    }
    return videoId;
  };

  const handleTrackEnd = () => {
    const nextTrackIndex = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextTrackIndex);
    setIsPlaying(true);
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, zIndex: -1, opacity: 0 }}>
      {getCurrentVideoId() && (
        <YouTubePlayer
          videoId={getCurrentVideoId()}
          isPlaying={isPlaying}
          onEnded={handleTrackEnd}
          volume={100}
          autoplay={true}
        />
      )}
    </div>
  );
};

export default PersistentPlayer;
