import { createContext } from "react";

export const MyContext = createContext<{ isBlackTheme: boolean }>({
  isBlackTheme: false,
});
