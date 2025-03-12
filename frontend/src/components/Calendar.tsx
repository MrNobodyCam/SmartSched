// // ...existing code...

//   const CustomToolbar = (toolbar) => {
//     const goToBack = () => {
//       toolbar.onNavigate("PREV");
//     };

//     const goToNext = () => {
//       toolbar.onNavigate("NEXT");
//     };

//     const goToToday = () => {
//       toolbar.onNavigate("TODAY");
//     };

//     const handleMonthSelect = (month) => {
//       const newDate = new Date(toolbar.date);
//       newDate.setMonth(month);
//       toolbar.onNavigate('DATE', newDate);
//     };

//     const months = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];

//     return (
//       <div className="flex items-center justify-between p-2 bg-white border-b shadow-sm">
//         <div className="flex items-center space-x-1">
//           <button
//             className="px-3 py-1.5 bg-blue-500 text-white rounded-l hover:bg-blue-600 transition"
//             onClick={goToBack}
//           >
//             ←
//           </button>
//           <button
//             className="px-3 py-1.5 bg-blue-500 text-white hover:bg-blue-600 transition"
//             onClick={goToToday}
//           >
//             Today
//           </button>
//           <button
//             className="px-3 py-1.5 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition"
//             onClick={goToNext}
//           >
//             →
//           </button>
//           <div className="relative ml-2">
//             <select
//               className="appearance-none bg-white border border-blue-500 text-blue-500 px-3 py-1.5 pr-8 rounded cursor-pointer hover:border-blue-600 transition"
//               onChange={(e) => handleMonthSelect(parseInt(e.target.value))}
//               value={toolbar.date.getMonth()}
//             >
//               {months.map((month, index) => (
//                 <option key={month} value={index}>
//                   {month}
//                 </option>
//               ))}
//             </select>
//             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
//               <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                 <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
//               </svg>
//             </div>
//           </div>
//         </div>
//         <h2 className="text-lg font-semibold text-gray-800 hidden sm:block">
//           {toolbar.label}
//         </h2>
//         <div className="flex space-x-1">
//           {["month", "week", "day", "agenda"].map((view) => (
//             <button
//               key={view}
//               className={`px-3 py-1.5 rounded text-sm transition ${
//                 toolbar.view === view
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//               onClick={() => toolbar.onView(view)}
//             >
//               {view.charAt(0).toUpperCase() + view.slice(1, 3)}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   };

// // ...existing code...
