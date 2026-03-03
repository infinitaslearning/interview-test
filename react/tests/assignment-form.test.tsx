import { render, screen, fireEvent } from "@testing-library/react";
import { AssignmentForm } from "../src/components/AssignmentForm";

describe("AssignmentForm", () => {
  const originalCrypto = globalThis.crypto;

  beforeEach(() => {
    // @ts-expect-error allow test double
    globalThis.crypto = { randomUUID: () => "assignment-id-1" };
  });

  afterEach(() => {
    globalThis.crypto = originalCrypto;
  });

  it("disables submit button when input is empty or whitespace", () => {
    render(<AssignmentForm />);

    const button = screen.getByRole("button", { name: /add assignment/i });
    const input = screen.getByLabelText(/new assignment/i);

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: "   " } });
    expect(button).toBeDisabled();
  });

  it("enables submit button when input has text", () => {
    render(<AssignmentForm />);

    const button = screen.getByRole("button", { name: /add assignment/i });
    const input = screen.getByLabelText(/new assignment/i);

    fireEvent.change(input, { target: { value: "Assignment 1" } });
    expect(button).toBeEnabled();
  });

  it("clears the input after submit", () => {
    render(<AssignmentForm />);

    const input = screen.getByLabelText(/new assignment/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Assignment 1" } });
    fireEvent.submit(input.form!);

    expect(input.value).toBe("");
  });
});

