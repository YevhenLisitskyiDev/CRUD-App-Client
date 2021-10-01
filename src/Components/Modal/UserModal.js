import React, { useState, useEffect } from "react";
import { useUser } from "../../Contexts/UserContext";
import { CancelButton, SubmitButton } from "../Buttons";

export default function UserModal({ userToEdit, onClose, setEditedUser }) {
  const { updateUser } = useUser();

  const [user, setUser] = useState(userToEdit);

  useEffect(() => {
    setUser(userToEdit);
  }, [userToEdit]);

  const convertToBool = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: convertToBool(e.target.value),
    }));
  };

  const InputGroup = ({ name }) => (
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(userToEdit._id, user);
    setEditedUser(user);
    onClose();
  };

  return (
    <>
      {user && (
        <form onSubmit={handleSubmit}>
          <InputGroup name="username" />
          <InputGroup name="email" />
          <div className="input-group">
            <div className="input-label">role:</div>
            <div className="radio-group">
              <RadioInput value={true} name="admin" checked={user.isAdmin} />
              <RadioInput value={false} name="user" checked={!user.isAdmin} />
            </div>
          </div>
          <div className="modal__buttons">
            <SubmitButton />
            <CancelButton onClick={onClose} />
          </div>
        </form>
      )}
    </>
  );
}
