"use client";

import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../../lib/store/hooks/index";
import { setTab } from "../../../lib/store/features/tab/tabSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { isNull } from "lodash";
import UserContext from "../../contextAPI/userContextAPi";
import { createCookieCheckAPIThunk } from "../../../lib/store/thunk/cookieCheckActionCreatorThunk";

const Sidebar: React.FC = () => {
  console.log(
    "sidebar component chala <<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>"
  );
  const [activeTab, setActiveTab] = useState<
    "Home" | "Manage Users" | "Manage Salary" | "Manage Approval"
  >("Home");
  const dispatch = useAppDispatch();

  const { user, setUser } = useContext(UserContext);
  const route = useRouter();

  const CHECK_COOKIE_REQUEST = "CHECK_COOKIE_REQUEST";
  const CHECK_COOKIE_SUCCESS = "CHECK_COOKIE_SUCCESS";
  const CHECK_COOKIE_FAILURE = "CHECK_COOKIE_FAILURE";

  const handleTabSwitching = (value: string) => {
    if (value === "Home") {
      setActiveTab(value);
      dispatch(setTab(value));
    } else if (value === "Manage Users") {
      setActiveTab(value);
      dispatch(setTab(value));
    } else if (value === "Manage Salary") {
      setActiveTab(value);
      dispatch(setTab(value));
    } else if (value === "Manage Approval") {
      setActiveTab(value);
      dispatch(setTab(value));
    }
  };

  const loginState = useSelector((state) => state.loginApiReducer);
  const {
    data: loginData,
    loading: loginLoading,
    error: loginError,
  } = loginState;

  const { data, loading, error } = useSelector(
    (state) => state.cookieCheckApiReducer
  );

  useEffect(() => {
    const fetchApiData = createCookieCheckAPIThunk(
      CHECK_COOKIE_REQUEST,
      CHECK_COOKIE_SUCCESS,
      CHECK_COOKIE_FAILURE
    );
    dispatch(fetchApiData("get", `/user/cookieCheck`, null));
  }, []);
  

  useEffect(() => {
    if (data?.user) {
      setUser(data?.user);
    }

    if(error === 'Request failed with status code 401') {
      route.push('/signin')
    }
    

  }, [data, error]);

  console.log({ data, loading, error });
  console.log(user);

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4 flex-shrink-0">
      <div className="flex flex-col">
        <button
          className={`py-2 px-4 text-left ${
            activeTab === "Home" ? "bg-gray-700" : "hover:bg-gray-600"
          } rounded`}
          onClick={() => handleTabSwitching("Home")}
        >
          Home
        </button>
        {user?.length > 0 && user[0]?.role !== "Employee" && (
          <>
            <button
              className={`py-2 px-4 text-left ${
                activeTab === "Manage Users"
                  ? "bg-gray-700"
                  : "hover:bg-gray-600"
              } rounded`}
              onClick={() => handleTabSwitching("Manage Users")}
            >
              Manage Users
            </button>
            <button
              className={`py-2 px-4 text-left ${
                activeTab === "Manage Salary"
                  ? "bg-gray-700"
                  : "hover:bg-gray-600"
              } rounded mt-1`}
              onClick={() => handleTabSwitching("Manage Salary")}
            >
              Manage Salary
            </button>
            <button
              className={`py-2 px-4 text-left ${
                activeTab === "Manage Approval"
                  ? "bg-gray-700"
                  : "hover:bg-gray-600"
              } rounded mt-1`}
              onClick={() => handleTabSwitching("Manage Approval")}
            >
              Manage Approval
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
