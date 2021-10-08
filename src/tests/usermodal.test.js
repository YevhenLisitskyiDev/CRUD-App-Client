import { render, fireEvent, waitFor } from "@testing-library/react";
import AuthProvider from "../Contexts/AuthContext";
import UserProvider from "../Contexts/UserContext";
import UserModal from "../Components/Modal/UserModal";
import axios from "axios";

const userToEdit = {
  _id: "1",
};
const renderComponent = (onClose, setEditedUser) =>
  render(
    <AuthProvider>
      <UserProvider>
        <UserModal
          userToEdit={userToEdit}
          onClose={onClose}
          setEditedUser={setEditedUser}
        />
      </UserProvider>
    </AuthProvider>
  );

describe("User Modal", () => {
  test("Close Modal if successful", async () => {
    axios.put = jest.fn(() =>
      Promise.resolve({
        data: {},
      })
    );
    const onClose = jest.fn(() => {});
    const setEditedUser = jest.fn(() => {});
    const screen = renderComponent(onClose, setEditedUser);
    const input = screen.getByText("role:");
    await waitFor(() => fireEvent.submit(input));
    expect(onClose).toHaveBeenCalled();
    expect(setEditedUser).toHaveBeenCalled();
  });

  test("Show alert if error", async () => {
    axios.put = jest.fn(() =>
      Promise.reject({
        response: {
          data: { message: "Error" },
        },
      })
    );
    const screen = renderComponent();
    const input = screen.getByText("role:");
    fireEvent.submit(input);
    await waitFor(() => screen.getByText("Error"));
  });
});
