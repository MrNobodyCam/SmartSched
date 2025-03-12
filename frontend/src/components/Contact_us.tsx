import React, { useState } from "react";

const FullScreenContactForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    agreedToPolicy: false,
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Form submission logic would go here
  };

  return (
    <div
      className="flex items-start justify-start w-full h-full"
      style={{ position: "absolute" }}
    >
      <div className="w-[876px] h-full rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <h1 className="text-2xl sm:text-4xl font-medium mb-1">
              Contact us
            </h1>
            <p className="text-base sm:text-lg text-gray-400 mb-6">
              Reach out and we'll get in touch within 24 hours.
            </p>
          </div>
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block text-base sm:text-lg font-bold text-black mb-1"
            >
              Title
            </label>
            <input
              type="title"
              name="title"
              id="title"
              placeholder="Enter your schedule title..."
              value={formData.title}
              onChange={handleChange}
              className="w-full h-[48px] sm:h-[60px] md:h-[78px] rounded-md border border-[#e0e0e0] bg-white py-2 sm:py-3 px-4 sm:px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md placeholder:text-base sm:placeholder:text-lg transition-all duration-200"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-3 block text-base sm:text-lg font-bold text-black"
            >
              Message
            </label>
            <textarea
              rows={4}
              name="message"
              id="message"
              placeholder="Type your message"
              value={formData.message}
              onChange={handleChange}
              className="w-full min-h-[150px] sm:min-h-[200px] md:min-h-[230px] resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md placeholder:text-base sm:placeholder:text-lg"
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
              className="text-base sm:text-lg text-gray-600 mt-2 sm:mt-0"
            >
              You agree to our friendly{" "}
              <a
                href="/privacy-policy"
                className="text-blue-500 hover:underline"
              >
                privacy policy
              </a>
              .
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-[#2D9CDB] py-3 px-8 text-base sm:text-lg font-bold text-white outline-none"
              style={{ borderRadius: "12px" }}
            >
              Sent Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FullScreenContactForm;
