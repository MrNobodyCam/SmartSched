import React, { useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  // Volume2,
} from "lucide-react";
import { useMusicContext } from "../MusicContext";

const HomePage = () => {
  const { isPlaying, togglePlayback } = useMusicContext();
  const [currentTrack, setCurrentTrack] = useState(0);

  const tracks = [
    {
      id: 1,
      title: "Timeless (feat Playboi Carti)",
      artist: "The Weeknd, Playboi Carti",
      // ...existing track data...
    },
    // ...rest of the tracks array...
  ];

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const handleTrackClick = (index: number) => {
    setCurrentTrack(index);
    if (!isPlaying) {
      togglePlayback();
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white">
      {/* Header Banner */}
      <div
        className="relative w-full h-90 overflow-hidden"
        style={{ marginTop: "-14px" }}
      >
        <div className="">
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjYzcTE4d3Y0YjA2Z3djNms1cWxrM3M0dTI0cm04a3MzNDM4Y3RjdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KWcGnX2iz0G1fMMHrO/giphy.gif"
            alt="Banner Background"
            className="w-full h-full object-contain opacity-95"
          />
        </div>
        {/* </div> */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900"></div>
        <div className="absolute bottom-8 left-8 right-8">
          <h1 className="text-4xl font-bold mb-2">Weekly Mix</h1>
          <p className="text-gray-300 mb-4">
            Your personalized playlist updated every week
          </p>
          <button
            className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 flex items-center gap-2"
            onClick={togglePlayback}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? "Pause" : "Play"} Mix
          </button>
        </div>
      </div>

      {/* Playlist Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Popular Tracks</h3>
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between p-2 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                  onClick={() => handleTrackClick(index)}
                >
                  <div>
                    <h4 className="text-lg font-semibold">{track.title}</h4>
                    <p className="text-sm text-gray-400">{track.artist}</p>
                  </div>
                  <div>
                    {currentTrack === index && isPlaying ? (
                      <Pause size={20} />
                    ) : (
                      <Play size={20} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="max-w-4xl mx-auto">
          {/* Current Track Info */}
          <div className="flex items-center">
            {/* ...existing track info code... */}
          </div>

          {/* Controls */}
          <div className="mt-4">
            <div className="flex items-center justify-center space-x-6">
              <button className="text-gray-400 hover:text-white">
                <Shuffle size={20} />
              </button>
              <button
                className="text-gray-400 hover:text-white"
                onClick={prevTrack}
              >
                <SkipBack size={24} />
              </button>
              <button
                className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200"
                onClick={togglePlayback}
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button
                className="text-gray-400 hover:text-white"
                onClick={nextTrack}
              >
                <SkipForward size={24} />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Repeat size={20} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 flex items-center">
              {/* ...existing progress bar code... */}
            </div>
          </div>

          {/* Volume Control */}
          <div className="mt-4 flex items-center justify-end">
            {/* ...existing volume control code... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
