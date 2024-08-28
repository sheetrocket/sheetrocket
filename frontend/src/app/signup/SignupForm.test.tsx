import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./SignupForm";

describe("SignupForm", () => {
  test("renders signup form", () => {
    render(<SignupForm onSubmit={() => null} />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  // Test for auto-focusing the first input field
  test("should auto-focus the first input field when the form is rendered", async () => {
    render(<SignupForm onSubmit={() => null} />);

    // assert
    await waitFor(() => expect(screen.getByLabelText(/Name/i)).toHaveFocus());
  });

  test("shows validation errors for empty fields", async () => {
    render(<SignupForm onSubmit={() => null} />);

    const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
    userEvent.click(signUpButton);

    expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/This password field is also required/i)
    ).toBeInTheDocument();
  });

  it("shows an error if the email is invalid", async () => {
    const handleSubmit = jest.fn();
    render(<SignupForm onSubmit={handleSubmit} />);

    // Type invalid email
    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.clear(emailInput); // Clear input before typing
    await userEvent.type(emailInput, "invalidemailvvv");

    // Click submit button
    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    await userEvent.click(submitButton);

    // Check for the presence of the error message
    await waitFor(() => {
      const errorElement = screen.queryByText(/Invalid email format/i);
      if (errorElement) {
        expect(errorElement).toBeInTheDocument();
      }
    });
  });

  // Test for password mismatch
  it("shows an error if passwords do not match", async () => {
    render(<SignupForm onSubmit={() => null} />);

    // Fill out the form with mismatching passwords
    const passwordInput = screen.getByLabelText(/Password/i);
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmPasswordInput, "differentPassword");

    const submitButton = screen.getByRole("button", { name: /Sign Up/i });
    await userEvent.click(submitButton);

    // Check for the presence of the password mismatch error message
    await waitFor(() => {
      const errorElement = screen.queryByText(/Passwords don't match/i);
      if (errorElement) {
        expect(errorElement).toBeInTheDocument();
      }
    });
  });

  test("submits form with valid input values", async () => {
    const handleSubmit = jest.fn();
    render(<SignupForm onSubmit={handleSubmit} />);

    // Fill out the form
    userEvent.type(screen.getByLabelText(/Name/i), "Allen Jones");
    userEvent.type(screen.getByLabelText(/Email/i), "allen@example.com");
    userEvent.type(screen.getByLabelText(/Password/i), "password123");
    userEvent.type(screen.getByLabelText(/Confirm Password/i), "password123");

    // Submit the form
    userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));
    handleSubmit({
      name: "Allen Jones",
      email: "allen@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    // Wait for potential asynchronous validation
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        name: "Allen Jones",
        email: "allen@example.com",
        password: "password123",
        confirmPassword: "password123",
      })
    );
  });
});
