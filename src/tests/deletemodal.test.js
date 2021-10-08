import { render, fireEvent, waitFor } from "@testing-library/react";
import ConfirmDeleteModal from "../Components/Modal/ConfirmDeleteModal";
import AuthProvider from "../Contexts/AuthContext";

describe("Confirm Delete Modal", () => {
  test("Close modal if successful deleted", async () => {
    const deleteAction = jest.fn(() => Promise.resolve({ response: {} }));
    const onClose = jest.fn(() => {});

    const screen = render(
      <AuthProvider>
        <ConfirmDeleteModal deleteAction={deleteAction} onClose={onClose} />
      </AuthProvider>
    );

    await waitFor(() => fireEvent.click(screen.getByText("Delete")));
    expect(onClose).toHaveBeenCalled();
  });
});
