import { useState } from "react";
import { SchoolActionKind, useSchoolDispatch } from "../../school-context";

export function TeacherForm() {
  const schoolDispatch = useSchoolDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const id = crypto.randomUUID();
    schoolDispatch?.({
      type: SchoolActionKind.ADD_TEACHER,
      payload: { name: trimmed, id, students: [] },
    });
    setName("");
  };

  const isValid = name.trim() !== "";

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="teacher">Teacher name</label>
      <input
        type="text"
        id="teacher"
        name="teacher"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-invalid={!isValid && name.length > 0}
      />
      <button type="submit" disabled={!isValid}>
        Add Teacher
      </button>
    </form>
  );
}

