import { useState , useCallback } from "react";

export const useAuth = () => {
  const [userId, setUserId] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const login = useCallback((uid ) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);
  return { isLoggedIn , login, logout, userId };
};
