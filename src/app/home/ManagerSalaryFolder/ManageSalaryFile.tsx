import React, { useContext, useEffect, useMemo, useState } from "react";
import SalaryModel from "./updatesalaryModalFolder/SalaryModelFile";
import ShowTable from "./showTableFile";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { resetUpdateSalaryState } from "../../../lib/store/thunk/UpdateSalaryActionCreatorThunk";
import { createGetUserByRoleAPIThunk } from "../../../lib/store/thunk/GetUserByRoleSalaryActionCreatorThunk";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../ErrorModal/SuccessModal";
import UserContext from "../../contextAPI/userContextAPi";

// employe id , first name , last name , email, contact No, Role - manager | TL | employee, gender etc
interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  salary: string;
}

interface Columns {
  Header: string;
  accessor: string;
  Cell?: Function;
  disableFilters?: true;
}

const ManageSalary = () => {
  const [DATA, setDATA] = useState([]);
  const [Page, setPage] = useState(1);
  const [salaryUpdated, setSalaryUpdated] = useState(false);
  const [isErrorModalOpen, SetIsErrorModalOpen] = useState({
    status: false,
    msg: "",
  });
  const [isSuccessModalOpen, SetIsSuccessModalOpen] = useState({
    status: false,
    msg: "",
  });
  const [editCell, setEditCell] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roleForAdmin = ["Manager", "Team Leader", "Employee"];
  const roleForManager = ["Team Leader", "Employee"];
  const roleForTeamLeader = ["Employee"];
  const { user, setUser } = useContext(UserContext);
  const [roleFilterValue, setRoleFilterValue] = useState("");
  const [globalSearchForSalary, setGlobalSearchForSalary] = useState("");
  const globalSearchDebounce = debounce(setGlobalSearchForSalary, 300);

  const UserByRoleSalaryState = useSelector(
    (state) => state.getUserByRoleSalaryApiReducer
  );
  const {
    data: UserDataRoleSalaryData,
    loading: UserDataRoleSalaryLoading,
    error: UserDataRoleSalaryError,
  } = UserByRoleSalaryState;

  const dispatch = useDispatch();

  const handleSalaryChange = (cell) => {
    dispatch(resetUpdateSalaryState())
    setEditCell(cell.row.original);
    setIsModalOpen(true);
  };

  const handleSalaryUpdate = () => {
    setSalaryUpdated((prev) => !prev);
  };

  const RoleList = Array.from(
    { length: UserDataRoleSalaryData?.manager?.extraInfo?.totalPage },
    (_, i) => i + 1
  );

  useEffect(() => {
    const fetchApiData = createGetUserByRoleAPIThunk(
      "GET_USER_BY_ROLE_REQUEST",
      "GET_USER_BY_ROLE_SUCCESS",
      "GET_USER_BY_ROLE_FAILURE"
    );
    setTimeout(() => {
      dispatch(
        fetchApiData(
          "get",
          `salary-things/getUserSalaryByRoleSearchDefault/${
            roleFilterValue.length > 0 ? roleFilterValue : "No"
          }/${
            globalSearchForSalary.length > 0 ? globalSearchForSalary : "No"
          }/${Page}/10`,
          null
        )
      );
    }, 300);
}, [roleFilterValue, globalSearchForSalary, Page, salaryUpdated]);

  const onChangeIsSuccessModelOpen = (status, msg) => {
    SetIsSuccessModalOpen({ status, msg });
  };

  const onChangeIsErrorModelOpen = (status, msg) => {
    SetIsErrorModalOpen({ status, msg });
  };

  useEffect(() => {
    if (UserDataRoleSalaryData?.manager) {
      console.log(UserDataRoleSalaryData?.manager?.User);
      setDATA(UserDataRoleSalaryData?.manager?.User);
    }

    if (UserDataRoleSalaryError) {
      SetIsErrorModalOpen({ status: true, msg: UserDataRoleSalaryError });
    }
  }, [UserDataRoleSalaryData, Page]);

  console.log(isSuccessModalOpen);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Salary Table</h1>
      {isErrorModalOpen.status && (
        <ErrorModal
          message={isErrorModalOpen.msg}
          onClose={SetIsErrorModalOpen}
        />
      )}
      {isSuccessModalOpen.status && (
        <SuccessModal
          message={isSuccessModalOpen.msg}
          onClose={SetIsSuccessModalOpen}
        />
      )}
      <input
        type="text"
        name="search"
        onChange={(e) => globalSearchDebounce(e.target.value)}
        placeholder="Search Id, Name, Email etc"
        className="w-full my-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
      />

      <select
        onChange={(e) => setRoleFilterValue(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm outline-none my-4"
      >
        <option defaultChecked value="" className="text-gray-500">
          No Role Selected
        </option>
        {user?.length > 0 && user[0]?.role &&
          {
            Admin: roleForAdmin,
            Manager: roleForManager,
            "Team Leader": roleForTeamLeader,
          }[user[0].role]?.map((item) => (
            <option value={item} key={item} className="text-gray-900">
              {item}
            </option>
          ))}
      </select>

      <SalaryModel
        userData={editCell}
        handleSalaryUpdate={handleSalaryUpdate}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        SetIsErrorModalOpen={onChangeIsErrorModelOpen}
        SetIsSuccessModalOpen={onChangeIsSuccessModelOpen}
      ></SalaryModel>

      <ShowTable DATA={DATA} handleSalaryChange={handleSalaryChange} />

      {RoleList?.length !== 0 && (
        <div className="flex justify-center mt-4">
          {RoleList?.map((i) => {
            return (
              <span
                key={i}
                onClick={() => setPage(i)}
                className={`text-blue-500 cursor-pointer mx-4 ${
                  UserDataRoleSalaryData?.extraInfo?.pageNo == i
                    ? "font-bold"
                    : ""
                }`}
              >
                {i}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageSalary;
