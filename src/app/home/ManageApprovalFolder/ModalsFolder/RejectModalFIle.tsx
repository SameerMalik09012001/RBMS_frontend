"use client";

import React, { useEffect, useState } from "react";

import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRejectSalaryAPIThunk } from "../../../../lib/store/thunk/rejectSalaryActionCreatorThunk";

const RejectModal: React.FC = ({
  isOpen,
  onClose,
  setCurrentBox,
  currentBox,
  setSalaryAccepted,
}) => {
  if (!isOpen) return null;
  const [reason, setReason] = useState("");
  const dispatch = useDispatch();

  const RejectSalaryState = useSelector(
    (state) => state.rejectSalaryApiReducer
  );
  const {
    data: RejectSalaryData,
    loading: RejectSalaryLoading,
    error: RejectSalaryError,
  } = RejectSalaryState;

  const handleAddModel = (e) => {
    e.preventDefault();

    const fetchApiData = createRejectSalaryAPIThunk(
      "REJECT_SALARY_REQUEST",
      "REJECT_SALARY_SUCCESS",
      "REJECT_SALARY_FAILURE"
    );
    dispatch(
      fetchApiData("delete", `/salary-things/rejectSalary`, {
        currentSalary: currentBox?.currentSalary,
        updatedSalary: currentBox?.updatedSalary,
        id: currentBox?.id,
      })
    );

    setTimeout(() => {
      setSalaryAccepted();
    }, 1000);

    setCurrentBox({});
    onClose();
  };

  console.log(currentBox);

  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => onClose()}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6">Rejection Reason Form</h2>
        <form className="space-y-6" onSubmit={handleAddModel}>
          <div>
            <label
              htmlFor="employee-id"
              className="block text-lg font-medium text-gray-700"
            >
              Rejection Reason
            </label>
            <input
              id="employee-id"
              type="text"
              required
              onChange={(e) => setReason(e.target.value)}
              name="id"
              className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg "
            />
          </div>

          <input
            type="submit"
            value={"Reject"}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 text-lg"
          />
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default RejectModal;
