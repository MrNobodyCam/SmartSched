import React from "react";
import SecondaryBtn from "../components/SecondayBtn";
import arrow from "../assets/icons/majesticons_arrow-up.svg";
function Landingpage(){
  return (
    <div className=" text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-blue-600">SmartSched</h1>
        <nav className="space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Feature</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">About</a>
          <a href="#" className="text-gray-700 hover:text-blue-500">Team</a>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login</button>
        </nav>
      </header>

        {/* Welcome Section */}
        <div className="py-16 px-6 pl-16 flex items-center justify-between">

            {/* Left Text Section */}
                <div className="max-w-lg">
                    <h2 className="text-5xl text-gray-900 font-bold">Welcome to</h2>
                    <h2 className="text-5xl text-gray-900 font-bold">SmartSched 👋</h2>
                    <p className="text-gray-700 mt-3">We are introducing our smart AI that can generate your everyday study.</p>
                    <p className="text-gray-700 mt-3">It can help you improve your study and your schedule.</p>
                    <div className=" w-15 mt-6">
                        <SecondaryBtn color="" border="" >Get Started Now </SecondaryBtn> 
                    </div>
                    
                </div>
            
            {/* Right Image Section */}
            <div className="w-1/2  justify-end">
                <img className=" w-full max-w-lg object-contain" src="src/assets/images/Landing-page.png" alt="Landing Page" />
            </div>
        </div>

        {/* Features Section */}
      <section className="py-16 bg-white text-center">
        <h3 className="text-2xl font-semibold">Our Key Features</h3>
        <div className="mt-6 flex justify-center space-x-6">
          <div className="w-64 p-6 bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto"></div>
            <h4 className="mt-4 text-lg font-semibold">Feature One</h4>
            <p className="text-gray-600 text-sm">Description of the feature goes here.</p>
          </div>

          <div className="w-64 p-6 bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-green-600 rounded-full mx-auto"></div>
            <h4 className="mt-4 text-lg font-semibold">Feature Two</h4>
            <p className="text-gray-600 text-sm">Another feature description.</p>
          </div>

          <div className="w-64 p-6 bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-orange-600 rounded-full mx-auto"></div>
            <h4 className="mt-4 text-lg font-semibold">Feature Three</h4>
            <p className="text-gray-600 text-sm">This is another feature explanation.</p>
          </div>

          <div className="w-64 p-6 bg-gray-100 rounded-lg">
            <div className="w-8 h-8 bg-red-600 rounded-full mx-auto"></div>
            <h4 className="mt-4 text-lg font-semibold">Feature Three</h4>
            <p className="text-gray-600 text-sm">This is another feature explanation.</p>
          </div>
        </div>
      </section>




    </div>
  )}
  
  export default Landingpage;