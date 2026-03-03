import { useState } from "react";
import {
  SchoolActionKind,
  useSchool,
  useSchoolDispatch,
} from "../school-context";
import { TeacherForm } from "../components/TeacherForm/TeacherForm";
import { StudentForm } from "../components/StudentForm/StudentForm";
import { AssignmentForm } from "../components/AssignmentForm/AssignmentForm";
import { TeacherTable } from "../components/TeacherTable/TeacherTable";
import { StudentTable } from "../components/StudentTable/StudentTable";

export function School() {
  const school = useSchool();
  const schoolDispatch = useSchoolDispatch();

  const [studentEditingId, setUserEditingId] = useState<string | null>(null);
  const [updatedStudentName, setUpdatedStudentName] = useState<string>("");

  const [teacherEditingId, setTeacherEditingId] = useState<string | null>(null);
  const [newAssignedStudentId, setNewAssignedStudentId] = useState<
    string | null
  >(null);

  const [assigningStudentId, setAssigningStudentId] = useState<string | null>(
    null
  );
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    string | null
  >(null);

  const [reportAssignmentId, setReportAssignmentId] = useState<string>("");
  const [reportDate, setReportDate] = useState<string>("");

  const handleUpdateStudent = () => {
    if (studentEditingId && updatedStudentName.trim()) {
      schoolDispatch?.({
        type: SchoolActionKind.UPDATE_STUDENT,
        payload: { name: updatedStudentName.trim(), id: studentEditingId },
      });
    }

    setUserEditingId(null);
    setUpdatedStudentName("");
  };

  const handleAssignStudent = () => {
    if (teacherEditingId && newAssignedStudentId) {
      schoolDispatch?.({
        type: SchoolActionKind.ASSIGN_STUDENT_TO_TEACHER,
        payload: {
          teacherId: teacherEditingId,
          studentId: newAssignedStudentId,
        },
      });
    }

    setTeacherEditingId(null);
    setNewAssignedStudentId(null);
  };

  const handleAssignAssignment = () => {
    if (!assigningStudentId || !selectedAssignmentId) {
      return;
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    schoolDispatch?.({
      type: SchoolActionKind.ASSIGN_ASSIGNMENT_TO_STUDENT,
      payload: {
        id,
        studentId: assigningStudentId,
        assignmentId: selectedAssignmentId,
        status: "assigned",
        date: now,
      },
    });

    setAssigningStudentId(null);
    setSelectedAssignmentId(null);
  };

  const handleGradeAssignment = (
    studentAssignmentId: string,
    status: "pass" | "fail"
  ) => {
    schoolDispatch?.({
      type: SchoolActionKind.GRADE_STUDENT_ASSIGNMENT,
      payload: {
        id: studentAssignmentId,
        status,
      },
    });
  };

  const passedCount =
    reportAssignmentId && reportDate && school
      ? school.studentAssignments.filter(
          (sa) =>
            sa.assignmentId === reportAssignmentId &&
            sa.status === "pass" &&
            sa.date.slice(0, 10) === reportDate
        ).length
      : 0;

  return (
    <>
      <div className="section">
        <h2>Teachers</h2>
        <TeacherTable
          teachers={school?.teachers ?? []}
          students={school?.students ?? []}
          teacherEditingId={teacherEditingId}
          newAssignedStudentId={newAssignedStudentId}
          onTeacherEditingIdChange={setTeacherEditingId}
          onNewAssignedStudentIdChange={setNewAssignedStudentId}
          onAssignStudent={handleAssignStudent}
        />
        <hr />
        <TeacherForm />
      </div>

      <div className="section">
        <h2>Students</h2>
        <StudentTable
          students={school?.students ?? []}
          assignments={school?.assignments ?? []}
          studentAssignments={school?.studentAssignments ?? []}
          studentEditingId={studentEditingId}
          updatedStudentName={updatedStudentName}
          onStudentEditingIdChange={setUserEditingId}
          onUpdatedStudentNameChange={setUpdatedStudentName}
          onUpdateStudent={handleUpdateStudent}
          assigningStudentId={assigningStudentId}
          selectedAssignmentId={selectedAssignmentId}
          onAssigningStudentIdChange={setAssigningStudentId}
          onSelectedAssignmentIdChange={setSelectedAssignmentId}
          onAssignAssignment={handleAssignAssignment}
          onGradeAssignment={handleGradeAssignment}
        />
        <hr />
        <StudentForm />
      </div>

      <div className="section">
        <h2>Assignments</h2>
        <ul>
          {school?.assignments.map((assignment) => (
            <li key={assignment.id}>{assignment.title}</li>
          ))}
        </ul>
        <hr />
        <AssignmentForm />
      </div>

      <div className="section">
        <h2>Reports</h2>
        <div>
          <label htmlFor="report-assignment">Assignment</label>
          <select
            id="report-assignment"
            value={reportAssignmentId}
            onChange={(e) => setReportAssignmentId(e.target.value)}
          >
            <option value="">—</option>
            {school?.assignments.map((assignment) => (
              <option key={assignment.id} value={assignment.id}>
                {assignment.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="report-date">Date</label>
          <input
            id="report-date"
            type="date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
          />
        </div>
        {reportAssignmentId && reportDate && (
          <p>
            {passedCount} student
            {passedCount === 1 ? "" : "s"} passed this assignment on this day.
          </p>
        )}
      </div>
    </>
  );
}

