import AuthProvider from "../Contexts/AuthContext";
import { render, waitFor } from "@testing-library/react";
import ProfilesPage from "../Pages/ProfilesPage/ProfilesPage";
import axios from "axios";
import ProfilesProvider from "../Contexts/ProfilesContext";

describe("profiles", () => {
  test("getAllProfiles run", async () => {
    const data = [
      {
        _id: 1,
        name: "nameA",
        gender: "male",
        birthdate: "2002-02-02",
        city: "cityA",
      },
      {
        _id: 2,
        name: "nameB",
        gender: "male",
        birthdate: "2001-01-01",
        city: "cityB",
      },
    ];

    axios.get = jest.fn(() =>
      Promise.resolve({
        data,
      })
    );

    const formatDate = (date) => {
      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    };

    const screen = render(
      <AuthProvider>
        <ProfilesProvider>
          <ProfilesPage />
        </ProfilesProvider>
      </AuthProvider>
    );

    await waitFor(() => screen.getByText(data[0].name));
    data.forEach((user) => {
      screen.getByText(user.name);
      screen.getByText(formatDate(user.birthdate));
      screen.getByText(user.city);
    });
  });
});
