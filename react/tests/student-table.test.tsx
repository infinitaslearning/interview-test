import { render, screen, fireEvent } from "@testing-library/react";
import { StudentTable } from "../src/components/StudentTable";
import type {
  Assignment,
  Student,
  StudentAssignment,
} from "../src/school-context";

const students: Student[] = [
  { id: "s1", name: "Alice" },
  { id: "s2", name: "Bob" },
];

const assignments: Assignment[] = [
  { id: "a1", title: "Math" },
  { id: "a2", title: "Science" },
];

const studentAssignments: StudentAssignment[] = [
  {
    id: "sa1",
    studentId: "s1",
    assignmentId: "a1",
    status: "assigned",
    date: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "sa2",
    studentId: "s1",
    assignmentId: "a2",
    status: "pass",
    date: "2024-01-01T00:00:00.000Z",
  },
];

describe("StudentTable", () => {
  it("renders students and their assignments", () => {
    render(
      <StudentTable
        students={students}
        assignments={assignments}
        studentAssignments={studentAssignments}
        studentEditingId={null}
        updatedStudentName=""
        onStudentEditingIdChange={() => {}}
        onUpdatedStudentNameChange={() => {}}
        onUpdateStudent={() => {}}
        assigningStudentId={null}
        selectedAssignmentId={null}
        onAssigningStudentIdChange={() => {}}
        onSelectedAssignmentIdChange={() => {}}
        onAssignAssignment={() => {}}
        onGradeAssignment={() => {}}
      />
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText(/Math/)).toBeInTheDocument();
    expect(screen.getByText(/Science/)).toBeInTheDocument();
  });

  it("calls onGradeAssignment when clicking pass/fail", () => {
    const onGradeAssignment = vi.fn();

    render(
      <StudentTable
        students={students}
        assignments={assignments}
        studentAssignments={studentAssignments}
        studentEditingId={null}
        updatedStudentName=""
        onStudentEditingIdChange={() => {}}
        onUpdatedStudentNameChange={() => {}}
        onUpdateStudent={() => {}}
        assigningStudentId={null}
        selectedAssignmentId={null}
        onAssigningStudentIdChange={() => {}}
        onSelectedAssignmentIdChange={() => {}}
        onAssignAssignment={() => {}}
        onGradeAssignment={onGradeAssignment}
      />
    );

    const passButtons = screen.getAllByRole("button", { name: /pass/i });
    fireEvent.click(passButtons[0]);

    expect(onGradeAssignment).toHaveBeenCalledWith("sa1", "pass");
  });

  it("enters edit mode for a student and calls onUpdateStudent", () => {
    const onStudentEditingIdChange = vi.fn();
    const onUpdateStudent = vi.fn();

    const { rerender } = render(
      <StudentTable
        students={students}
        assignments={assignments}
        studentAssignments={studentAssignments}
        studentEditingId={null}
        updatedStudentName=""
        onStudentEditingIdChange={onStudentEditingIdChange}
        onUpdatedStudentNameChange={() => {}}
        onUpdateStudent={onUpdateStudent}
        assigningStudentId={null}
        selectedAssignmentId={null}
        onAssigningStudentIdChange={() => {}}
        onSelectedAssignmentIdChange={() => {}}
        onAssignAssignment={() => {}}
        onGradeAssignment={() => {}}
      />
    );

    const updateButton = screen.getByRole("button", { name: /update alice/i });
    fireEvent.click(updateButton);
    expect(onStudentEditingIdChange).toHaveBeenCalledWith("s1");

    rerender(
      <StudentTable
        students={students}
        assignments={assignments}
        studentAssignments={studentAssignments}
        studentEditingId="s1"
        updatedStudentName="Alice Updated"
        onStudentEditingIdChange={onStudentEditingIdChange}
        onUpdatedStudentNameChange={() => {}}
        onUpdateStudent={onUpdateStudent}
        assigningStudentId={null}
        selectedAssignmentId={null}
        onAssigningStudentIdChange={() => {}}
        onSelectedAssignmentIdChange={() => {}}
        onAssignAssignment={() => {}}
        onGradeAssignment={() => {}}
      />
    );

    const doneButton = screen.getByRole("button", { name: /save student name/i });
    fireEvent.click(doneButton);

    expect(onUpdateStudent).toHaveBeenCalled();
  });

  it("allows selecting assignment for a student when in assigning mode", () => {
    const onAssigningStudentIdChange = vi.fn();
    const onSelectedAssignmentIdChange = vi.fn();
    const onAssignAssignment = vi.fn();

    const { rerender } = render(
      <StudentTable
        students={students}
        assignments={assignments}
        studentAssignments={studentAssignments}
        studentEditingId={null}
        updatedStudentName=""
        onStudentEditingIdChange={() => {}}
        onUpdatedStudentNameChange={() => {}}
        onUpdateStudent={() => {}}
        assigningStudentId={null}
        selectedAssignmentId={null}
        onAssigningStudentIdChange={onAssigningStudentIdChange}
        onSelectedAssignmentIdChange={onSelectedAssignmentIdChange}
        onAssignAssignment={onAssignAssignment}
        onGradeAssignment={() => {}}
      />
    );

    const assignButton = screen.getByRole("button", {
      name: /assign an assignment to alice/i,
    });
    fireEvent.click(assignButton);
    expect(onAssigningStudentIdChange).toHaveBeenCalledWith("s1");

    rerender(
      <StudentTable
        students={students}
        assignments={assignments}
        studentAssignments={studentAssignments}
        studentEditingId={null}
        updatedStudentName=""
        onStudentEditingIdChange={() => {}}
        onUpdatedStudentNameChange={() => {}}
        onUpdateStudent={() => {}}
        assigningStudentId="s1"
        selectedAssignmentId={null}
        onAssigningStudentIdChange={onAssigningStudentIdChange}
        onSelectedAssignmentIdChange={onSelectedAssignmentIdChange}
        onAssignAssignment={onAssignAssignment}
        onGradeAssignment={() => {}}
      />
    );

    const select = screen.getByLabelText(
      /choose assignment to assign to alice/i
    );
    fireEvent.change(select, { target: { value: "a1" } });
    expect(onSelectedAssignmentIdChange).toHaveBeenCalledWith("a1");

    rerender(
      <StudentTable
        students={students}
        assignments={assignments}
        studentAssignments={studentAssignments}
        studentEditingId={null}
        updatedStudentName=""
        onStudentEditingIdChange={() => {}}
        onUpdatedStudentNameChange={() => {}}
        onUpdateStudent={() => {}}
        assigningStudentId="s1"
        selectedAssignmentId="a1"
        onAssigningStudentIdChange={onAssigningStudentIdChange}
        onSelectedAssignmentIdChange={onSelectedAssignmentIdChange}
        onAssignAssignment={onAssignAssignment}
        onGradeAssignment={() => {}}
      />
    );

    const assignConfirmButton = screen.getByRole("button", {
      name: /assign selected assignment to alice/i,
    });
    fireEvent.click(assignConfirmButton);
    expect(onAssignAssignment).toHaveBeenCalled();
  });
});

