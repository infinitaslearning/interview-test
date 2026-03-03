import { render, screen, fireEvent } from "@testing-library/react";
import { TeacherForm } from "../src/components/TeacherForm";

describe("TeacherForm", () => {
  const originalCrypto = globalThis.crypto;

  beforeEach(() => {
    // @ts-expect-error allow test double
    globalThis.crypto = { randomUUID: () => "teacher-id-1" };
  });

  afterEach(() => {
    globalThis.crypto = originalCrypto;
  });

  it("disables submit button when input is empty or whitespace", () => {
    render(<TeacherForm />);

    const button = screen.getByRole("button", { name: /add teacher/i });
    const input = screen.getByLabelText(/teacher name/i);

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: "   " } });
    expect(button).toBeDisabled();
  });

  it("enables submit button when input has text", () => {
    render(<TeacherForm />);

    const button = screen.getByRole("button", { name: /add teacher/i });
    const input = screen.getByLabelText(/teacher name/i);

    fireEvent.change(input, { target: { value: "Alice" } });
    expect(button).toBeEnabled();
  });

  it("clears the input after submit", () => {
    render(<TeacherForm />);

    const input = screen.getByLabelText(/teacher name/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Bob" } });
    fireEvent.submit(input.form!);

    expect(input.value).toBe("");
  });
});

