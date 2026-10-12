import { createContext, useEffect, useState } from "react";
import { baseurl } from "../services/BaseUrl";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const accessToken = localStorage.getItem('access_token')

    const logout = () => {
        localStorage.removeItem('access_token')
        setAuthUser(null)
    }

    const fetchUser = async () => {
        const userRes = await fetch(`${baseurl}/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        if (userRes.status === 401 || !userRes.ok) {
            logout();
            return;
        }

        const userData = await userRes.json();

        setAuthUser(userData);
        setLoading(false);
    };

    useEffect(() => {
        if (!accessToken) {
            setAuthUser(null);
            setLoading(false)
            return;
        }
        fetchUser();
    }, [accessToken])


    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, logout, accessToken, loading }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;