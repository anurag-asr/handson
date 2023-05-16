import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    authentication: false,
  });

  const signIn = (user) => {
    setUser({ ...user, authentication: user });
  };

  const logOut = () => {
    setUser({ authentication: false });
  };

  // console.log("authorized",user)

  return (
    <AuthContext.Provider value={{ user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
