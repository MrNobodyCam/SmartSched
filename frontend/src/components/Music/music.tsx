import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MusicProvider } from "./MusicContext";
import HomePage from "./pages/HomePage";
// import PlaylistPage from "../Music/pages/PlaylistPage";
// import FavoritesPage from "../Music/pages/FavoritesPage";

const YouTubePlayer = () => {
  return (
    <MusicProvider>
      <div style={styles.container}>
        {/* Hidden iframe for music playback */}
        <iframe
          id="youtube-iframe"
          width="0"
          height="0"
          src="https://www.youtube.com/embed/BrnDlRmW5hs?enablejsapi=1&autoplay=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: "none" }}
        ></iframe>

        <BrowserRouter>
          <nav style={styles.nav}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/playlist" style={styles.link}>Playlist</Link>
            <Link to="/favorites" style={styles.link}>Favorites</Link>
          </nav>

          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/playlist" element={<PlaylistPage />} /> */}
            {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </MusicProvider>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  nav: {
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "5px",
  },
  link: {
    margin: "0 10px",
    textDecoration: "none",
    color: "#4CAF50",
  },
};

export default YouTubePlayer;
