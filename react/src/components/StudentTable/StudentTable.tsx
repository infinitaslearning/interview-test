import type {
  Assignment,
  Student,
  StudentAssignment,
} from "../../school-context";

type StudentTableProps = {
  students: Student[];
  assignments: Assignment[];
  studentAssignments: StudentAssignment[];
  studentEditingId: string | null;
  updatedStudentName: string;
  onStudentEditingIdChange: (id: string | null) => void;
  onUpdatedStudentNameChange: (name: string) => void;
  onUpdateStudent: () => void;
  assigningStudentId: string | null;
  selectedAssignmentId: string | null;
  onAssigningStudentIdChange: (id: string | null) => void;
  onSelectedAssignmentIdChange: (id: string | null) => void;
  onAssignAssignment: () => void;
  onGradeAssignment: (
    studentAssignmentId: string,
    status: "pass" | "fail"
  ) => void;
};

export function StudentTable({
  students,
  assignments,
  studentAssignments,
  studentEditingId,
  updatedStudentName,
  onStudentEditingIdChange,
  onUpdatedStudentNameChange,
  onUpdateStudent,
  assigningStudentId,
  selectedAssignmentId,
  onAssigningStudentIdChange,
  onSelectedAssignmentIdChange,
  onAssignAssignment,
  onGradeAssignment,
}: StudentTableProps) {
  const assignmentsById: Record<string, Assignment> = Object.fromEntries(
    assignments.map((a) => [a.id, a])
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Assignments</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>
              <ul>
                {studentAssignments
                  .filter((sa) => sa.studentId === student.id)
                  .map((sa) => (
                    <li key={sa.id}>
                      {assignmentsById[sa.assignmentId]?.title ?? "—"} (
                      {sa.status})
                      <button
                        type="button"
                        onClick={() => onGradeAssignment(sa.id, "pass")}
                        disabled={sa.status === "pass"}
                        aria-label={`Mark ${assignmentsById[sa.assignmentId]?.title ?? "assignment"} as passed for ${student.name}`}
                      >
                        Pass
                      </button>
                      <button
                        type="button"
                        onClick={() => onGradeAssignment(sa.id, "fail")}
                        disabled={sa.status === "fail"}
                        aria-label={`Mark ${assignmentsById[sa.assignmentId]?.title ?? "assignment"} as failed for ${student.name}`}
                      >
                        Fail
                      </button>
                    </li>
                  ))}
              </ul>
              {student.id === assigningStudentId ? (
                <>
                  <select
                    value={selectedAssignmentId ?? ""}
                    onChange={(e) =>
                      onSelectedAssignmentIdChange(e.target.value || null)
                    }
                    aria-label={`Choose assignment to assign to ${student.name}`}
                  >
                    <option value="">—</option>
                    {assignments.map((assignment) => (
                      <option key={assignment.id} value={assignment.id}>
                        {assignment.title}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={onAssignAssignment}
                    disabled={!selectedAssignmentId}
                    aria-label={`Assign selected assignment to ${student.name}`}
                  >
                    Assign
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => onAssigningStudentIdChange(student.id)}
                  aria-label={`Assign an assignment to ${student.name}`}
                >
                  Assign assignment
                </button>
              )}
            </td>
            <td>
              {student.id === studentEditingId ? (
                <>
                  <input
                    type="text"
                    value={updatedStudentName}
                    onChange={(e) =>
                      onUpdatedStudentNameChange(e.target.value)
                    }
                    aria-label={`Edit name for ${student.name}`}
                  />
                  <button
                    type="button"
                    onClick={onUpdateStudent}
                    disabled={updatedStudentName.trim() === ""}
                    aria-label="Save student name"
                  >
                    Done
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => onStudentEditingIdChange(student.id)}
                  aria-label={`Update ${student.name}`}
                >
                  Update
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

