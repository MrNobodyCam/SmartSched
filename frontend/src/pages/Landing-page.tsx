import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import SecondaryBtn from "../components/SecondayBtn";
import arrow from "../assets/icons/majesticons_arrow-up.svg";

function Landingpage() {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown toggle
  const teamMembers = [
    {
      name: "Kao Vichet",
      position: "Backend Developer",
      imgSrc: "src/assets/images/Kao Vichet.jpg",
    },
    {
      name: "Kim Sokhom",
      position: "Frontend Developer",
      imgSrc: "src/assets/images/profile.png",
    },
    {
      name: "Kim Limkhun",
      position: "Frontend Developer",
      imgSrc: "src/assets/images/Kim Limkhun.JPG",
    },
    {
      name: "Hy Sreanghour",
      position: "Frontend Developer",
      imgSrc: "src/assets/images/profile.png",
    },
    {
      name: "Em Sereyvathna",
      position: "Frontend Developer",
      imgSrc: "src/assets/images/profile.png",
    },
    {
      name: "Kong Samnang",
      position: "Backend Developer",
      imgSrc: "src/assets/images/profile.png",
    },
  ];

  const keyFeatures = [
    {
      title: "Effortless Scheduling with AI",
      description:
        "Tell us what you want to learn and when you're free—our AI will build the perfect schedule for you!",
      bgColor: "#2D9CDB",
    },
    {
      title: "Smart Quizzes for Better Learning",
      description:
        "Reinforce your learning with subject-specific quizzes! Our system provides quizzes tailored to the topics in your schedule, helping you review and track your progress after each session.",
      bgColor: "#27AE60",
    },
    {
      title: "Stay on Track with Notifications",
      description:
        "Never miss a study session! Our system sends you timely notifications to remind you of your scheduled learning times, keeping you on track and organized.",
      bgColor: "#F2994A",
    },
    {
      title: "Schedule History & Easy Access",
      description:
        "Never lose track of your schedules! Our system automatically saves them for easy review anytime.",
      bgColor: "#EB5757",
    },
  ];

  return (
    <div id="home" className="text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md p-4 w-[100%] fixed z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-3xl sm:text-3xl font-bold text-[#2D9CDB]">
            SmartSched
          </h1>

          {/* Dropdown Toggle (Visible on Small Screens) */}
          <div className="sm:hidden relative">
            <button
              className="text-gray-700 hover:text-blue-500 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              Menu
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
              >
                <a
                  href="#home"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Home
                </a>
                <a
                  href="#feature"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Feature
                </a>
                <a
                  href="#about"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  About
                </a>
                <a
                  href="#team"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                >
                  Team
                </a>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50">
                  Login
                </button>
              </motion.div>
            )}
          </div>

          {/* Navigation (Visible on Larger Screens) */}
          <nav className="hidden sm:flex items-center space-x-6">
            <a href="#home" className="text-gray-700 hover:text-[#2D9CDB]">
              Home
            </a>
            <a href="#feature" className="text-gray-700 hover:text-[#2D9CDB]">
              Feature
            </a>
            <a href="#about" className="text-gray-700 hover:text-[#2D9CDB]">
              About
            </a>
            <a href="#team" className="text-gray-700 hover:text-[#2D9CDB]">
              Team
            </a>
            <button className="bg-[#2D9CDB] text-white px-4 py-2 rounded-md hover:bg-[#2D9CDB]">
              Login
            </button>
          </nav>
        </div>
      </header>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 px-6 sm:px-16 flex flex-col sm:flex-row items-center justify-between"
      >
        {/* Left Text Section */}
        <div className="sm:w-[50%] text-center sm:text-left space-y-8 sapce-x-8 items-center mt-5">
          <h2 className="text-3xl sm:text-5xl text-gray-900 font-bold">
            Welcome to SmartSched
          </h2>
          <p className="text-gray-700 text-[16px] mt-3 w-[380px]">
            We are introducing our smart AI that can generate your everyday
            study. It can help you improve your study and your schedule.
          </p>
          <div className="mt-6">
            <SecondaryBtn color="" border="">
              Get Started Now
            </SecondaryBtn>
          </div>
        </div>
        {/* Right Image Section */}
        <div className="w-full sm:w-[50%] mt-8 sm:mt-5 flex justify-center sm:justify-end">
          <img
            className="w-full sm:w-auto object-contain"
            src="src/assets/images/Landing-page.png"
            alt="Landing Page"
          />
        </div>
      </motion.div>
      {/* Features Section */}
      <section id="feature" className="py-16 bg-[#A5A5A5]/20 -mt-10">
        <div className="container mx-auto px-6 sm:px-20">
          {/* Section Title */}
          <h3 className="text-3xl sm:text-5xl font-semibold text-center">
            Our Key Features
          </h3>

          {/* Feature Cards */}
          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 space-y-10">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative bg-white rounded-lg shadow-md p-6 text-center w-[100%] max-w-[100%] h-[100%] mx-auto"
              >
                <div
                  className="absolute -top-[40px] left-[60px] transform -translate-x-1/2 w-[80px] h-[80px] rounded-full"
                  style={{ backgroundColor: feature.bgColor }}
                ></div>
                <h4 className="mt-12 text-lg font-semibold">{feature.title}</h4>
                <p className="text-gray-600 text-sm mt-8 ">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16"
        id="about"
      >
        <div className="container px-6 sm:px-20">
          {/* Section Title */}
          <div className="flex justify-center">
            <div className="w-full sm:w-[80%] ">
              <h3 className="text-3xl sm:text-5xl text-gray-800 font-bold text-center">
                About Us
              </h3>
              <p className="text-gray-700 mt-4 sm:mt-12 text-center ">
                Struggling to manage your study time? We’ve got you covered!
                SmartSched is an AI-powered tool that creates personalized study
                plans based on your free time, learning goals, and subject
                preferences.
              </p>
            </div>
          </div>

          {/* Content Grid */}
          <div className="mt-8 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section - Image */}
            <div className="flex justify-center lg:justify-start">
              <img
                className="w-[70%] max-w-md lg:max-w-none object-contain"
                src="src/assets/images/About-us.png"
                alt="About Us"
              />
            </div>

            {/* Right Section - Text */}
            <div className="flex flex-col justify-center text-[20px]">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
                Why Choose Us?
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 sm:space-y-4 text-[16px]">
                <li>
                  <strong>AI-Powered Study Schedules</strong> - Get the best
                  study plan tailored to your needs.
                </li>
                <li>
                  <strong>Smart Quizzes</strong> - Reinforce learning with
                  interactive assessments.
                </li>
                <li>
                  <strong>Schedule History</strong> - Never lose track of your
                  schedules!
                </li>
                <li>
                  <strong>Reminders & Alerts</strong> - Stay on track with study
                  notifications.
                </li>
              </ul>
              <p className="mt-4 sm:mt-6 text-red-500 font-semibold text-[16px]">
                Join thousands of students using Smart Study Scheduler to learn
                more efficiently!
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Team Members */}
      <section id="team" className="py-16 bg-[#A5A5A5]/20">
        <div className="container mx-auto px-6 sm:px-20">
          {/* Section Title */}
          <h3 className="text-3xl sm:text-5xl text-gray-800 font-bold text-center">
            Meet Our Team
          </h3>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-center">
            At SmartSched, we are dedicated to making learning more efficient
            with AI-powered study plans. Our developers team work together to
            create smart scheduling solutions that help students stay organized.
          </p>

          {/* Team Members Grid */}
          <div className="mt-18 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-9 justify-center">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center w-[100%] h-[250px] space-y-2"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white -mt-12">
                  <img
                    src={member.imgSrc}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
                <p className="text-gray-500">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Part */}
      <section className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 sm:px-20">
          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">SmartSched</h3>

          {/* Horizontal Line */}
          <div className="border-t border-gray-600 w-full mb-6"></div>

          {/* Main Content */}
          <div className="flex flex-col sm:flex-row justify-between space-y-8 sm:space-y-0 sm:space-x-8">
            {/* Support Section */}
            <div className="space-y-4">
              <h4 className="text-gray-400 font-bold">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    Guides & Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Vertical Line (Visible on Larger Screens) */}
            <div className="hidden sm:block border-l border-gray-600 h-40"></div>

            {/* Horizontal Line (Visible on Smaller Screens) */}
            <div className="block sm:hidden border-t border-gray-600 w-full"></div>

            {/* Stay Connected Section */}
            <div className="space-y-4">
              <h4 className="text-gray-400 font-bold">Stay Connected</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <img
                    src="src/assets/icons/Facebook - Negative.svg"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                  <a href="a" className="text-gray-400 hover:text-blue-500">
                    www.smartsched@facebook.com
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <img
                    src="src/assets/icons/Twitter - Negative.svg"
                    alt="Twitter"
                    className="w-6 h-6"
                  />
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    www.smartsched@twitter.com
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <img
                    src="src/assets/icons/google.svg"
                    alt="Google"
                    className="w-6 h-6"
                  />
                  <a href="#" className="text-gray-400 hover:text-blue-500">
                    www.smartsched@google.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Vertical Line (Visible on Larger Screens) */}
            <div className="hidden sm:block border-l border-gray-600 h-40"></div>

            {/* Horizontal Line (Visible on Smaller Screens) */}
            <div className="block sm:hidden border-t border-gray-600 w-full"></div>

            {/* Get in Touch Section */}
            <div className="space-y-4 ">
              <h4 className="text-gray-400 font-bold">Get in Touch</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">+855 77 623 512</li>
                <li className="text-gray-400">smartsched@gmail.com</li>
                <li className="text-gray-400">
                  Street 6A, Prek Leab, CADT, Phnom Penh
                </li>
              </ul>
            </div>
          </div>

          {/* Horizontal Line */}
          <div className="border-t border-gray-600 w-full my-6"></div>

          {/* Copyright */}
          <p className="text-gray-400 text-center sm:text-left">
            SmartSched @ 2025 All Rights Reserved
          </p>
        </div>
      </section>
    </div>
  );
}

export default Landingpage;
