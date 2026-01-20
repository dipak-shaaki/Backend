import { createContext, useContext, useState } from "react";
import { signIn, signUp } from "../services/auth.js";
import { useEffect } from "react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const savedUser = localStorage.getItem('user')
        if (savedUser) setUser(JSON.parse(savedUser))
    }, [])

    const login = async (userData) => {
        const data = await signIn(userData)
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
        console.log('data of the user is:', data)
        return data
    }

    const register = async (userData) => {
        const data = await signUp(userData)
        // Don't auto-login after signup, let user login manually
        console.log('User registered:', data)
        return data
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}

