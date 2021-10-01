import React from "react";

export function SubmitButton() {
  return (
    <button type="submit">
      <i className="fas fa-check" />
    </button>
  );
}

export function CancelButton({ onClick }) {
  return (
    <button type="button" onClick={onClick}>
      <i className="fas fa-times" />
    </button>
  );
}
