import React, { useRef } from "react";
import Alert from "../Alert/Alert";

export default function Modal({ content, isOpen, onClose }) {
  const modalBackground = useRef();

  return (
    <div
      ref={modalBackground}
      onClick={(e) => e.target === modalBackground.current && onClose()}
      style={{ display: isOpen ? "flex" : "none" }}
      className="modal"
    >
      <div className="modal__content">
        {content}
      </div>
    </div>
  );
}
