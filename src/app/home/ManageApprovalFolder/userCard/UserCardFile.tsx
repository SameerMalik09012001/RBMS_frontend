import React from "react";

const UserCard = ({
  username,
  role,
  currentSalary,
  updatedSalary,
  onAccept,
  onReject,
  setCurrentBox,
  id,
  
}) => {

  return (
    <div className="max-w-md min-w-[700px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 m-8 p-6">
      <div className="mb-4">
        <h1 className="mb-7 text-2xl">Update Salary Request</h1>
        <h2 className=" text-gray-600">
          <strong>User: </strong>
          {username}
        </h2>
        <p className="text-gray-600">
          <strong>Role:</strong> {role}
        </p>
        <p className="text-gray-600">
          <strong>Current Salary:</strong> {currentSalary}
        </p>
        <p className="text-gray-600">
          <strong>Updated Salary:</strong> {updatedSalary}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={()=>{setCurrentBox({currentSalary: currentSalary, updatedSalary:updatedSalary, id:id});onAccept()}}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Accept
        </button>
        <button
          onClick={()=>{setCurrentBox({currentSalary: currentSalary, updatedSalary:updatedSalary, id:id});onReject()}}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default UserCard;
