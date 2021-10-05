import React, { useState, useContext } from "react";
import axios from "axios";

const ProfilesContext = React.createContext();

export function useProfiles() {
  return useContext(ProfilesContext);
}

export default function ProfilesProvider({ children }) {
  const [profiles, setProfiles] = useState([]);

  const baseUrl = process.env.SERVER_BASE_URL || "http://localhost:5000";

  const handleError = async (callback) => {
    try {
      await callback();
      return { message: "OK" };
    } catch (error) {
      return { error: error.response.data.message };
    }
  };

  const getUserProfiles = async (userId) => {
    return await handleError(async () => {
      const URL = baseUrl + `/profiles/user/${userId}`;
      const response = await axios.get(URL);
      setProfiles(response.data);
    });
  };

  const getAllProfiles = async () => {
    return await handleError(async () => {
      const URL = baseUrl + "/profiles/all";
      const response = await axios.get(URL);
      setProfiles(response.data);
    });
  };

  const deleteProfile = async (userId, id) => {
    return await handleError(async () => {
      const URL = baseUrl + `/profiles/delete/${userId}/${id}`;
      await axios.delete(URL);
      setProfiles((prev) => prev.filter((profile) => profile._id !== id));
    });
  };

  const updateProfile = async (userId, id, profile) => {
    return await handleError(async () => {
      const URL = baseUrl + `/profiles/update/${userId}/${id}`;
      await axios.put(URL, profile);
      setProfiles((prev) =>
        prev.map((old) => (old._id === id ? profile : old))
      );
    });
  };

  const createProfile = async (profile, userId) => {
    return await handleError(async () => {
      const URL = baseUrl + `/profiles/create/${userId}`;
      const response = await axios.post(URL, profile);
      const createdProfile = response.data.profile;
      setProfiles((prev) => [...prev, createdProfile]);
    });
  };

  const value = {
    profiles,
    getUserProfiles,
    getAllProfiles,
    deleteProfile,
    updateProfile,
    createProfile,
  };

  return (
    <ProfilesContext.Provider value={value}>
      {children}
    </ProfilesContext.Provider>
  );
}
