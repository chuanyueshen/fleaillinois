import React, { useState, useContext, createContext, useEffect } from "react"
import { auth } from './firebase'
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'

const AuthContext = createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setIsLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    function registerUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function loginUser(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logoutUser() {
        return signOut(auth)
    }

    const value = {
        currentUser,
        registerUser,
        loginUser,
        logoutUser
    }

    return (
        <AuthContext.Provider value={ value }>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}