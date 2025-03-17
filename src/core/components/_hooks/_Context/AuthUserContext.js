import { userIsLogged } from "../../../HELPERS/firebase/queries/users";
import { useState, createContext, useEffect } from "react";

export const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {

    const [useUserLoggedData, setUserLoggedData] = useState({
        isLoading: true,
        data: {}
    });

    useEffect(() => {
        userIsLogged(setUserLoggedData);
    }, []);


    return <AuthUserContext.Provider
        value={{
            useUserLoggedData
        }}
    >
        {children}

    </AuthUserContext.Provider>;
}