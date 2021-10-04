import React, { useState, useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import signMethods from "./signMethods";
import { Routes } from "../../Routes/routes";
import Alert from "../../Components/Alert/Alert";
import { Link, useHistory } from "react-router-dom";

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

  useEffect(() => {
    return () => setUser(null);
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response =
      method === signMethods.IN
        ? await loginUser(user)
        : await createUser(user);

    if (response.error) setError(response.error);
    else history.push(Routes.homePage);

    setLoading(false);
  };

  const InputGroup = (name, type) => {
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
        <Link
          className="sign-page__form-link"
          to={method === signMethods.IN ? Routes.signUP : Routes.signIn}
        >
          {method === signMethods.IN
            ? "Don't have an account ?"
            : "Already have an account ?"}
        </Link>
      </form>
    </div>
  );
}
