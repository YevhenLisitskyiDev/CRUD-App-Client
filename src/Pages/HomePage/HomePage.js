import React, { useEffect, useState } from "react";
import { useProfiles } from "../../Contexts/ProfilesContext";
import AllProfiles from "../../Components/Profiles/AllProfiles";
import { useAuth } from "../../Contexts/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const { profiles, getUserProfiles } = useProfiles();

  const fetchProfiles = async () => {
    await getUserProfiles(user._id);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfiles();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className="title">Home Page</h1>
      {!loading && <AllProfiles profiles={profiles} userId={user._id} />}
    </div>
  );
}
