import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import { SchoolProvider } from "../src/school-context";

function renderApp() {
  return render(
    <SchoolProvider>
      <App />
    </SchoolProvider>
  );
}

describe("App integration", () => {
  it("allows creating entities and grading assignments", () => {
    renderApp();

    // Add a teacher
    fireEvent.change(screen.getByLabelText(/teacher name/i), {
      target: { value: "Teacher 1" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add teacher/i }));

    // Add a student
    fireEvent.change(screen.getByLabelText(/student name/i), {
      target: { value: "Alice" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add student/i }));
    expect(screen.getByText("Alice")).toBeInTheDocument();

    // Add an assignment
    fireEvent.change(screen.getByLabelText(/new assignment/i), {
      target: { value: "Math HW" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add assignment/i }));
    expect(screen.getByText("Math HW")).toBeInTheDocument();
  });
});

