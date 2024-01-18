import React from 'react';

const Page = () => {
  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="bg-white rounded-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Chat Content</h1>

        <div className="bg-gray-100 p-4 rounded-md">
          {/* Display chat messages or content here */}
          <div className="text-gray-600">
            <p>User A: Hello, how are you?</p>
            <p>User B: Hi there! I'm doing well, thanks.</p>
            {/* Add more chat messages as needed */}
          </div>
        </div>

        <div className="mt-4">
          {/* Add your chat input or any additional components here */}
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            placeholder="Type your message..."
          ></textarea>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
