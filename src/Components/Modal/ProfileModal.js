import React, { useState, useEffect } from "react";
import { useProfiles } from "../../Contexts/ProfilesContext";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { CancelButton, SubmitButton } from "../Buttons";

export default function ProfileModal({ profile, onClose }) {
  const { id } = useParams();
  const { user } = useAuth();

  const emptyProfile = {
    name: "",
    birthdate: "",
    city: "",
    gender: "male",
  };

  const [newProfile, setNewProfile] = useState(profile || emptyProfile);
  const { updateProfile, createProfile } = useProfiles();

  useEffect(() => {
    setNewProfile(profile || emptyProfile);
    // eslint-disable-next-line
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    profile
      ? await updateProfile(user._id, profile._id, newProfile)
      : await createProfile(newProfile, id || user._id);
    setNewProfile(emptyProfile);
    onClose();
  };

  const handleChange = (e) => {
    setNewProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const InputGroup = ({ name, type }) => (
    <div className="input-group">
      <div className="input-label">{name}:</div>
      <input
        name={name}
        type={type}
        value={newProfile?.[name]}
        onChange={handleChange}
      />
    </div>
  );
  const RadioInput = ({ value }) => (
    <>
      <input
        type="radio"
        name="gender"
        value={value}
        onChange={handleChange}
        checked={newProfile.gender === value}
      />
      <p>{value}</p>
    </>
  );

  return (
    <>
      <form className="profile-modal__form" onSubmit={handleSubmit}>
        <InputGroup name="name" type="text" />
        <div className="input-group">
          <div className="input-label">gender:</div>
          <div className="radio-group">
            <RadioInput value="male" />
            <RadioInput value="female" />
          </div>
        </div>
        <InputGroup name="birthdate" type="date" />
        <InputGroup name="city" type="text" />
        <div className="modal__buttons">
          <SubmitButton />
          <CancelButton onClick={onClose} />
        </div>
      </form>
    </>
  );
}
