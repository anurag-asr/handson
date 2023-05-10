import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState({
        authentication:false
    });

    const signin = (user) => {
        console.log(user)
        setUser({...user,authentication:user})
    }

    const logout = () => {
        setUser({authentication:false})
    }
   
    // console.log("authorized",user)

    return (
        <AuthContext.Provider value={{user, signin, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
};

