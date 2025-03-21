"use client";
import { createContext, useState } from "react";

const ReservedContext = createContext();

export const ReservedProvider = ({ children }) => {
  const [reservedData, setReservedData] = useState(null);

  const saveReservedData = (data) => {
    setReservedData(data);
  };
  return (
    <ReservedContext.Provider value={{ reservedData, saveReservedData }}>
      {children}
    </ReservedContext.Provider>
  );
};

export default ReservedContext;
