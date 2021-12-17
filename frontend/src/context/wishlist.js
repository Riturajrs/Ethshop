import React, { createContext } from "react";

export const WishContext = createContext({
  wishlist: [],
  addwishlist: () => {},
  removewishlist: () => {},
});
