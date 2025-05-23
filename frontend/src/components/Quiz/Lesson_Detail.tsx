import { useState, useEffect } from "react";
import { X, Clock, Menu, FileText } from "lucide-react";
import { fetchGetData } from "../../service/api";
// import Pen from "../../assets/icons/pen.svg";
import PrimaryBtn from "../PrimaryBtn";
import SecondaryBtn from "../SecondaryBtn";
import Loading from "../Alert/Loading";

const PopupComponent = ({
  RoadMapNumber,
  ScheduleID,
  onClose,
  openQuiz,
}: {
  ScheduleID: number;
  RoadMapNumber: number;
  onClose(): void;
  openQuiz(): void;
}) => {
  const [quizData, setQuizData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    console.log(RoadMapNumber, ScheduleID);

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchGetData(
          `roadmap/detail?roadmap_number=${RoadMapNumber}&schedule_id=${ScheduleID}`
        );
        setQuizData(data[0]);
      } catch (error) {
        setError((error as any).message);
      } finally {
        setLoading(false);
      }
      console.log(error);
    };

    fetch();
  }, [RoadMapNumber, ScheduleID]);
  if (loading) {
    return <Loading text="Wait For Detail... Stay focused! 📚⏳" />;
  }
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleTimeString("en-US", options);
  };

  let formattedDate = "Invalid date";
  if (quizData?.date) {
    formattedDate = formatDate(quizData.date);
  }

  let formattedStartTime = "Invalid time";
  if (quizData?.start_time) {
    formattedStartTime = formatTime(quizData.start_time);
  }
  let formattedEndTime = "Invalid time";
  if (quizData?.end_time) {
    formattedEndTime = formatTime(quizData.end_time);
  }

  return (
    <div className="p-4">
      <div className=" z-100 fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        {/* Popup Content */}
        <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[60%] lg:w-[40%] relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} color="black" className="cursor-pointer" />
          </button>

          {/* Content */}
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${
                  quizData?.result == null ? "bg-[#EB5757]" : "bg-[#27AE60]"
                } rounded-[5px] md:rounded-[10px] lg:rounded-[15px]`}
              />
              <h2 className=" text-[24px] md:text-[26px] lg:text-[28px] font-bold">
                {quizData?.title || "No title available"}
              </h2>
            </div>

            {/* Time */}
            <div className="flex items-center gap-3  mb-4">
              <Clock className="w-[14px] md:w-[16px] lg:w-[18px]" />
              <div className="flex flex-col">
                <span className=" text-[14px] md:text-[16px] lg:text-[18px]">
                  {formattedDate || "00/00/0000"}
                </span>
                <span className="text-gray-500 text-[12px] sm:text-[14px] lg:text-[16px]">
                  {formattedStartTime || "00:00PM"} -{" "}
                  {formattedEndTime || "00:00PM"}
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="flex items-center gap-3 mb-4">
              <Menu className="w-[14px] md:w-[16px] lg:w-[18px]" />
              <span className=" text-[14px] md:text-[16px] lg:text-[18px]">
                {quizData?.lesson || " No lesson available"}
              </span>
            </div>

            {/* Description */}
            <div className="flex gap-3 mb-6">
              <FileText className="flex-shrink-0 w-[14px] md:w-[16px] lg:w-[18px]" />
              <p className=" text-[14px] md:text-[16px] lg:text-[18px]">
                {quizData?.description || "No description available"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              {/* <button className="flex items-center gap-2 px-4 py-2 text-orange-500 rounded-md hover:bg-orange-50">
                  <img src={Pen} alt="" />
                  Edit
                </button> */}
              {/* <PrimaryBtn
                extraContent={
                  <img
                    src={Pen}
                    className="w-[14px] md:w-[16px] lg:w-[18px]"
                  ></img>
                }
                py="py-1"
                background="white"
                color="#F2994A"
              >
                Edit
              </PrimaryBtn> */}
              {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Make Quiz
                </button> */}
              {quizData?.result != null ? (
                <SecondaryBtn
                  onClick={openQuiz}
                  py="py-1"
                  borderColor="#2D9CDB"
                  color="#2D9CDB"
                >
                  Quiz Score {quizData?.result} /10
                </SecondaryBtn>
              ) : (
                <PrimaryBtn py="py-1" onClick={openQuiz}>
                  Take Quiz
                </PrimaryBtn>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
