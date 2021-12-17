import React, { useState, useCallback } from "react";

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
    [wishlist]
  );
  const removewishlist = useCallback(
    ({ id }) => {
      setWishlist((prev) => prev.filter((item) => item !== id));
    },
    [wishlist]
  );
  return { wishlist, addwishlist, removewishlist };
};
