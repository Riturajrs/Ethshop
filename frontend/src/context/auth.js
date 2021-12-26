import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  wishlist: [],
  items: [],
  login: () => {},
  logout: () => {},
  addwishlist: () => {},
  removewishlist: () => {},
  getwishlist: () => {},
  setitem: () => {},
});
