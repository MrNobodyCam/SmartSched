import React from 'react';

const UserProfileSettings = () => {
  // Simplified version for preview
  return (
    <div className="w-full h-screen flex items-start justify-start bg-green-700 p-10">
      <div className="w-full max-w-4xl h-auto p-6 bg-orange-500 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">General</h1>

        <div className="flex gap-4">
          {['account', 'password', 'session'].map(tab => (
            <button
              key={tab}
              className={`py-2 px-4 rounded-full font-bold transition ${
                tab === 'account' ? "bg-blue-500 text-white" : "bg-white text-black hover:bg-blue-500 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="w-full mb-6 flex flex-col items-start bg-white mt-4 p-6 rounded">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
            <div className="flex items-center">
              <div className="mr-4">
                <div className="w-16 h-16 rounded-full bg-gray-300 border-2 border-gray-200 flex items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="flex">
                <label className="cursor-pointer">
                  <span className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm mr-2">
                    Upload Image
                  </span>
                </label>
                <button
                  className="border border-gray-300 text-gray-600 px-4 py-2 rounded text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Prefer not to say</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Asia/Phnom Penh (GMT+07:00)</option>
                <option>Pacific/Auckland (GMT+12:00)</option>
                <option>Europe/London (GMT+00:00)</option>
                <option>America/New_York (GMT-05:00)</option>
              </select>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>

          <div className="mt-12 border-t pt-6 w-full">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Delete Account</h2>
            <p className="text-sm text-gray-600 mb-4">
              Once you delete your account and account data, there is no going back.<br />
              Please be certain.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Confirm Email"
                className="px-3 py-2 border border-gray-300 rounded-md sm:w-64"
              />
              <button
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-200"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSettings;