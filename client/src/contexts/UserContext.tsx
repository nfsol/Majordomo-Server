import React, {
  Dispatch,
  SetStateAction,
  createContext,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
export type AuthUser = {
  token: boolean;
};
type UserContextType = {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
};
type UserContextProviderProps = { children: React.ReactNode };

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useLocalStorage("token","false");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
