import React, { useEffect, useState, useContext } from "react";
import RenderItems from "./renderItems";
import { AuthContext } from "../context/auth";
import LoadingSpinner from "../Auth/UIElements/Loader";
import ErrorModal from "../Modal/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedItems, setLoadedItems] = useState();
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/items/items",
          "POST",
          JSON.stringify({
            creator: userId,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setLoadedItems(responseData.items);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedItems && <RenderItems items={loadedItems} show={true} />}
    </React.Fragment>
  );
};

export default Users;
