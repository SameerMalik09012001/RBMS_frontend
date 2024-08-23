"use client";

import React, { useContext, useEffect } from "react";
import Sidebar from "./TheMainContainer/Sidebar";
import { useAppSelector } from "../../lib/store/hooks/index";
import Info from "./TheMainContainer/UserInfo";
import ManageApproval from "./ManageApprovalFolder/ManageApprovalFile";
import ManageSalary from "./ManagerSalaryFolder/ManageSalaryFile";
import ManageUsers from "./ManageUserFolder/ManageUsersFile";
import { createLogoutAPIThunk } from "@/lib/store/thunk/LogoutActionCreatorThunk";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../contextAPI/userContextAPi";
import { useRouter } from "next/navigation";
import { resetLoginState } from "@/lib/store/thunk/loginActionCreatorThunk";
import { resetCookieCheckState } from "@/lib/store/thunk/cookieCheckActionCreatorThunk";

export interface HomePageProps {
  username: string;
  email: string;
  role: string;
  reporting_manager: string;
}

const Home: React.FC = () => {
  console.log(
    "home component chala <<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>"
  );
  const activeTab = useAppSelector((state) => state.tab.activeTab);

  const UserData: HomePageProps = {
    username: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    reporting_manager: "Ramanna",
  };

  const { user, setUser } = useContext(UserContext);

  const dispatch = useDispatch();
  const route = useRouter();

  const loginState = useSelector((state) => state.logoutApiReducer);
  const {
    data: logoutData,
    loading: logoutLoading,
    error: logoutError,
  } = loginState;

  const logout = () => {
    const fetchApiData = createLogoutAPIThunk(
      LOGOUT_REQUEST,
      LOGOUT_SUCCESS,
      LOGOUT_FAILURE
    );
    dispatch(fetchApiData("get", `/user/logout`, null));
  };

  useEffect(() => {
    if (logoutData?.msg === "Logout successful") {
      // window.location.reload()
      route.push("/signin");
      dispatch(resetLoginState());
      dispatch(resetCookieCheckState());
      setUser(null);
    }
  }, [logoutData]);

  console.log(user);

  const LOGOUT_REQUEST = "LOGOUT_REQUEST";
  const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
  const LOGOUT_FAILURE = "LOGOUT_FAILURE";

  return (
    <div>
      <div className="navbar flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="navbar-brand"></div>
        <div className="logout-button">
          <button
            onClick={logout}
            className="mr-8 hover:bg-gray-600 py-2 px-4 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex">
        <Sidebar />
        {activeTab === "Home" && <Info UserData={UserData} />}
        {user?.length > 0 && user[0]?.role !== "Employee" && (
          <>
            {activeTab === "Manage Users" && <ManageUsers />}
            {activeTab === "Manage Salary" && <ManageSalary />}
            {activeTab === "Manage Approval" && <ManageApproval />}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
