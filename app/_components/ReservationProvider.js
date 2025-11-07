"use client";

import { createContext, useContext, useState } from "react";

const Context = createContext(null);
const initState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initState);
  const resetRange = () => setRange(initState);

  return (
    <Context.Provider value={{ range, setRange, resetRange }}>
      {children}
    </Context.Provider>
  );
}

export default ReservationProvider;

export const useReservationContext = () => {
  const context = useContext(Context);
  if (context === undefined)
    throw Error("Reservation context used outside reservation provider");
  return context;
};
