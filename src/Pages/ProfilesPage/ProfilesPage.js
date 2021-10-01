import React, { useEffect } from "react";
import AllProfiles from "../../Components/Profiles/AllProfiles";
import { useProfiles } from "../../Contexts/ProfilesContext";

export default function ProfilesPage() {
  const { profiles, getAllProfiles } = useProfiles();

  useEffect(() => {
    getAllProfiles();
    // eslint-disable-next-line
  }, []);

  return <AllProfiles profiles={profiles} />;
}
