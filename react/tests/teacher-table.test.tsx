import { render, screen, fireEvent } from "@testing-library/react";
import { TeacherTable } from "../src/components/TeacherTable";
import type { Student, Teacher } from "../src/school-context";

function createTeachers(): Teacher[] {
  return [
    { id: "t1", name: "Teacher 1", students: ["s1"] },
    { id: "t2", name: "Teacher 2", students: [] },
  ];
}

function createStudents(): Student[] {
  return [
    { id: "s1", name: "Alice" },
    { id: "s2", name: "Bob" },
  ];
}

describe("TeacherTable", () => {
  it("renders teacher rows and assigned student names", () => {
    render(
      <TeacherTable
        teachers={createTeachers()}
        students={createStudents()}
        teacherEditingId={null}
        newAssignedStudentId={null}
        onTeacherEditingIdChange={() => {}}
        onNewAssignedStudentIdChange={() => {}}
        onAssignStudent={() => {}}
      />
    );

    expect(screen.getByText("Teacher 1")).toBeInTheDocument();
    expect(screen.getByText("Teacher 2")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("shows assign select and button when a teacher is in edit mode", () => {
    const onNewAssignedStudentIdChange = vi.fn();
    const onAssignStudent = vi.fn();

    render(
      <TeacherTable
        teachers={createTeachers()}
        students={createStudents()}
        teacherEditingId="t1"
        newAssignedStudentId={null}
        onTeacherEditingIdChange={() => {}}
        onNewAssignedStudentIdChange={onNewAssignedStudentIdChange}
        onAssignStudent={onAssignStudent}
      />
    );

    const select = screen.getByLabelText(/choose student to assign/i);
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "s2" } });
    expect(onNewAssignedStudentIdChange).toHaveBeenCalledWith("s2");
  });

  it("calls onTeacherEditingIdChange when clicking 'Assign student' button", () => {
    const onTeacherEditingIdChange = vi.fn();

    render(
      <TeacherTable
        teachers={createTeachers()}
        students={createStudents()}
        teacherEditingId={null}
        newAssignedStudentId={null}
        onTeacherEditingIdChange={onTeacherEditingIdChange}
        onNewAssignedStudentIdChange={() => {}}
        onAssignStudent={() => {}}
      />
    );

    const assignButton = screen.getByRole("button", {
      name: /assign a student to teacher 1/i,
    });

    fireEvent.click(assignButton);
    expect(onTeacherEditingIdChange).toHaveBeenCalledWith("t1");
  });
});

