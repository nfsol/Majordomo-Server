import { createContext, useState } from "react";

interface AuthProviderProps{
    children: React.ReactNode
  }

export const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: (loggedIn: boolean) => {},
});

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}