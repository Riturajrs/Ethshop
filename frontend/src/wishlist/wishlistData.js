import React, { useContext, useEffect, useState } from "react";
import Wishlist from "./wishlist";
import LoadingSpinner from "../Auth/UIElements/Loader";
import ErrorModal from "../Modal/ErrorModal";
import { AuthContext } from "../context/auth";
import { useHttpClient } from "../hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedItems, setLoadedItems] = useState();
  const { wishlist } = useContext(AuthContext);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/items/all"
        );
        setLoadedItems(responseData.items);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
          <LoadingSpinner />
      )}
      {!isLoading && loadedItems && <Wishlist items={loadedItems} />}
    </React.Fragment>
  );
};

export default Users;
