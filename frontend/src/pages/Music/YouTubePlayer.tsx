import React, { useEffect, useRef } from "react";
import YouTube, {
  YouTubeEvent,
  YouTubePlayer as YTPlayer,
} from "react-youtube";

interface YouTubePlayerProps {
  videoId: string;
  isPlaying: boolean;
  onEnded: () => void;
  volume?: number;
  autoplay?: boolean;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  isPlaying,
  onEnded,
  volume = 50,
  autoplay = true,
}) => {
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    if (playerRef.current) {
      try {
        if (isPlaying) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      } catch (error) {
        console.error("Error controlling video:", error);
      }
    }
  }, [isPlaying, videoId]);

  const onReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);
    if (isPlaying) {
      event.target.playVideo();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-0 h-0 overflow-hidden">
      <YouTube
        videoId={videoId}
        opts={{
          playerVars: {
            autoplay: autoplay ? 1 : 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
          },
        }}
        onReady={onReady}
        onEnd={onEnded}
        onStateChange={(event) => {
          if (event.data === YouTube.PlayerState.ENDED) {
            onEnded();
          }
        }}
        onError={(e) => {
          console.error("YouTube Player Error:", e);
          onEnded();
        }}
      />
    </div>
  );
};

export default YouTubePlayer;
