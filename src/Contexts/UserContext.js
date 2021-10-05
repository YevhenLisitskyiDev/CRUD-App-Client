import React, { useContext } from "react";
import axios from "axios";
import { useAuth } from "../Contexts/AuthContext";

const UserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const { compareUsersAndUpdate, compareUsersAndLogout } = useAuth();

  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

  const handleError = async (callback) => {
    try {
      const data = await callback();
      return { data, message: "OK" };
    } catch (error) {
      return { error: error.response.data.message };
    }
  };

  const get = async (URL) => {
    return await handleError(async () => {
      const response = await axios.get(URL);      
      return response.data;
    });
  };

  const getStats = async () => {
    const URL = baseUrl + "/stats";
    return await get(URL);
  };

  const getUser = async (id) => {
    const URL = baseUrl + "/user/find/" + id;
    return await get(URL);
  };

  const getAllUsers = async () => {
    const URL = baseUrl + "/user/all";
    return await get(URL);
  };

  const updateUser = async (id, userBody) => {
    return await handleError(async () => {
      const URL = baseUrl + `/user/update/${id}`;
      const response = await axios.put(URL, userBody);
      compareUsersAndUpdate(id, response.data.user);
    });
  };

  const deleteUser = async (id) => {
    return await handleError(async () => {
      const URL = baseUrl + "/user/delete/" + id;
      const response = await axios.delete(URL);
      compareUsersAndLogout(id);
      return response;
    });
  };

  const value = {
    getStats,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
