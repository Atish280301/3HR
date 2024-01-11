import React, { useState, useEffect } from 'react';
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});
export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const StoredUserLogedInInformation =  localStorage.getItem('isLogedin');
        if(StoredUserLogedInInformation === '1'){
         setIsLoggedIn(true);
        }
      }, []);

    const LogOutHandler = () => {
        localStorage.removeItem('isLogedin')
        setIsLoggedIn(false);
    }
    const LoginHandler = () => {
        localStorage.setItem('isLogedin','1');
        setIsLoggedIn(true);
    };
    return <AuthContext.Provider value = {{
        isLoggedIn: isLoggedIn,
        onLogout: LogOutHandler,
        onLogin: LoginHandler
    }}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;