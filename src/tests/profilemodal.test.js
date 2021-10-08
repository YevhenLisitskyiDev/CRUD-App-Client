import axios from "axios";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AuthProvider from "../Contexts/AuthContext";
import ProfileModal from "../Components/Modal/ProfileModal";
import { BrowserRouter as Router } from "react-router-dom";
import ProfilesProvider from "../Contexts/ProfilesContext";

const renderComponent = (onClose) =>
  render(
    <AuthProvider>
      <ProfilesProvider>
        <Router>
          <ProfileModal onClose={onClose} />
        </Router>
      </ProfilesProvider>
    </AuthProvider>
  );

describe("Profile Modal", () => {
  test("Close Modal if successful", async () => {
    axios.post = jest.fn(() =>
      Promise.resolve({
        data: {},
      })
    );
    const onClose = jest.fn(() => {});
    const screen = renderComponent(onClose);
    const input = screen.getByText("gender:");
    await waitFor(() => fireEvent.submit(input));
    expect(onClose).toHaveBeenCalled();
  });

  test("Show alert if error", async () => {
    axios.post = jest.fn(() =>
      Promise.reject({
        response: {
          data: { message: "Error" },
        },
      })
    );
    const screen = renderComponent();
    const input = screen.getByText("gender:");
    fireEvent.submit(input);
    await waitFor(() => screen.getByText("Error"));
  });
});
