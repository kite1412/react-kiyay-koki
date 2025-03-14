import { createContext, useContext, useState } from "react";
import { PHONE_NUMBER } from "../constants/auth";
import { userService } from "../objects";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {}  
});

export function AuthProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(PHONE_NUMBER));
  const navigate = useNavigate();

  const signIn = async (phoneNumber, otpCode) => {
    const success = await userService.signIn(phoneNumber, otpCode);
    if (success) {
      setIsAuthenticated(true);
      navigate("/", { replace: true });
      console.log("signed in");
    }
  };

  const signOut = async () => {
    const success = await userService.signOut();
    if (success) {
      setIsAuthenticated(false);
      navigate("/", { replace: true });
      console.log("signed out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        signIn: signIn,
        signOut: signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}