"use client";

import { createUpdateSalaryTempAPIThunk } from "@/lib/store/thunk/UpdateSalaryActionCreatorThunk";
import React, { useEffect, useState } from "react";

import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";

const SalaryModel: React.FC = ({
  isOpen,
  onClose,
  userData,
  handleSalaryUpdate,
  SetIsSuccessModalOpen,
  SetIsErrorModalOpen,
}) => {
  if (!isOpen) return null;
  const [formData, setFormData] = useState({
    id: "",
    updatedSalary: "",
    currentSalary: userData?.salary,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData((prev) => {
      return { ...prev, id: userData?.id };
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, e.target);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const UpdateSalaryState = useSelector(
    (state) => state.updateSalaryTempApiReducer
  );
  const {
    data: UpdateSalaryData,
    loading: UpdateSalaryLoading,
    error: UpdateSalaryError,
  } = UpdateSalaryState;

  const handleAddModel = (e) => {
    e.preventDefault();

    const fetchApiData = createUpdateSalaryTempAPIThunk(
      "UPDATE_SALARY_REQUEST",
      "UPDATE_SALARY_SUCCESS",
      "UPDATE_SALARY_FAILURE"
    );
    dispatch(fetchApiData("post", `/salary-things/updateSalary`, formData));
    setTimeout(() => {
      handleSalaryUpdate();
      onClose();
    }, 1000);
  };

  useEffect(() => {
    if (UpdateSalaryData?.updateSalary) {
      console.log("chala..");
      SetIsSuccessModalOpen(true, "Salary Update Successfully");
    }
    
    if (UpdateSalaryError) {
      SetIsErrorModalOpen(true, "Unable to Update");
    }
  }, [UpdateSalaryData, UpdateSalaryError, dispatch]);

  console.log(UpdateSalaryData, UpdateSalaryError);

  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => onClose()}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6">
          Employee Update Salary Form
        </h2>
        <form className="space-y-6" onSubmit={handleAddModel}>
          <div>
            <label
              htmlFor="employee-id"
              className="block text-lg font-medium text-gray-700"
            >
              Employee ID
            </label>
            <input
              id="employee-id"
              type="text"
              disabled
              name="id"
              defaultValue={userData?.id}
              className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg "
            />
          </div>

          <div>
            <label
              htmlFor="first-name"
              className="block text-lg font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="first-name"
              type="text"
              disabled
              name="firstname"
              defaultValue={userData?.firstName + " " + userData?.lastName}
              className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg "
            />
          </div>

          <div>
            <label
              htmlFor="first-name"
              className="block text-lg font-medium text-gray-700"
            >
              Current Salary
            </label>
            <input
              id="first-name"
              type="text"
              disabled
              defaultValue={userData?.salary}
              name="currentSalary"
              className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg "
            />
          </div>

          <div>
            <label
              htmlFor="first-name"
              className="block text-lg font-medium text-gray-700"
            >
              New Salary
            </label>
            <input
              id="updatedSalary"
              type="number"
              required
              name="updatedSalary"
              onChange={handleChange}
              className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg "
            />
          </div>

          <input
            type="submit"
            value={"Submit"}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 text-lg"
          />
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default SalaryModel;
