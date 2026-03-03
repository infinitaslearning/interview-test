import { useState } from "react";
import { SchoolActionKind, useSchoolDispatch } from "../../school-context";

export function AssignmentForm() {
  const dispatch = useSchoolDispatch();
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    const id = crypto.randomUUID();
    dispatch?.({
      type: SchoolActionKind.ADD_ASSIGNMENT,
      payload: { id, title: trimmed },
    });
    setTitle("");
  };

  const isValid = title.trim() !== "";

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="assignment-title">New assignment</label>
      <input
        id="assignment-title"
        name="assignment-title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-invalid={!isValid && title.length > 0}
      />
      <button type="submit" disabled={!isValid}>
        Add assignment
      </button>
    </form>
  );
}

