import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const baseUrl = "http://localhost:5000";

  const getLoggedUser = async () => {
    const token = localStorage.getItem("token");
    const URL = baseUrl + "/user/auth";
    if (token) {
      const response = await axios.get(URL);
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    }
    setLoading(false);
  };
  useEffect(() => {
    getLoggedUser();
  }, []);

  const signAction = async (URL, userBody) => {
    try {
      const response = await axios.post(URL, userBody);
      const fetchedUser = response.data.user;
      localStorage.setItem("token", response.data.token);
      setUser(fetchedUser);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  const createUser = async (userBody) => {
    const URL = baseUrl + "/user/create";
    return signAction(URL, userBody);
  };
  const loginUser = async (userBody) => {
    const URL = baseUrl + "/user/login";
    return signAction(URL, userBody);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const compareUsersAndUpdate = (id, anotherUser) => {
    user._id === id && setUser(anotherUser);
  };
  const compareUsersAndLogout = (id) => {
    user._id === id && logout();
  };

  const value = {
    user,
    createUser,
    loginUser,
    logout,
    compareUsersAndUpdate,
    compareUsersAndLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
