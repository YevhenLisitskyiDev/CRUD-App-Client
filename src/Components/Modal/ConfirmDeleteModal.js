import React from "react";
import { useAuth } from "../../Contexts/AuthContext";

export default function ConfirmDeleteModal({ id, onClose, deleteAction }) {
  const { user } = useAuth();

  const handleDeleteClick = async () => {
    const response = await deleteAction(user._id, id);
    if (response.error) alert(response.error);
    onClose();
  };

  return (
    <div>
      <h1>Are you sure you want to delete</h1>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}
