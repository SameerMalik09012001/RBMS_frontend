"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "../lib/store/store";
import { UserProvider } from "./contextAPI/userContextAPi";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <UserProvider>{children}</UserProvider>
    </Provider>
  );
};

export default StoreProvider;
