import { useState, useCallback } from "react";

export const useAuth = () => {
  const [userId, setUserId] = useState(localStorage.getItem("userData"));
  const [isLoggedIn, setIsLoggedIn] = useState(userId ? true : false);
  const [item, SetItem] = useState([]);
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
      })
    );
  }, []);
  const setitem = useCallback((items)=> {
    SetItem(items);
  },[login])
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  return { isLoggedIn, item, setitem, login, logout, userId };
};
export const WishListhook = () => {
  const [wishlist, setWishlist] = useState([]);
  const addwishlist = useCallback(
    ({ id }) => {
      setWishlist((prev) => {
        prev = prev.filter((item) => item !== id);
        prev.push(id);
        return prev;
      });
    },
    []
  );
  const removewishlist = useCallback(
    ({ id }) => {
      setWishlist((prev) => prev.filter((item) => item !== id));
    },
    []
  );
  const getwishlist = useCallback(
    (wishlist) => {
      setWishlist(wishlist);
    },
    [wishlist]
  );
  return { wishlist, addwishlist, removewishlist, getwishlist };
};
