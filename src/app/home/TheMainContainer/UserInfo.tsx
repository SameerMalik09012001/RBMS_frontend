import React, { useContext, useEffect } from "react";
import { HomePageProps } from "../page";
import { useDispatch, useSelector } from "react-redux";
// import { createApiThunk } from "@/lib/store/thunk/actionCreator";
import { useRouter } from "next/navigation";
import UserContext from "@/app/contextAPI/userContextAPi";

const Info = ({ UserData }: { UserData: HomePageProps }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <main className="flex-1 p-6">
      { user?.length > 0  && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold">User Info</h1>
          <p className="mt-2">
            <strong>Username:</strong>{" "}
            {user?.length > 0
              ? user[0].firstName + " " + user[0].lastName
              : null}
          </p>
          <p className="mt-2">
            <strong>Email:</strong> {user?.length > 0 ? user[0].email : null}
          </p>
          <p className="mt-2">
            <strong>Role:</strong> {user?.length > 0 ? user[0].role : null}
          </p>
        </div>
      )}
    </main>
  );
};

export default Info;
