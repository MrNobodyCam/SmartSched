import { useState } from "react";
import topic from "../assets/icons/details-more.svg";
import time from "../assets/icons/time.svg";
import PrimaryBtn from "../components/PrimaryBtn";
import duration from "../assets/icons/timelapse.svg";
// import search from "../assets/icons/search.svg";

function HistoryScreen() {
  // Example data fetched from a database (could be replaced with API call)
  const initialData = [
    {
      id: 1,
      title: "Learn Vue JS/React JS",
      topic: "React JS / Vue JS",
      freeTime: "7:00PM - 11:00PM",
      duration: "30 Days",
    },
    {
      id: 2,
      title: "Master JavaScript",
      topic: "JavaScript",
      freeTime: "8:00AM - 10:00AM",
      duration: "15 Days",
    },
    {
      id: 3,
      title: "Build APIs with Node.js",
      topic: "Node.js",
      freeTime: "6:00PM - 9:00PM",
      duration: "20 Days",
    },
    {
      id: 4,
      title: "Explore Python",
      topic: "Python",
      freeTime: "9:00AM - 12:00PM",
      duration: "25 Days",
    },
  ];

  // State for search input and filtered data
  const [searchTerm, setSearchTerm] = useState("");
  const [historyData, setHistoryData] = useState(initialData);

  // Live search function
  const handleSearch = (e: { target: { value: string } }) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    // Filter data based on the search term
    const filtered = initialData.filter((item) =>
      item.title.toLowerCase().includes(term)
    );
    setHistoryData(filtered);
  };

  return (
    <>
      {/* Container */}
      <div className="relative w-full min-h-screen p-4 sm:p-6">
        {/* Title */}
        <h1 className="text-[36px] sm:text-2xl lg:text-[36px] font-bold text-black">
          History Schedule
        </h1>
        <p className="text-[18px] sm:text-sm lg:text-[18px] text-black mt-4">
          Showing your all histories with a clear view
        </p>

        {/* Search Bar */}
        <div className="flex justify-end w-full max-w-full mt-4">
          <div className="flex items-center border-2 border-gray-300 rounded-[12px] p-2 bg-white w-[267px] h-[36px]">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="outline-none text-opacity-40 mr-2 flex-grow text-sm sm:text-base"
            />
            {/* <img src={search} alt="Search" className="w-5 h-5 sm:w-6 sm:h-6" /> */}
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-15">
          {historyData.length > 0 ? (
            historyData.map((item) => (
              <div
                key={item.id}
                className="relative bg-green-100 rounded-lg shadow-lg p-4 sm:p-6"
              >
                {/* Title */}
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black">
                  {item.title}
                </h2>
                <div className="mt-4 space-y-2">
                  {/* Topic */}
                  <div className="flex items-center">
                    <img
                      src={topic}
                      alt="Topic"
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    />
                    <p className="text-sm sm:text-base lg:text-lg text-black">
                      <span className="font-semibold">Topic:</span> {item.topic}
                    </p>
                  </div>
                  {/* Free Time */}
                  <div className="flex items-center">
                    <img
                      src={time}
                      alt="Time"
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    />
                    <p className="text-sm sm:text-base lg:text-lg text-black">
                      <span className="font-semibold">Free Time:</span>{" "}
                      {item.freeTime}
                    </p>
                  </div>
                  {/* Duration */}
                  <div className="flex items-center">
                    <img
                      src={duration}
                      alt="Duration"
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    />
                    <p className="text-sm sm:text-base lg:text-lg text-black">
                      <span className="font-semibold">Duration:</span>{" "}
                      {item.duration}
                    </p>
                  </div>
                  {/* Button */}
                </div>
                <div className="mt-4 ml-auto flex justify-end">
                  <PrimaryBtn py="py-1" px="px-8 md:px-6 lg:px-6">
                    See more
                  </PrimaryBtn>
                </div>
                {/* <button className="mt-4 ml-auto block w-full sm:w-auto bg-[rgba(45,156,219,0.8)] bg-opacity-80 text-white py-2 px-4 rounded-lg shadow-md text-xs sm:text-sm lg:text-base">
                  See more
                </button> */}
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center min-h-[50vh]">
              <p className="text-black text-center text-lg sm:text-xl lg:text-2xl">
                No results found.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HistoryScreen;
