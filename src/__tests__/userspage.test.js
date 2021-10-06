import AuthProvider from "../Contexts/AuthContext";
import UserProvider from "../Contexts/UserContext";
import { render, waitFor } from "@testing-library/react";
import UsersPage from "../Pages/UsersPage/UsersPage";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";


describe("users", () => {
  test("getAllUsers run", async () => {
    const data = [
      {
        _id: "61571bbdedee3bea179b7dbc",
        username: "admin",
        email: "admin@gmail.com",
        isAdmin: true,
        profiles: [
        ],
        profilesCount: 7,
      },
      {
        _id: "61571c23edee3bea179b7dcc",
        username: "user",
        email: "user@gmail.com",
        isAdmin: false,
        profiles: [
        ],
        profilesCount: 4,
      },
    ];

    axios.get = jest.fn(() =>
      Promise.resolve({
        data,
      })
    );

    const screen = render(
      <AuthProvider>
        <UserProvider>
          <Router>
            <UsersPage />
          </Router>
        </UserProvider>
      </AuthProvider>
    );

    await waitFor(() => screen.getByText(data[0].username));
    data.forEach((user) => {
      screen.getByText(user.username);
      screen.getByText(user.email);
      screen.getByText(user.profilesCount);
    });
  });
});