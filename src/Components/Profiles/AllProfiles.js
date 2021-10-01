import React, { useState } from "react";
import ProfileModal from "../../Components/Modal/ProfileModal";
import Modal from "../../Components/Modal/Modal";
import AddProfileCard from "../../Components/Profiles/AddProfileCard";
import ProfileCard from "../../Components/Profiles/ProfileCard";
import ConfirmDeleteModal from "../../Components/Modal/ConfirmDeleteModal";
import { useProfiles } from "../../Contexts/ProfilesContext";

export default function AllProfiles({ profiles }) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState();
  const { deleteProfile } = useProfiles();

  const onClose = (setModal) => {
    setModal(false);
    setCurrentProfile(null);
  };
  const onOpen = (setModal, profile) => {
    setModal(true);
    setCurrentProfile(profile);
  };

  profiles = profiles.map((profile) => (
    <ProfileCard
      key={profile._id}
      profile={profile}
      onOpen={() => onOpen(setIsFormModalOpen, profile)}
      onConfirm={() => onOpen(setIsDeleteModalOpen, profile)}
    />
  ));

  const FormModalContent = (
    <ProfileModal
      onClose={() => onClose(setIsFormModalOpen)}
      profile={currentProfile}
    />
  );

  const DeleteModalContent = (
    <ConfirmDeleteModal
      id={currentProfile?._id}
      onClose={() => onClose(setIsDeleteModalOpen)}
      deleteAction={deleteProfile}
    />
  );

  return (
    <>
      <Modal
        content={FormModalContent}
        isOpen={isFormModalOpen}
        onClose={() => onClose(setIsFormModalOpen)}
      />
      <Modal
        onClose={() => onClose(setIsDeleteModalOpen)}
        content={DeleteModalContent}
        isOpen={isDeleteModalOpen}
      />
      <h1 className="title">Profiles:</h1>
      <div className="profile-cards">
        {profiles}
        <AddProfileCard onOpen={() => setIsFormModalOpen(true)} />
      </div>
    </>
  );
}
