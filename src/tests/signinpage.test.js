import AuthProvider from "../Contexts/AuthContext";
import { render, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import CustomRouter from "../Routes/index";
import ProfilesProvider from "../Contexts/ProfilesContext";
import SignInPage from "../Pages/SignPage/SignInPage";
import SignUpPage from "../Pages/SignPage/SignUpPage";

describe("sign in", () => {
  test("Error alert", async () => {
    axios.post = jest.fn(() =>
      Promise.reject({ response: { data: { message: "User not found" } } })
    );

    const screen = render(
      <AuthProvider>
        <Router>
          <SignInPage />
        </Router>
      </AuthProvider>
    );

    const input = screen.getByText("email");
    fireEvent.submit(input);
    await waitFor(() => screen.getByText("User not found"));
  });

  test("Successful login", async () => {
    axios.post = jest.fn(() =>
      Promise.resolve({
        data: {
          user: {
            _id: "615ad9a38d19cd537943faca",
            username: "test",
            email: "test@gmail.com",
            password: "a",
            isAdmin: false,
            profiles: [],
          },
          token: "token",
        },
      })
    );
    
    axios.get = jest.fn(() =>
      Promise.resolve({
        data: [],
      })
    );
    
    const screen = render(
      <AuthProvider>
        <ProfilesProvider>
          <CustomRouter>
            <SignUpPage />
          </CustomRouter>
        </ProfilesProvider>
      </AuthProvider>
    );

    const input = screen.getByText("email");
    fireEvent.submit(input);
    await waitFor(() => screen.getByText("Home Page"));
  });
});
