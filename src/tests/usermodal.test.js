import { render, fireEvent, waitFor } from "@testing-library/react";
import AuthProvider from "../Contexts/AuthContext";
import UserProvider from "../Contexts/UserContext";
import UserModal from "../Components/Modal/UserModal";
import axios from "axios";

describe("User Modal", () => {
  test("Show alert if error", async () => {
    const userToEdit = {
      _id: "1",
    };
    axios.put = jest.fn(() =>
      Promise.reject({
        response: {
          data: { message: "Error" },
        },
      })
    );
    const screen = render(
      <AuthProvider>
        <UserProvider>
          <UserModal userToEdit={userToEdit} />
        </UserProvider>
      </AuthProvider>
    );
    const input = screen.getByText("role:");
    fireEvent.submit(input);
    await waitFor(() => screen.getByText("Error"));
  });
});
