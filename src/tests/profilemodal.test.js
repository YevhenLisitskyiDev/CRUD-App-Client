import axios from "axios";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AuthProvider from "../Contexts/AuthContext";
import ProfileModal from "../Components/Modal/ProfileModal";
import { BrowserRouter as Router } from "react-router-dom";
import ProfilesProvider from "../Contexts/ProfilesContext";

describe("Profile Modal", () => {
  test("Show alert if error", async () => {
    axios.post = jest.fn(() =>
      Promise.reject({
        response: {
          data: { message: "Error" },
        },
      })
    );

    const screen = render(
      <AuthProvider>
        <ProfilesProvider>
          <Router>
            <ProfileModal />
          </Router>
        </ProfilesProvider>
      </AuthProvider>
    );

    const input = screen.getByText("gender:");
    fireEvent.submit(input);
    await waitFor(() => screen.getByText("Error"));
  });
});
