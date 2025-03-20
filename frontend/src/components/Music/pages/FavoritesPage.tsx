// import React, { useState } from "react";
// import { useMusicContext } from "../MusicContext";
// import PrimaryBtn from "../../../components/PrimaryBtn";

// const FavoritesPage = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     email: "",
//     message: "",
//     agreedToPolicy: false,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: checked,
//     }));
//   };
//   // We can access music context if needed, but won't show controls
//   const { isPlaying } = useMusicContext();
//   const [alertMessage, setAlertMessage] = useState<{ type: string; message: string } | null>(null);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // Add your form submission logic here
//     console.log("Form submitted");
//   };

//   return (
//     <div className="w-full p-4">
//       <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
//       <p>Current music is {isPlaying ? "playing" : "paused"}</p>

//       {/* You can keep the existing form below if needed */}
//       <div className="mt-8">
//         <div
//           className="flex items-start justify-start w-full h-full"
//           style={{ position: "absolute" }}
//         >
//           {alertMessage && (
//             <div
//               className={`fixed top-4 right-4 p-4 rounded-md ${
//                 alertMessage.type === "success"
//                   ? "bg-green-100 text-green-700"
//                   : "bg-red-100 text-red-700"
//               }`}
//             >
//               {alertMessage.message}
//               <button
//                 onClick={() => setAlertMessage(null)}
//                 className="ml-4 text-sm font-bold"
//               >
//                 ✕
//               </button>
//             </div>
//           )}
//           <div className="w-[876px] h-full rounded-md">
//             <form onSubmit={handleSubmit}>
//               <div className="mb-5">
//                 <h1 className="text-[30px] md:text-[32px] lg:text-[36px] font-bold mb-1">
//                   Contact us
//                 </h1>
//                 <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-400 mb-6">
//                   Reach out and we'll get in touch within 24 hours.
//                 </p>
//               </div>
//               <div className="mb-5">
//                 <label
//                   htmlFor="title"
//                   className="block text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black mb-1"
//                 >
//                   Title
//                 </label>
//                 <input
//                   type="title"
//                   name="title"
//                   id="title"
//                   placeholder="Enter your title..."
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full h-[48px] rounded-md border border-[#e0e0e0] bg-white py-2 sm:py-3 px-4 sm:px-6 text-[14px] md:text-[16px] lg:text-[18px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md placeholder:text-[14px] md:placeholder:text-[16px] lg:placeholder:text-[18px] transition-all duration-200"
//                   required
//                 />
//               </div>
//               <div className="mb-5">
//                 <label
//                   htmlFor="email"
//                   className="block text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black mb-1"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   placeholder="Enter your email address..."
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full h-[48px] rounded-md border border-[#e0e0e0] bg-white py-2 sm:py-3 px-4 sm:px-6 text-[14px] md:text-[16px] lg:text-[18px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md placeholder:text-[14px] md:placeholder:text-[16px] lg:placeholder:text-[18px] transition-all duration-200"
//                   required
//                 />
//               </div>
//               <div className="mb-5">
//                 <label
//                   htmlFor="message"
//                   className="mb-3 text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black "
//                 >
//                   Message
//                 </label>
//                 <textarea
//                   rows={4}
//                   name="message"
//                   id="message"
//                   placeholder="Enter your message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="w-full min-h-[150px] sm:min-h-[200px] md:min-h-[230px] resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-[14px] md:text-[16px] lg:text-[18px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md placeholder:text-[14px] md:placeholder:text-[16px] lg:placeholder:text-[18px]"
//                   required
//                 />
//               </div>
//               <div className="mb-5 flex items-center">
//                 <input
//                   type="checkbox"
//                   id="policy"
//                   name="agreedToPolicy"
//                   checked={formData.agreedToPolicy}
//                   onChange={handleCheckboxChange}
//                   className="mr-2"
//                   style={{ width: "18px", height: "18px" }}
//                   required
//                 />
//                 <label
//                   htmlFor="policy"
//                   className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-600 mt-2 sm:mt-0"
//                 >
//                   You agree to our friendly{" "}
//                   <a
//                     href="/privacy-policy"
//                     className="text-blue-500 hover:underline"
//                   >
//                     privacy policy
//                   </a>
//                   .
//                 </label>
//               </div>
//               <div>
//                 <PrimaryBtn type="submit" py="py-1" px="px-8">
//                   Send Messages
//                 </PrimaryBtn>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FavoritesPage;
