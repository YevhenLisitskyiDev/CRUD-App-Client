import React, { useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import signMethods from "./signMethods";
import { Routes } from "../../Routes/routes";
import Alert from "../../Components/Alert/Alert";
import { useHistory } from "react-router-dom";

export default function SignPage({ method }) {
  const history = useHistory();
  const [user, setUser] = useState({
    username: method === signMethods.UP ? "" : undefined,
    email: "",
    password: "",
    isAdmin: method === signMethods.UP ? false : undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { loginUser, createUser } = useAuth();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      method === signMethods.IN
        ? await loginUser(user)
        : await createUser(user);
      history.push(Routes.homePage);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  
  function InputGroup(name, type) {
    return (
      <div className="input-group">
        <div className="input-label">{name}</div>
        <input
          name={name}
          type={type}
          onChange={handleChange}
          value={user[name]}
        />
      </div>
    );
  }

  return (
    <div className="sign-page">
      <h1 className="sign-page__title">Sign {method}</h1>
      <form className="sign-page__form" onSubmit={handleSubmit}>
        <Alert message={error} />
        {method === signMethods.UP && InputGroup("username", "tet")}
        {InputGroup("email", "text")}
        {InputGroup("password", "password")}
        {method === signMethods.UP && (
          <div className="checkbox-group">
            <input
              type="checkbox"
              value={user.isAdmin}
              onChange={() =>
                setUser((prev) => ({ ...user, isAdmin: !prev.isAdmin }))
              }
            />
            <div>is admin</div>
          </div>
        )}
        <button disabled={loading} className="sign-page__form" type="submit">
          Sign {method}
        </button>
      </form>
    </div>
  );
}
