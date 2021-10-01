import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../Routes/routes";
import { useUser } from "../../Contexts/UserContext";

export default function UsersPage() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAllUsers } = useUser();

  const fetchUsers = async () => {
    const fetchedUsers = await getAllUsers();
    setUsers(fetchedUsers);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
      <h1 className="title">Users:</h1>
      {!loading && (
        <div className="users">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </>
  );
}

const UserCard = ({ user }) => {
  return (
    <Link to={`${Routes.singleUser}/${user._id}`} className="card user-card">
      <div>{user.username}</div>
      <div>{user.email}</div>
      <div>{user.profilesCount}</div>
    </Link>
  );
};
