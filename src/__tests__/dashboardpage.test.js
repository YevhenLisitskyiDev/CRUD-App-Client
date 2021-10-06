import AuthProvider from "../Contexts/AuthContext";
import UserProvider from "../Contexts/UserContext";
import { render, waitFor } from "@testing-library/react";
import DashboardPage from "../Pages/DashboardPage/DashboardPage";
import axios from "axios";

describe("dashboard", () => {
  test("getStats run", async () => {
    const data = {
      users: 5,
      profiles: 12,
      profilesOverEighteen: 2,
    };

    axios.get = jest.fn(() =>
      Promise.resolve({
        data,
      })
    );

    const screen = render(
      <AuthProvider>
        <UserProvider>
          <DashboardPage />
        </UserProvider>
      </AuthProvider>
    );

    await waitFor(() => screen.getByText("Users"));
    screen.getByText(data.users);
    screen.getByText("Profiles");
    screen.getByText(data.profiles);
    screen.getByText("Profiles over 18 years old:");
    screen.getByText(data.profilesOverEighteen);
  });
});