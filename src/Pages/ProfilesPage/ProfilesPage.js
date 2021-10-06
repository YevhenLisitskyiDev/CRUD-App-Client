import React, { useEffect } from "react";
import AllProfiles from "../../Components/Profiles/AllProfiles";
import { useProfiles } from "../../Contexts/ProfilesContext";

export default function ProfilesPage() {
  const { profiles, getAllProfiles } = useProfiles();
  
  const fetchProfiles = async () => {
    const response = await getAllProfiles();
    if (response.error) alert(response.error);
  };
  
  useEffect(() => {
    fetchProfiles();
    // eslint-disable-next-line
  }, []);

  return <AllProfiles profiles={profiles} />;
}
