import React, { useEffect, useState } from "react";
import PrimaryBtn from "../components/PrimaryBtn";
import { sendContactUsMessage } from "../service/api";
import { fetchGetRequestData } from "../service/api";
import Loading from "../components/Alert/Loading";
import { X } from "react-feather";

function FullScreenContactForm() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await fetchGetRequestData(`getUserEmail`, {
          id: localStorage.getItem("id"),
        });
        setEmail(response.email);
      } catch (error) {
        console.error("Error fetching contact us data:", error);
      }
    };

    fetchUserEmail();
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    agreedToPolicy: false,
  });

  const [alertMessage, setAlertMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      agreedToPolicy: e.target.checked,
    });
  };

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await sendContactUsMessage({
        title: formData.title,
        text: formData.message,
        email: email || "",
      });
      if (response && response.message === "Mail sent successfully") {
        setAlertMessage({
          type: "success",
          message: "Message sent successfully!",
        });
        setFormData({
          title: "",
          message: "",
          agreedToPolicy: false,
        });
      } else {
        setAlertMessage({
          type: "error",
          message: "Failed to send the message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error sending contact message:", error);
      setAlertMessage({
        type: "error",
        message:
          "An error occurred while sending the message. Please try again.",
      });
    } finally {
      setLoading(false);
    }

    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };
  if (loading) {
    return <Loading text="Sending Your Message... Just a moment! 🚀⏳" />;
  }
  return (
    <div className="relative w-full h-[calc(100vh-100px)] p-4 sm:p-6">
      {alertMessage && (
        <div
          className={`fixed top-16 right-4 p-4 rounded-md z-400 ${
            alertMessage.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {alertMessage.message}
          <button
            onClick={() => setAlertMessage(null)}
            className="ml-4 text-sm font-bold"
          >
            <X className="cursor-pointer"></X>
          </button>
        </div>
      )}
      <div className="w-full h-full rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <h1 className="text-[30px] md:text-[32px] lg:text-[36px] font-bold mb-1">
              Contact us
            </h1>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-400 mb-6">
              Reach out and we'll get in touch within 24 hours.
            </p>
          </div>
          <div className="mb-5">
            <label
              aria-required="true"
              htmlFor="text"
              className="block text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black mb-1"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="text"
              placeholder="Enter your title of your message..."
              value={formData.title}
              onChange={handleChange}
              className="w-full h-[48px] rounded-md border border-[#e0e0e0] bg-white py-2 sm:py-3 px-4 sm:px-6 text-[14px] md:text-[16px] lg:text-[18px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md placeholder:text-[14px] md:placeholder:text-[16px] lg:placeholder:text-[18px] transition-all duration-200"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-3 text-[20px] md:text-[22px] lg:text-[24px] font-bold text-black "
            >
              Message
            </label>
            <textarea
              rows={4}
              name="message"
              id="message"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              className="w-full min-h-[150px] sm:min-h-[200px] md:min-h-[230px] resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-[14px] md:text-[16px] lg:text-[18px] font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md placeholder:text-[14px] md:placeholder:text-[16px] lg:placeholder:text-[18px]"
              required
            />
          </div>
          <div className="mb-5 flex items-center">
            <input
              type="checkbox"
              id="policy"
              name="agreedToPolicy"
              checked={formData.agreedToPolicy}
              onChange={handleCheckboxChange}
              className="mr-2"
              style={{ width: "18px", height: "18px" }}
              required
            />
            <label
              htmlFor="policy"
              className="text-[14px] md:text-[16px] lg:text-[18px] text-gray-600 mt-2 sm:mt-0 cursor-pointer "
            >
              You agree to our friendly{" "}
              <a className="text-blue-500 hover:underline font-bold">
                privacy policy
              </a>
              .
            </label>
          </div>
          <div>
            <PrimaryBtn type="submit" py="py-1" px="px-8">
              Send Messages
            </PrimaryBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FullScreenContactForm;
