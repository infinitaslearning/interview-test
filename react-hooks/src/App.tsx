import { useState } from "react";
import infinitasLogo from "/infinitas-logo.svg";
import "./App.css";
import { SchoolActionKind, useSchool, useSchoolDispatch } from "./school-context";

function App() {
  const school = useSchool();
  const schoolDispatch = useSchoolDispatch();

  const [studentEditingId, setUserEditingId] = useState<string | null>(null);
  const [updatedStudentName, setUpdatedStudentName] = useState<string>("");

  const [teacherEditingId, setTeacherEditingId] = useState<string | null>(null);
  const [newAssignedStudentId, setNewAssignedStudentId] = useState<string | null>(null);

  const handleTeacherSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.currentTarget;
    const teacherName = target.teacher.value;
    const id = crypto.randomUUID();
    schoolDispatch?.({
      type: SchoolActionKind.ADD_TEACHER,
      payload: { name: teacherName, id, students: [] },
    });

    target.reset();
  };

  const handleStudentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.currentTarget;
    const studentName = target.student.value;
    const id = crypto.randomUUID();
    schoolDispatch?.({
      type: SchoolActionKind.ADD_STUDENT,
      payload: { name: studentName, id },
    });

    target.reset();
  };

  const handleUpdateStudent = () => {
    if (studentEditingId) {
      schoolDispatch?.({
        type: SchoolActionKind.UPDATE_STUDENT,
        payload: { name: updatedStudentName, id: studentEditingId },
      });
    }

    setUserEditingId(null);
    setUpdatedStudentName("");
  };

  const handleAssignStudent = () => {
    if (teacherEditingId && newAssignedStudentId) {
      schoolDispatch?.({
        type: SchoolActionKind.ASSIGN_STUDENT_TO_TEACHER,
        payload: { teacherId: teacherEditingId, studentId: newAssignedStudentId },
      });
    }

    setTeacherEditingId(null);
    setNewAssignedStudentId(null);
  };

  return (
    <div className="App">
      <div>
        <a href="/" target="_blank">
          <img src={infinitasLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>IL Interview</h1>
      <div className="section">
        <h2>Teacher</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {school?.teachers.map((teacher) => {
              return (
                <tr key={teacher.id}>
                  <td>{teacher.id}</td>
                  <td>{teacher.name}</td>
                  <td>
                    <ul>
                    {teacher.students.map(s => <li>{school?.students.map(s1 => s === s1.id ? s1.name : '')}</li>)}
                    </ul>
                    {teacher.id === teacherEditingId ? (
                      <>
                        <select
                          value={newAssignedStudentId || ""}
                          onChange={(e) =>
                            setNewAssignedStudentId(e.target.value)
                          }
                        >
                          <option value={""}></option>
                          {school?.students.map((student) => (
                            <option value={student.id}>{student.name}</option>
                          ))}
                        </select>
                        <button onClick={handleAssignStudent}>Assign</button>
                      </>
                    ) : (
                      <button onClick={() => setTeacherEditingId(teacher.id)}>
                        Assign student
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr></hr>
        <form onSubmit={handleTeacherSubmit}>
          <label htmlFor="teacher">Teacher</label>
          <input type="text" id="teacher" name="teacher" />
          <button type="submit">Add Teacher</button>
        </form>
      </div>
      <div className="section">
        <h2>Students</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {school?.students.map((student) => {
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>
                    {student.id === studentEditingId ? (
                      <>
                        <input
                          type="text"
                          value={updatedStudentName}
                          onChange={(e) =>
                            setUpdatedStudentName(e.target.value)
                          }
                        ></input>
                        <button onClick={handleUpdateStudent}>Done</button>
                      </>
                    ) : (
                      <button onClick={() => setUserEditingId(student.id)}>
                        Update
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr></hr>
        <form onSubmit={handleStudentSubmit}>
          <label htmlFor="student">Student</label>
          <input type="text" id="student" name="student" />
          <button type="submit">Add Student</button>
        </form>
      </div>
    </div>
  );
}

export default App;
