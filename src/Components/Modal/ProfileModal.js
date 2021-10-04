import React, { useState, useEffect } from "react";
import { useProfiles } from "../../Contexts/ProfilesContext";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { CancelButton, SubmitButton } from "../Buttons";
import Alert from "../Alert/Alert";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setNewProfile(profile || emptyProfile);
    // eslint-disable-next-line
  }, [profile]);

  useEffect(() => {
    setError("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const response = profile
      ? await updateProfile(user._id, profile._id, newProfile)
      : await createProfile(newProfile, id || user._id);
    if (response.error) setError(response.error);
    else {
      setNewProfile(emptyProfile);
      onClose();
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setNewProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const InputGroup = (name, type) => (
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
        <Alert message={error} />
        {InputGroup("name", "text")}
        <div className="input-group">
          <div className="input-label">gender:</div>
          <div className="radio-group">
            <RadioInput value="male" />
            <RadioInput value="female" />
          </div>
        </div>
        {InputGroup("birthdate", "date")}
        {InputGroup("city", "text")}
        <div className="modal__buttons">
          <SubmitButton disabled={loading} />
          <CancelButton onClick={onClose} />
        </div>
      </form>
    </>
  );
}
