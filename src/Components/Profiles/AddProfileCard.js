import React from "react";

export default function AddProfileCard({ onOpen }) {
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={onOpen}
      className="card profile-card"
    >
      <div className="add-card__plus"></div>
      <div className="add-card__title">Create new profile</div>
    </div>
  );
}
