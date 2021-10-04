import React, { useState, useEffect } from "react";
import { useUser } from "../../Contexts/UserContext";
import Alert from "../Alert/Alert";
import { CancelButton, SubmitButton } from "../Buttons";

export default function UserModal({ userToEdit, onClose, setEditedUser }) {
  const { updateUser } = useUser();

  const [user, setUser] = useState(userToEdit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setUser(userToEdit);
  }, [userToEdit]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await updateUser(userToEdit._id, user);
    if (response.error) setError(response.error);
    else {
      setEditedUser(user);
      onClose();
    }
    setLoading(false);
  };
  
  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "isAdmin") value = convertToBool(value);
    setUser((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  function convertToBool(value){
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  const InputGroup = (name) => (
    <div className="input-group">
      <div className="input-label">{name}:</div>
      <input
        name={name}
        type="text"
        value={user[name]}
        onChange={handleChange}
      />
    </div>
  );

  const RadioInput = ({ value, name, checked }) => (
    <div>
      <input
        type="radio"
        name="isAdmin"
        value={value}
        onChange={handleChange}
        checked={checked}
      />
      <p>{name}</p>
    </div>
  );

  return (
    <>
      {user && (
        <form onSubmit={handleSubmit}>
          <Alert message={error} />
          {InputGroup("username")}
          {InputGroup("email")}
          <div className="input-group">
            <div className="input-label">role:</div>
            <div className="radio-group">
              <RadioInput value={true} name="admin" checked={user.isAdmin} />
              <RadioInput value={false} name="user" checked={!user.isAdmin} />
            </div>
          </div>
          <div className="modal__buttons">
            <SubmitButton disabled={loading} />
            <CancelButton onClick={onClose} />
          </div>
        </form>
      )}
    </>
  );
}
