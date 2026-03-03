import { render, screen, fireEvent } from "@testing-library/react";
import { StudentForm } from "../src/components/StudentForm";

describe("StudentForm", () => {
  const originalCrypto = globalThis.crypto;

  beforeEach(() => {
    // Ensure we have a crypto implementation for tests
    // @ts-expect-error allow test double
    globalThis.crypto = { randomUUID: () => "student-id-1" };
  });

  afterEach(() => {
    globalThis.crypto = originalCrypto;
  });

  it("disables submit button when input is empty or whitespace", () => {
    render(<StudentForm />);

    const button = screen.getByRole("button", { name: /add student/i });
    const input = screen.getByLabelText(/student name/i);

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: "   " } });
    expect(button).toBeDisabled();
  });

  it("enables submit button when input has text", () => {
    render(<StudentForm />);

    const button = screen.getByRole("button", { name: /add student/i });
    const input = screen.getByLabelText(/student name/i);

    fireEvent.change(input, { target: { value: "Alice" } });
    expect(button).toBeEnabled();
  });

  it("clears the input after submit", () => {
    render(<StudentForm />);

    const input = screen.getByLabelText(/student name/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Bob" } });
    fireEvent.submit(input.form!);

    expect(input.value).toBe("");
  });
});
