import React from "react";

export function SubmitButton({ disabled }) {
  return (
    <button disabled={disabled} type="submit">
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
