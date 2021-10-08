import { render, waitFor, fireEvent } from "@testing-library/react";
import AuthProvider from "../Contexts/AuthContext";
import ProfilesProvider from "../Contexts/ProfilesContext";
import UserProvider from "../Contexts/UserContext";
import SingleUserPage from "../Pages/SingleUserPage/SingleUserPage";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

const renderComponent = () =>
  render(
    <AuthProvider>
      <UserProvider>
        <ProfilesProvider>
          <Router>
            <SingleUserPage />
          </Router>
        </ProfilesProvider>
      </UserProvider>
    </AuthProvider>
  );

describe("Single User Page", () => {
  beforeEach(() => {
    jest.spyOn(axios, "get").mockImplementation((url) => {
      switch (url) {
        case "http://localhost:5000/user/find/undefined":
          return Promise.resolve({
            data: {
              username: "username",
              email: "email@gmail.com",
              isAdmin: false,
              profile: [],
            },
          });
        case "http://localhost:5000/profiles/user/undefined":
          return Promise.resolve({
            data: [],
          });
        default:
          break;
      }
    });
  });
  test("Initial fetch user and profiles", async () => {
    const screen = await waitFor(renderComponent);
    screen.getByText("Profiles:");
    screen.getByText("username");
    screen.getByText("email@gmail.com");
  });
  test("Open edit modal", async () => {
    const screen = await waitFor(renderComponent);
    fireEvent.click(screen.getByTitle("edit"));
    await waitFor(() => screen.getByText("role:"));
  });
  test("Open delete modal", async () => {
    const screen = await waitFor(renderComponent);
    fireEvent.click(screen.getByTitle("delete"));
    await waitFor(() => screen.getByText("Are you sure you want to delete"));
  });
});
