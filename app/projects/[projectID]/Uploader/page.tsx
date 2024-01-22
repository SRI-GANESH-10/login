import React from 'react';

const UploaderPage = () => {
  return (
    <div className=" mt-20 flex items-center justify-center ">
      <div className="bg-white rounded-md p-8 w-full max-w-md shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Uploader Section</h1>

        <form className="flex flex-col space-y-4">
          <label className="text-sm text-gray-600">Select File:</label>
          <input type="file" className="p-2 border border-gray-300 rounded-md focus:outline-none" />

          <button className="bg-blue-500 text-white py-2 rounded-md bg-gradient-to-r from-orange-600 to-purple-900 hover:bg-blue-600 focus:outline-none ">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploaderPage;
