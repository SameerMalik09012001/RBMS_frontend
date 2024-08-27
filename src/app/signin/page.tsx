"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import UserContext from "../contextAPI/userContextAPi";
import ErrorModal from "../ErrorModal/ErrorModal";
import SuccessModal from "../ErrorModal/SuccessModal";
import { createLoginAPIThunk } from "../../lib/store/thunk/loginActionCreatorThunk";
import { resetLogoutState } from "../../lib/store/thunk/LogoutActionCreatorThunk";
import { createCookieCheckAPIThunk } from "../../lib/store/thunk/cookieCheckActionCreatorThunk";

const Signin = () => {
  console.log('signin component chala <<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>');
  const route = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [isErrorModalOpen, SetIsErrorModalOpen] = useState({status:false, msg:''});
  const [isSuccessModalOpen, SetIsSuccessModalOpen] = useState({status:false, msg:''});


  const LOGIN_REQUEST = "LOGIN_REQUEST";
  const LOGIN_SUCCESS = "LOGIN_SUCCESS";
  const LOGIN_FAILURE = "LOGIN_FAILURE";
  const CHECK_COOKIE_REQUEST = "CHECK_COOKIE_REQUEST";
  const CHECK_COOKIE_SUCCESS = "CHECK_COOKIE_SUCCESS";
  const CHECK_COOKIE_FAILURE = "CHECK_COOKIE_FAILURE";

  // Accessing state from loginApiReducer
  const loginState = useSelector((state) => state.loginApiReducer);
  const {
    data: loginData,
    loading: loginLoading,
    error: loginError,
  } = loginState;

  // Accessing state from cookieCheckApiReducer
  const cookieCheckState = useSelector((state) => state.cookieCheckApiReducer);
  const {
    data: cookieCheckData,
    loading: cookieCheckLoading,
    error: cookieCheckError,
  } = cookieCheckState;

  console.log(loginData, loginLoading, loginError);
  // console.log(cookieCheckData, cookieCheckLoading, cookieCheckError);

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fetchApiData = createLoginAPIThunk(
      LOGIN_REQUEST,
      LOGIN_SUCCESS,
      LOGIN_FAILURE
    );
    dispatch(fetchApiData("post", `/user/login`, { email, password }));
  };

  console.log(user);

  useEffect(() => {
    if (loginData?.user) {
      setUser(loginData?.user);
      SetIsSuccessModalOpen((prev)=>{
        return {status: true, msg:'Login Successfully'}
      })
      dispatch(resetLogoutState())
      route.push("/home");
    }
    if(loginError) {
      SetIsErrorModalOpen((prev)=>{
        return {status: true, msg:loginError?.message}
      })
    }
  }, [loginData, loginError]);

  console.log(cookieCheckData?.user, loginData);

  useEffect(() => {
    if (cookieCheckData?.user) {
      route.push("/home");
    }
  }, [cookieCheckData]);

  useEffect(() => {
    const fetchApiData = createCookieCheckAPIThunk(
      CHECK_COOKIE_REQUEST,
      CHECK_COOKIE_SUCCESS,
      CHECK_COOKIE_FAILURE
    );
    dispatch(fetchApiData("get", `/user/cookieCheck`, null));
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {
        isErrorModalOpen.status &&
        <ErrorModal message={isErrorModalOpen.msg} onClose={SetIsErrorModalOpen}/>
      }
      {
        isSuccessModalOpen.status &&
        <SuccessModal message={isSuccessModalOpen.msg} onClose={SetIsSuccessModalOpen}/>
      }
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <input
            type="submit"
            disabled={loginLoading}
            value={!loginLoading ? "Sign in" : 'Logging in'}
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          />
        </form>
      </div>
    </div>
  );
};

export default Signin;
