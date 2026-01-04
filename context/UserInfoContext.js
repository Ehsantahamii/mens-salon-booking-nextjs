"use client";
import { createContext, useEffect, useState } from "react";

const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);

        // ✅ اگر response object است با data
        if (parsed?.data) {
          setUserData(parsed.data); // "احسان تهامی"
        }
        // ✅ اگر object با name است
        else if (parsed?.name) {
          setUserData(parsed.name);
        }
        // ✅ اگر مستقیم string است
        else if (typeof parsed === "string") {
          setUserData(parsed);
        }
      } catch (error) {
        // ✅ اگر JSON نیست، مستقیم استفاده کن
        setUserData(storedUser);
      }
    }
  }, []);

  const saveUserData = (data) => {
    // ✅ استخراج username از ساختارهای مختلف
    let username = "";

    if (typeof data === "object" && data !== null) {
      username = data.data || data.name || data.username || "";
    } else {
      username = data;
    }

    setUserData(username);
    localStorage.setItem("user", JSON.stringify(data)); // object کامل را ذخیره کن
  };

  return (
    <UserInfoContext.Provider value={{ userData, saveUserData }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContext;
