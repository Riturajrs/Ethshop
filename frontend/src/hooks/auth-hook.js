import { useState , useCallback } from "react";

export const useAuth = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userData"));
  const [isLoggedIn,setIsLoggedIn] = useState(userId?true:false);
  const login = useCallback((uid ) => {
    setIsLoggedIn(true);
    setUserId(uid);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid
      })
    );
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  return { isLoggedIn , login, logout, userId };

};
