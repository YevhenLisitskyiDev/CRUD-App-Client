import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const baseUrl = process.env.BASE_URL || "http://localhost:5000";

  const setToken = (token) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const getLoggedUser = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const URL = baseUrl + "/user/auth";
    if (token) {
      try {
        const response = await axios.get(URL);
        setToken(response.data.token);
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getLoggedUser();
    // eslint-disable-next-line
  }, []);

  const signAction = async (URL, userBody) => {
    try {
      const response = await axios.post(URL, userBody);
      const fetchedUser = response.data.user;
      setToken(response.data.token);
      setUser(fetchedUser);
      return { message: "OK" };
    } catch (error) {
      return { error: error.response.data.message };
    }
  };

  const createUser = async (userBody) => {
    const URL = baseUrl + "/user/create";
    return await signAction(URL, userBody);
  };

  const loginUser = async (userBody) => {
    const URL = baseUrl + "/user/login";
    return await signAction(URL, userBody);
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
