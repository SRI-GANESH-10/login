import React from "react";

const Users = () => {
  return (
    <div className="flex flex-col items-center justify-center mr-4 ml-4" >
      <div className="flex flex-row justify-between w-full">
        <h2 className="text-xl font-semibold text-gray-700">Manage Users</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
          Add User
        </button>
      </div>
      <div className="w-3/4">
        <table className="w-full mt-8">
          <thead>
            <tr className="flex justify-between w-full flex-row">
              <th className=" border-b border-gray-300">Username</th>
              <th className=" border-b border-gray-300">Useremail</th>
              <th className="border-b border-gray-300">Role</th>
              <th className=" border-b border-gray-300">Assigned On</th>
            </tr>
          </thead>
          <tbody>{/* Add table rows with user data here */}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
