import { useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { useMusicContext } from "../../context/MusicContext";
import lofi1 from "../../assets/images/lofi_image/lofi_1.jpg";
import lofi2 from "../../assets/images/lofi_image/lofi_2.jpg";
import lofi3 from "../../assets/images/lofi_image/lofi_3.jpg";
import lofi4 from "../../assets/images/lofi_image/lofi_4.jpg";
import springGif from "../../assets/images/gif_lofi/Autumn.gif";
import rainGif from "../../assets/images/gif_lofi/rain.gif";
import winterGif from "../../assets/images/gif_lofi/winter.gif";
import summerGif from "../../assets/images/gif_lofi/summer.gif";

const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = scrollbarHideStyles;
  document.head.appendChild(style);
}

const MusicPlayer = () => {
  const { isPlaying, currentTrack, setIsPlaying, setCurrentTrack } =
    useMusicContext();

  useEffect(() => {
    // Ensure music is stopped on initial load/refresh
    setIsPlaying(false);

    // Cleanup function to stop music when component unmounts
    return () => {
      setIsPlaying(false);
      setCurrentTrack(0);
    };
  }, [setIsPlaying, setCurrentTrack]);

  const tracks = [
    {
      id: 1,
      title: "Fall Season",
      image: lofi1,
      url: "https://www.youtube.com/live/zhDwjnYZiCo?si=rXziRA3ULZ60fTDI",
    },
    {
      id: 2,
      title: "Rain Season",
      image: lofi2,
      url: "https://www.youtube.com/live/DEWzT1geuPU?si=nHVwLbAXTxKDTfWx",
    },
    {
      id: 3,
      title: "Winter Season",
      image: lofi3,
      url: "https://www.youtube.com/live/2b0YiuEcIJs?si=i44kZDktjlrSQiVC",
    },
    {
      id: 4,
      title: "Summer Season",
      image: lofi4,
      url: "https://youtu.be/HQwLPhE2zys?si=lJv-xE-zk5k4wTaS",
    },
  ];

  const getCurrentBannerGif = () => {
    switch (currentTrack) {
      case 0:
        return springGif;
      case 1:
        return rainGif;
      case 2:
        return winterGif;
      case 3:
        return summerGif;
      default:
        return springGif;
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackClick = (index: number) => {
    if (currentTrack === index) {
      // If clicking the same track, just toggle play/pause
      togglePlay();
    } else {
      // If clicking a different track, switch to it and start playing
      setCurrentTrack(index);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] bg-white text-gray-800">
      <div className="relative w-full h-[50vh] md:h-90 overflow-hidden bg-gradient-to-b from-gray-100 scrollbar-hide">
        <img
          src={getCurrentBannerGif()}
          alt="Season Banner"
          className="absolute w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100/1 to-white"></div>
        <div className="absolute inset-0 flex items-center px-4 md:px-8">
          <div className="z-10">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              Focus Flow
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold italic text-gray-800">
              Your Study Soundtrack
            </h2>
            <p className="mt-2 text-xs md:text-sm text-gray-800">
              Study with the beats that sharpen your mind.
            </p>
            <button
              className="bg-gray-200 text-black px-4 md:px-6 py-2 rounded-full hover:bg-gray-200 flex items-center gap-2 mt-4 text-sm md:text-base"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause size={16} className="md:w-5 md:h-5" />
              ) : (
                <Play size={16} className="md:w-5 md:h-5" />
              )}
              {isPlaying ? "Pause" : "Play"} Mix
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-gradient-to-b from-white to-gray-50 scrollbar-hide">
        <div className="w-8xl mx-auto px-2 md:px-4">
          <div className="mb-4 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-gray-800">
              Playlist Tracks
            </h3>
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center p-3 rounded-md cursor-pointer ${
                    currentTrack === index ? "bg-gray-200" : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleTrackClick(index)}
                >
                  <div className="w-8 md:w-10 text-center text-gray-600 text-sm md:text-base">
                    {track.id}
                  </div>
                  <div className="w-14 h-14 md:w-20 md:h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 mr-4 md:mr-6">
                    <img
                      src={track.image || "https://via.placeholder.com/48"}
                      alt={track.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/48";
                      }}
                    />
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-gray-800 text-sm md:text-base">
                        {track.title}
                      </div>
                      <div className="text-xs md:text-sm text-gray-500">
                        Lofi Music
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
