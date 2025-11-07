import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(null);
    
    useEffect(() => {
        const authUserData = localStorage.getItem("placementUser");
        if (authUserData && authUserData !== "undefined") {
            try {
                setAuthUser(JSON.parse(authUserData));
            } catch (error) {
                console.error("Error parsing authUserData:", error);
                localStorage.removeItem("placementUser");
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </AuthContext.Provider>
    );
}