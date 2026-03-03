import type { Student, Teacher } from "../../school-context";

type TeacherTableProps = {
  teachers: Teacher[];
  students: Student[];
  teacherEditingId: string | null;
  newAssignedStudentId: string | null;
  onTeacherEditingIdChange: (id: string | null) => void;
  onNewAssignedStudentIdChange: (id: string | null) => void;
  onAssignStudent: () => void;
};

export function TeacherTable({
  teachers,
  students,
  teacherEditingId,
  newAssignedStudentId,
  onTeacherEditingIdChange,
  onNewAssignedStudentIdChange,
  onAssignStudent,
}: TeacherTableProps) {
  const studentById: Record<string, Student> = Object.fromEntries(
    students.map((s) => [s.id, s])
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher) => (
          <tr key={teacher.id}>
            <td>{teacher.id}</td>
            <td>{teacher.name}</td>
            <td>
              <ul>
                {teacher.students.map((studentId) => (
                  <li key={studentId}>
                    {studentById[studentId]?.name ?? "—"}
                  </li>
                ))}
              </ul>
              {teacher.id === teacherEditingId ? (
                <>
                  <select
                    value={newAssignedStudentId ?? ""}
                    onChange={(e) =>
                      onNewAssignedStudentIdChange(e.target.value || null)
                    }
                    aria-label="Choose student to assign"
                  >
                    <option value="">—</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={onAssignStudent}
                    disabled={!newAssignedStudentId}
                    aria-label="Assign selected student to this teacher"
                  >
                    Assign
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => onTeacherEditingIdChange(teacher.id)}
                  aria-label={`Assign a student to ${teacher.name}`}
                >
                  Assign student
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

