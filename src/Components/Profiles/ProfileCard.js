import React from "react";

export default function ProfileCard({ profile, onOpen, onConfirm }) {
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };

  return (
    <>
      <div className="card profile-card">
        <div className="profile-card__info">
          <p>{profile.name}</p>
          <p>{profile.gender}</p>
          <p>{formatDate(profile.birthdate)}</p>
          <p>{profile.city}</p>
        </div>

        <div className="profile-changes">
          <button onClick={onOpen} className="profile-changes__edit">
            edit <i className="fas fa-pen"></i>
          </button>
          <button onClick={onConfirm} className="profile-changes__delete">
            delete <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    </>
  );
}
