import React, {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
} from "react";

export type AuthUser = {
  token: string;
};
type UserContextType = {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
};
type UserContextProviderProps = { children: React.ReactNode };

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
