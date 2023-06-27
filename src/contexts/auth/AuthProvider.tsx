import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../interfaces/User";
import { useApi } from "../../hooks/useApi";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const api = useApi();
    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

    const setToken = (token: string) => {
        if (!token) {
            localStorage.removeItem('authToken')
        } else {
            localStorage.setItem('authToken', token);
        }
    }

    async function signin(email: string, password: string): Promise<boolean> {
        const data = await api.signin(email, password);
        if (data && data.authentication.sessionToken) {
            localStorage.setItem('user', JSON.stringify(data));
            setUser(data);
            setToken(data.authentication.sessionToken);
            return true;
        }
        return false;
    }

    async function signout() {
        setToken('');
        localStorage.removeItem('user');
    }

    useEffect(() => {
        const validateToken = async () => {
            const authToken = localStorage.getItem('authToken') as string;
            const data = await api.validateToken(authToken);
            if (data) {
                setUser(data);
                setToken(data.authentication.sessionToken);
            }
        }
        validateToken();
    }, []);

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}
