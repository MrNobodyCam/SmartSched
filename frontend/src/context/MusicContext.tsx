import React, { createContext, useState, useContext } from "react";

interface MusicContextType {
  isPlaying: boolean;
  currentTrack: number;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<number>(0);

  return (
    <MusicContext.Provider
      value={{ isPlaying, currentTrack, setIsPlaying, setCurrentTrack }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (undefined === context) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }
  return context;
};
