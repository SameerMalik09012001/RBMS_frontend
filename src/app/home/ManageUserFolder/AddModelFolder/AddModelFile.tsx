"use client";


import React, { useContext, useEffect, useState } from "react";
import ReactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../../../contextAPI/userContextAPi";
import { createGetByRoleUserAPIThunk } from "../../../../lib/store/thunk/getByRoleUserActionCreatorThunk";
import { createAddUserAPIThunk } from "../../../../lib/store/thunk/addUserActionCreatorThunk";

const AddModal: React.FC = ({ isOpen, onClose, setflag , SetIsSuccessModalOpen, SetIsErrorModalOpen}) => {
  const [role, setRole] = useState("");
  const { user, setUser } = useContext(UserContext);
  const roles = ["Employee", "Team Leader", "Manager"];
  const rolesM = ["Employee", "Team Leader"];
  const rolesTL = ["Employee"];
  const roleMapping = {
    'Manager': "Admin",
    "Team Leader": "Manager",
    'Employee': "Team Leader",
  };
  const [reportingManagers, setReportingmanager] = useState([]);
  const [showReportingManager, setShowReportingManager] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    dob: "",
    role: "",
    reporting_manager: "",
    password: "",
    salary: "",
    email: "",
    gender: "",
    contactNo: "",
  });

  const dispatch = useDispatch();
  const getRoleUserState = useSelector(
    (state) => state.getUserByRoleApiReducer
  );
  const {
    data: getRoleUserStateData,
    loading: getRoleUserStateLoading,
    error: getRoleUserStateError,
  } = getRoleUserState;

  const getAddUserDataState = useSelector(
    (state) => state.addUserApiReducer
  );
  const {
    data: AddUserDataStateData,
    loading: AddUserDataStateLoading,
    error: AddUserDataStateError,
  } = getAddUserDataState;

  useEffect(() => {
    if (role !== "") {
      const fetchApiData = createGetByRoleUserAPIThunk(
        "GET_ROLE_BY_USER_REQUEST",
        "GET_ROLE_BY_USER_SUCCESS",
        "GET_ROLE_BY_USER_FAILURE"
      );
      dispatch(
        fetchApiData("get", `/user-things/getbyroleAddUser/${roleMapping[role]}`, null)
      );
    }
  }, [role]);

  useEffect(() => {
    if (getRoleUserStateData?.manager) {
      setReportingmanager(getRoleUserStateData?.manager);
      setFormData((prev) => ({
        ...prev,
        reporting_manager: getRoleUserStateData?.manager[0]?._id,
      }));
    }
  }, [getRoleUserStateData]);

  useEffect(() => {
    if (AddUserDataStateData?.findUser) {
      SetIsSuccessModalOpen({status: true, msg: 'User Added Successfully'})
    }

    if(AddUserDataStateError) {
      SetIsErrorModalOpen({status: true, msg: AddUserDataStateError.msg})
    }
  }, [AddUserDataStateData, AddUserDataStateError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: String(value),
    }));
  };

  console.log(formData);

  const handleAddModel = (e) => {
    e.preventDefault();
    const fetchApiData = createAddUserAPIThunk(
      "ADD_USER_REQUEST",
      "ADD_USER_SUCCESS",
      "ADD_USER_FAILURE"
    );
    dispatch(fetchApiData("post", "/user-things/addUser", formData));
    setflag((prev: boolean) => !prev);
    setFormData({
      id: "",
      firstName: "",
      lastName: "",
      dob: "",
      role: "",
      reporting_manager: "",
      password: "",
      salary: "",
      email: "",
      gender: "",
      contactNo: "",
    });
    setRole("");
    onClose();
  };

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => {
            onClose();
            setRole("");
            setShowReportingManager(false);
          }}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-6">Employee Form</h2>
        <form className="space-y-6" onSubmit={handleAddModel}>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="first-name"
                className="block text-lg font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                required
                name="firstName"
                onChange={handleChange}
                className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="last-name"
                className="block text-lg font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                name="lastName"
                onChange={handleChange}
                required
                className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="employee-id"
                className="block text-lg font-medium text-gray-700"
              >
                Employee ID
              </label>
              <input
                id="employee-id"
                type="text"
                required
                name="id"
                onChange={handleChange}
                className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="dob"
                className="block text-lg font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                required
                name="dob"
                onChange={handleChange}
                className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="salary"
                className="block text-lg font-medium text-gray-700"
              >
                Salary
              </label>
              <input
                id="salary"
                type="number"
                required
                name="salary"
                min={0}
                onChange={handleChange}
                className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg"
              />
            </div>

            <div className="flex-1">
              <span className="block text-lg font-medium text-gray-700">
                Gender
              </span>
              <div className="mt-2 flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                name="email"
                onChange={handleChange}
                className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="contactNo"
                className="block text-lg font-medium text-gray-700"
              >
                Contact No
              </label>
              <input
                id="contactNo"
                type="text"
                required
                min={10}
                max={10}
                name="contactNo"
                onChange={handleChange}
                className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-lg font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              required
              name="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                if (e.target.value !== "") {
                  setShowReportingManager(true);
                } else {
                  setShowReportingManager(false);
                  setRole("");
                }
                handleChange(e);
              }}
              className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg"
            >
              <option value="">Select a role</option>
              {user?.length > 0 && user[0]?.role === "Admin" &&
                roles?.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
                {user[0]?.role === "Manager" &&
                rolesM?.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))} 
                {user[0]?.role === "Team Leader" &&
                  rolesTL?.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
            </select>
          </div>

          {showReportingManager && (
            <div>
              <label
                htmlFor="reporting-manager"
                className="block text-lg font-medium text-gray-700"
              >
                Reporting Manager
              </label>
              <select
                id="reporting-manager"
                name="reporting_manager"
                required
                disabled={role === "Manager"}
                value={formData.reporting_manager}
                onChange={handleChange}
                className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg"
              >
                {reportingManagers?.map((manager) => (
                  <option key={manager?.id} value={manager._id}>
                    {manager?.firstName} {manager?.lastName}{" "}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              min={8}
              name="password"
              onChange={handleChange}
              className="mt-2 outline-none block w-full border-gray-300 rounded-md shadow-sm text-lg"
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

export default AddModal;
