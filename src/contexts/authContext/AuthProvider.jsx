import React, { useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { firebase_auth } from "../../firebase/FirebaseConfig";


const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}
export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        const unsubscribe = onAuthStateChanged(firebase_auth, initializeUser);
        return unsubscribe;
    },[])
    
    async function initializeUser(user){
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }
    return(
        <AuthContext.AuthProvider value={value}>
            {!loading && children}
        </AuthContext.AuthProvider>
    )
}