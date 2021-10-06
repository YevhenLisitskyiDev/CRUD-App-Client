import AuthProvider from "../Contexts/AuthContext";
import { render, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import SignUpPage from "../Pages/SignPage/SignUpPage";

describe("sign up", () => {
  test("Error alert", async () => {
    axios.post = jest.fn(() =>
      Promise.reject({ response: { data: { message: "User not found" } } })
    );
    const screen = render(
      <AuthProvider>
        <Router>
          <SignUpPage />
        </Router>
      </AuthProvider>
    );
    const input = screen.getByText("email");
    fireEvent.submit(input);
    await waitFor(() => screen.getByText("User not found"));
  });
});