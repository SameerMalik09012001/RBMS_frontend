"use client";

import { createAcceptSalaryApprovalAPIThunk } from '@/lib/store/thunk/acceptSalaryApprovalActionCreatorThunk';
import React, { useState } from 'react';


import ReactDom from "react-dom";
import { useDispatch, useSelector } from 'react-redux';

const AcceptModal: React.FC = ({ isOpen, onClose, currentBox, setCurrentBox, setSalaryAccepted }) => {
  if (!isOpen) return null;
  const dispatch = useDispatch()

  const AcceptSalaryApprovalState = useSelector((state) => state.acceptSalaryApprovalApiReducer);
  const {
    data: AcceptSalaryApprovalData,
    loading: AcceptSalaryApprovalLoading,
    error: AcceptSalaryApprovalError,
  } = AcceptSalaryApprovalState;

  const handleAcceptModel = (e)=>{
    e.preventDefault();

    const fetchApiData = createAcceptSalaryApprovalAPIThunk(
      'ACCEPT_SALARY_APPROVAL_REQUEST',
      'ACCEPT_SALARY_APPROVAL_SUCCESS',
      'ACCEPT_SALARY_APPROVAL_FAILURE'
    );
    dispatch(fetchApiData("post", `/salary-things/approveSalary`, {currentSalary:currentBox?.currentSalary, updatedSalary: currentBox?.updatedSalary, id:currentBox?.id}));
    setTimeout(()=>{
      setSalaryAccepted()
    }, 1000)
    setCurrentBox({})
    onClose()
  }

  console.log(currentBox);
  console.log(AcceptSalaryApprovalData);

  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={()=>{setCurrentBox({});onClose()}}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6">Accept Salary Update</h2>
        <form className="space-y-6" onSubmit={handleAcceptModel} >
          <input
            type="submit"
            value={"Accept"}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 text-lg"
          />
        </form>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default AcceptModal;
