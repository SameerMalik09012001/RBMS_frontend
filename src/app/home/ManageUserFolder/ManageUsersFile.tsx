import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useFilters,
  useSortBy,
  TableState,
  HeaderGroup,
} from "react-table";
import AddModal from "./AddModelFolder/AddModelFile";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ShowTable from "./ShowTableComp";
import {debounce} from 'lodash'
import { createGetUserDataAPIThunk } from "../../../lib/store/thunk/GetUserDataActionCreatorThunk";
import { createGlobalSearchUserAPIThunk } from "../../../lib/store/thunk/GlobalSearchUserActionCreatorThunk";
import { resetAddUserState } from "../../../lib/store/thunk/addUserActionCreatorThunk";
import { createColumnFilterAPIThunk } from "../../../lib/store/thunk/GetUesrByColumnFilterActionCreatorThunk";
import ErrorModal from "../../ErrorModal/ErrorModal";
import SuccessModal from "../../ErrorModal/SuccessModal";


// employe id , first name , last name , email, contact No, Role - manager | TL | employee, gender etc
interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNo: string;
  role: string;
  gender: string;
  dob: string;
  reporting_manager: string;
}

interface Columns {
  Header: string;
  accessor: string;
  Filter: typeof ColumnFilter;
  disableFilters?: true;
}

const FilteringTable = () => {
  // const { user, setUser } = useContext(UserContext);
  const [Page, setPage] = useState(1);
  const [globalSearchPage, setGlobalSearchPage] = useState(1);
  const [columnFilterPage, setColumnFilterPage] = useState(1)
  const USERDATA_REQUEST = "USERDATA_REQUEST";
  const USERDATA_SUCCESS = "USERDATA_SUCCESS";
  const USERDATA_FAILURE = "USERDATA_FAILURE";
  const [flag, setflag] = useState(true);
  const dispatch = useDispatch();
  const [DATA, setDATA] = useState(null);

  const GLOBAL_SEARCH_USER_REQUEST = "GLOBAL_SEARCH_USER_REQUEST";
  const GLOBAL_SEARCH_USER_SUCCESS = "GLOBAL_SEARCH_USER_SUCCESS";
  const GLOBAL_SEARCH_USER_FAILURE = "GLOBAL_SEARCH_USER_FAILURE";

  const UserDataState = useSelector((state) => state.getUserDataApiReducer);
  const {
    data: UserData,
    loading: UserDataLoading,
    error: UserDataError,
  } = UserDataState;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const SearchDebounce = debounce(setSearch, 500)
  const [columnFilter, setColumnFilter] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    dob: "",
    gender: "",
    contactNo: "",
  });

  function hasNonEmptyField(obj): boolean {
    return Object.values(obj).some(value => value !== undefined && value !== '');
  }


  const list = Array.from(
    { length: UserData?.extraInfo?.totalPage },
    (_, i) => i + 1
  );

  const fetchUser = () => {
    const fetchApiData = createGetUserDataAPIThunk(
      USERDATA_REQUEST,
      USERDATA_SUCCESS,
      USERDATA_FAILURE
    );
    dispatch(fetchApiData("get", `/user-things/getAllUser/${Page}/10`, null));
    console.log("chala fetch user fn");
  };

  const globalSearchState = useSelector((state) => state.globalSearchUserApiReducer);
  const {
    data: GlobalSearchUserData,
    loading: GlobalSearchUserLoading,
    error: GlobalSearchUserError,
  } = globalSearchState;


  const columnSearchState = useSelector((state) => state.getUserByColumnFilterApiReducer);
  const {
    data: ColumnSearchUserData,
    loading: ColumnSearchUserLoading,
    error: ColumnSearchUserError,
  } = columnSearchState;
  const [isErrorModalOpen, SetIsErrorModalOpen] = useState({status:false, msg:''});
  const [isSuccessModalOpen, SetIsSuccessModalOpen] = useState({status:false, msg:''});

  const list1 = Array.from(
    { length: GlobalSearchUserData?.extraInfo?.totalPage },
    (_, i) => i + 1
  );

  const list2 = Array.from(
    { length: ColumnSearchUserData?.extraInfo?.totalPage },
    (_, i) => i + 1
  );

  useEffect(() => {
    if (UserData?.User && search === '') {
      setDATA(UserData);
    }

    if (UserDataError) {
      alert(UserDataError);
    }
  }, [UserData, search]);

  useEffect(() => {
    if (GlobalSearchUserData?.User) {
      setDATA(GlobalSearchUserData);
    }

    if (GlobalSearchUserError) {
      alert(GlobalSearchUserError);
    }
  }, [GlobalSearchUserData]);

  useEffect(() => {
    if (ColumnSearchUserData?.User) {
      console.log(ColumnSearchUserData);
      setDATA(ColumnSearchUserData);
    }

    if (ColumnSearchUserError) {
      alert(ColumnSearchUserError);
    }
  }, [ColumnSearchUserData]);

  useEffect(() => {
    if(search !== '') {
      const fetchApiData = createGlobalSearchUserAPIThunk(
        GLOBAL_SEARCH_USER_REQUEST,
        GLOBAL_SEARCH_USER_SUCCESS,
        GLOBAL_SEARCH_USER_FAILURE
      );
      dispatch(fetchApiData("get", `/user-things/getAllUserBySearch/${search}/${globalSearchPage}/10`, null));
    }
  }, [search, globalSearchPage]);

  

  useEffect(() => {
    console.log("chala fetchUser...");
    setTimeout(() => {
      fetchUser();
    }, 300);
  }, [flag, Page]);

  const changePage = (page) => {
    setPage(page);
  };

  const changeGlobalPage = (page) => {
    setGlobalSearchPage(page);
  };

  const handleAddModal = () => {
    dispatch(resetAddUserState())
    SetIsErrorModalOpen({status:false, msg:''})
    SetIsSuccessModalOpen({status:false, msg:''})
    setIsModalOpen(true);
  };

  useEffect(()=>{
    const fetchApiData = createColumnFilterAPIThunk(
      'BY_COLUMN_FILTER_REQUEST',
      'BY_COLUMN_FILTER_SUCCESS',
      'BY_COLUMN_FILTER_FAILURE'
    );
    console.log(columnFilter);
    if(search === '') {
      dispatch(fetchApiData("post", `/user-things/getByColumnFilter/null/${columnFilterPage}/10`, columnFilter));
    }  else {
      dispatch(fetchApiData("post", `/user-things/getByColumnFilter/${search}/${columnFilterPage}/10`, columnFilter));
    }
  }, [columnFilter, columnFilterPage, search])


  // console.log(UserData?.User);
  // console.log((GlobalSearchUserData?.User));
  // console.log(columnFilter);
  // console.log(ColumnSearchUserData);
  console.log(DATA);

  return (
    <div className="p-4">
      {
        isErrorModalOpen.status &&
        <ErrorModal message={isErrorModalOpen.msg} onClose={SetIsErrorModalOpen}/>
      }
      {
        isSuccessModalOpen.status &&
        <SuccessModal message={isSuccessModalOpen.msg} onClose={SetIsSuccessModalOpen}/>
      }
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">User Data Table</h1>
        <button
          onClick={() => handleAddModal()}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          +Add
        </button>
      </div>

      <input
        type="text"
        name="search"
        onChange={(e) => SearchDebounce(String(e.target.value).trim())}
        placeholder="Search Id, Name, Email etc"
        className="w-full my-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
      />

      <AddModal
        setflag={setflag}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        SetIsErrorModalOpen={SetIsErrorModalOpen}
        SetIsSuccessModalOpen={SetIsSuccessModalOpen}
      ></AddModal>

      {DATA && Array(DATA)?.length > 0 && <ShowTable DATA={DATA?.User} setColumnFilter={setColumnFilter} columnFilter={columnFilter} />}

      {hasNonEmptyField(columnFilter) === false && search.length === 0 && <div className="flex justify-center mt-4">
        {list?.map((i) => {
          return (
            <span key={i}
              onClick={() => changePage(i)}
              className={`text-blue-500 cursor-pointer mx-4 ${
                UserData?.extraInfo?.pageNo == i ? "font-bold" : ""
              }`}
            >
              {i}
            </span>
          );
        })}
      </div>}

      {hasNonEmptyField(columnFilter) === false && search.length > 0 && <div className="flex justify-center mt-4">
        {list1?.map((i) => {
          return (
            <span key={i}
              onClick={() => changeGlobalPage(i)}
              className={`text-blue-500 cursor-pointer mx-4 ${
                GlobalSearchUserData?.extraInfo?.pageNo == i ? "font-bold" : ""
              }`}
            >
              {i}
            </span>
          );
        })}
      </div>}

      {hasNonEmptyField(columnFilter) && <div className="flex justify-center mt-4">
        {list2?.map((i) => {
          return (
            <span key={i}
              onClick={() => setColumnFilterPage(i)}
              className={`text-blue-500 cursor-pointer mx-4 ${
                ColumnSearchUserData?.extraInfo?.pageNo == i ? "font-bold" : ""
              }`}
            >
              {i}
            </span>
          );
        })}
      </div>}

    </div>
  );
};

export default FilteringTable;
