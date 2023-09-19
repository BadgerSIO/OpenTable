"use client";
import { createContext, ReactNode, useState } from "react";

// Create the context
export const BookingContext = createContext({
  didBook: false,
  setDidBook: (value: boolean | ((prevState: boolean) => boolean)) => {},
});

// Create the context provider
export function BookingProvider({ children }: { children: ReactNode }) {
  const [didBook, setDidBook] = useState(false);

  return (
    <BookingContext.Provider value={{ didBook, setDidBook }}>
      {children}
    </BookingContext.Provider>
  );
}
