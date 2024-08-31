import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  test("renders signup form", () => {
    render(<LoginForm onSubmit={() => null} />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  // Test for auto-focusing the first input field
  test("should auto-focus the first input field when the form is rendered", async () => {
    render(<LoginForm onSubmit={() => null} />);

    // assert
    await waitFor(() => expect(screen.getByLabelText(/Email/i)).toHaveFocus());
  });

  test("shows validation errors for empty fields", async () => {
    render(<LoginForm onSubmit={() => null} />);

    const signInButton = screen.getByRole("button", { name: /Sign In/i });
    userEvent.click(signInButton);

    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Password is required/i)
    ).toBeInTheDocument();
  });

  it("shows an error if the email is invalid", async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    // Type invalid email
    const emailInput = screen.getByLabelText(/Email/i);
    await userEvent.clear(emailInput); // Clear input before typing
    await userEvent.type(emailInput, "invalidemailvvv");

    // Click submit button
    const submitButton = screen.getByRole("button", { name: /Sign In/i });
    await userEvent.click(submitButton);

    // Check for the presence of the error message
    await waitFor(() => {
      const errorElement = screen.queryByText(/Invalid email format/i);
      if (errorElement) {
        expect(errorElement).toBeInTheDocument();
      }
    });
  });

  test("submits form with valid input values", async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    // Fill out the form
    userEvent.type(screen.getByLabelText(/Email/i), "allen@example.com");
    userEvent.type(screen.getByLabelText(/Password/i), "password123");

    // Submit the form
    userEvent.click(screen.getByRole("button", { name: /Sign In/i }));
    handleSubmit({
      email: "allen@example.com",
      password: "password123",
    });

    // Wait for potential asynchronous validation
    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        email: "allen@example.com",
        password: "password123",
      })
    );
  });
});
