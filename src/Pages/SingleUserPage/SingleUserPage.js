import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserModal from "../../Components/Modal/UserModal";
import ConfirmDeleteModal from "../../Components/Modal/ConfirmDeleteModal";
import Modal from "../../Components/Modal/Modal";
import AllProfiles from "../../Components/Profiles/AllProfiles";
import { useProfiles } from "../../Contexts/ProfilesContext";
import { useUser } from "../../Contexts/UserContext";
import { Routes } from "../../Routes/routes";

export default function SingleUserPage() {
  const { profiles, getUserProfiles } = useProfiles();
  const { getUser, deleteUser } = useUser();
  const { id } = useParams();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteClick = async () => {
    await deleteUser(id);
    history.push(Routes.users);
  };
  const initialFetch = async () => {
    const fetchedUser = await getUser(id);
    setUser(fetchedUser);
    await getUserProfiles(id);
    setLoading(false);
  };
  useEffect(() => {
    initialFetch();
    return () => setUser(null);
    // eslint-disable-next-line
  }, []);

  const ModalContent = (
    <UserModal
      userToEdit={user}
      onClose={() => setIsOpen(false)}
      setEditedUser={setUser}
    />
  );
  const DeleteModalContent = (
    <ConfirmDeleteModal
      id={id}
      onClose={() => setIsDeleteOpen(false)}
      deleteAction={handleDeleteClick}
    />
  );

  return (
    <>
      <Modal
        content={ModalContent}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Modal
        content={DeleteModalContent}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      />
      {!loading && (
        <div>
          <div className="user">
            <p className="user__name">{user.username}</p>
            <p className="user__email">{user.email}</p>
            <p className="user__role">{user.isAdmin ? "admin" : "user"}</p>
            <div className="user__buttons">
              <i className="fas fa-pen" onClick={() => setIsOpen(true)} />
              <i
                className="far fa-trash-alt"
                onClick={() => setIsDeleteOpen(true)}
              />
            </div>
          </div>
          <div>
            <AllProfiles profiles={profiles} userId={id} />
          </div>
        </div>
      )}
    </>
  );
}
