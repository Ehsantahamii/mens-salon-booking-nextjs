"use client";
import { createContext, useEffect, useState } from "react";

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);
  const saveUserData = (data) => {
    setUserData(data);
  };
  return (
    <UserInfoContext.Provider value={{ userData, saveUserData }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContext;
