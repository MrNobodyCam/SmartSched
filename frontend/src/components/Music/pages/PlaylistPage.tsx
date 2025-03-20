// import React from "react";
// import { useMusicContext } from "../MusicContext";
// import NotificationPopup from "../../NotificationPopup";
// // import profilePic from "../../../assets/profile-pic.jpg";

// const PlaylistPage = () => {
//   // We can access music context if needed, but won't show controls
//   const { isPlaying } = useMusicContext();

//   return (
//     <div className="w-full">
//       <header className="fixed top-0 left-0 w-full h-16 bg-[#D5F0FF] z-50 flex items-center justify-between px-4 md:px-8">
//         <div className="flex items-center space-x-4">
//           <button
//             className="btn btn-square btn-ghost p-1 md:hidden cursor-pointer"
//             onClick={() => {}}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="inline-block h-6 w-6 stroke-current text-gray-700"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               ></path>
//             </svg>
//           </button>
//           <h1 className="text-[22px] md:text-[24px] lg:text-[26px] font-bold text-gray-800">
//             SmartSched
//           </h1>
//         </div>
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <NotificationPopup />
//           </div>
//         </div>
//       </header>

//       <div className="mt-20 p-4">
//         <h1 className="text-2xl font-bold mb-4">My Playlist</h1>
//         {/* Add your playlist content here */}
//         <p>Current music is {isPlaying ? "playing" : "paused"}</p>
//       </div>
//     </div>
//   );
// };

// export default PlaylistPage;
