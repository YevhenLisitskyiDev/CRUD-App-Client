import React from "react";

export default function Alert({ message }) {
  return (
    <>
      {message && (
        <div className="alert alert-danger">
          <div className="alert__message">{message}</div>
        </div>
      )}
    </>
  );
}
