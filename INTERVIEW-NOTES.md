## Infinitas LMS React exercise – study notes

### 1. Big picture

- **Goal**: Work on a small React-based LMS that manages teachers and students, then extend it toward assignments, grading (Pass/Fail), and simple reporting.
- **Timebox**: 45–60 minutes. The aim is **how you think, communicate, and structure code**, not finishing everything.
- **Your narrative**: “I’ll first understand the current design, then refactor the rough edges that slow development, then add a thin vertical slice of a new feature with tests.”

### 2. Make sure the project runs

Inside the `react` folder:

- **Install**: `npm install`
- **Run tests**: `npm test`
- **Run dev server**: `npm run dev` and open the app.

Be ready to briefly explain what each script does (Vite dev server, TypeScript build, Vitest tests).

### 3. Understand the current React architecture

- **State management**
  - `SchoolProvider` wraps the app and uses `useReducer` with `schoolReducer`.
  - **State shape**:
    - `students: { id: string; name: string }[]`
    - `teachers: { id: string; name: string; students: string[] }[]` (array of student IDs).
  - **Actions** (`SchoolActionKind`):
    - `ADD_TEACHER`
    - `ADD_STUDENT`
    - `UPDATE_STUDENT`
    - `ASSIGN_STUDENT_TO_TEACHER`
  - **Reducer patterns**:
    - Adds are done by spreading existing arrays and appending.
    - Updates are done via loops that build new arrays (immutable updates).

- **UI (`App.tsx`)**
  - Uses `useSchool()` to read state and `useSchoolDispatch()` to dispatch actions.
  - Forms:
    - Add teacher (creates UUID, dispatches `ADD_TEACHER`).
    - Add student (creates UUID, dispatches `ADD_STUDENT`).
  - Editing:
    - Student name editing tracked with `studentEditingId` and `updatedStudentName`.
    - Teacher assignment tracked with `teacherEditingId` and `newAssignedStudentId`.
  - Data flow:
    - Teachers table shows each teacher and lists assigned students by mapping IDs to names.

Be ready to restate this architecture in your own words.

### 4. Obvious refactors you can talk about (and maybe do)

- **Rendering inefficiencies / clarity**
  - Teacher student list currently maps `teacher.students` and then, *inside each*, maps all `school.students` to find a name:
    - You can mention this is an O(n²) pattern and hard to read.
    - Possible improvements:
      - Precompute a `studentById` map (e.g. `const studentById = new Map(students.map(s => [s.id, s]));`).
      - Or create a selector/helper function to map an ID to a name.

- **Keys and list rendering**
  - `li` and `option` elements should ideally have `key` props; you can mention this as a React best practice.

#### 4.2 Second refactor: Reducer clarity (implemented)

**What's wrong**
- `UPDATE_STUDENT` used a for-loop to build a new array; more verbose than using `.map()`.

**How to approach it during the interview**

1. **Name the problem**: "In the reducer, `UPDATE_STUDENT` builds a new students array with a for-loop. I'd refactor that to use `.map()` so the intent is clear: replace this one item, keep the rest the same."
2. **Propose the fix**: "Use `state.students.map(s => s.id === action.payload.id ? action.payload : s)` and return `{ ...state, students }`. Same for the teacher update if it's still a loop."
3. **Do it**: Change the `UPDATE_STUDENT` case (and `ASSIGN_STUDENT_TO_TEACHER` if needed), run `npm test`, then quickly test update student in the UI.
4. **Mention tests**: "The existing reducer test still passes. Reducers are easy to unit test."

**Implementation**: Done in `react/src/school-context.tsx` — both cases now use `.map()`.

- **Reducer clarity** (reference)
  - Loops that build new arrays could be turned into `map` for readability:
    - `state.students.map(s => s.id === action.payload.id ? action.payload : s);`
    - Similarly for updating teacher’s `students` array.

#### 4.3 Third refactor: Component extraction (implemented)

**What's wrong**
- `App.tsx` holds all UI: two tables, two forms, and all state. Hard to scan and harder to test or change one area without touching the rest.

**How to approach it during the interview**

1. **Name the problem**: "App is doing a lot—teacher and student tables and forms plus editing state. I'd extract smaller components so each file has one job and we can test or change one area without touching the others."
2. **Propose the split**: "I'll pull out `TeacherTable`, `TeacherForm`, `StudentTable`, and `StudentForm`. The tables need data and callbacks for editing; the forms can use the context dispatch directly. App stays as the place that holds the editing state and passes it down."
3. **Do it in order**: Extract one piece at a time (e.g. `TeacherForm` first—no props, just move the form and the submit handler). Then the table with props. Then the same for students. Run the app after each step.
4. **Mention benefits**: "Now we could unit-test the reducer and add simple tests for a form or table in isolation. Adding the assignment feature later, we might add an `AssignmentForm` or extend the student row without cluttering App."

**Implementation**: `react/src/components/TeacherTable.tsx`, `TeacherForm.tsx`, `StudentTable.tsx`, `StudentForm.tsx`. App imports them and passes teachers/students plus editing state and callbacks. TeacherTable uses a `studentById` map for O(1) name lookup.

#### 4.4 Fourth refactor: Validation and UX (implemented)

**What's wrong**
- Forms allow submitting with blank or whitespace-only names.
- "Assign" can be clicked with no student selected; "Done" can be clicked with an empty name when editing a student.
- Labels and buttons are mostly fine; small improvements (e.g. clearer button labels) help accessibility.

**How to approach it during the interview**

1. **Name the problem**: "Right now we can add a teacher or student with an empty name, and we can click Assign without picking a student or Done with an empty name. I'd add simple validation and disable those actions when the input isn't valid."
2. **Propose the fix**: "In the add forms I'll use controlled inputs and disable the submit button when the trimmed value is empty. In the tables I'll disable Assign when no student is selected and Done when the name is empty. We already have htmlFor/id on the form labels."
3. **Do it**: Add state for the form inputs, disable submit when `value.trim() === ''`. Disable Assign when `!newAssignedStudentId`, Done when `updatedStudentName.trim() === ''`. Optionally add aria attributes if we show an error."
4. **Mention trade-offs**: "We could show an error message instead of only disabling; disabling is simpler and avoids extra state. For production we might add a toast or inline error."

**Implementation**: TeacherForm and StudentForm use controlled inputs and disable submit when name is empty. TeacherTable disables Assign when no student selected; StudentTable disables Done when name is empty.

Pick 1–2 of these to mention/implement to show pragmatic refactoring, not perfectionism.

### 5. Likely feature extensions (assignments, grading, reporting)

#### 5.1 First slice: assignments and per-student assignment list (implemented)

**What’s implemented**
- Extended state with normalized assignment data:
  - `assignments: { id: string; title: string }[]`
  - `studentAssignments: { id: string; studentId: string; assignmentId: string; status: "assigned" | "pass" | "fail"; date: string }[]`
- New actions:
  - `ADD_ASSIGNMENT`
  - `ASSIGN_ASSIGNMENT_TO_STUDENT`
  - `GRADE_ASSIGNMENT` (status update only; UI still to come if needed).
- UI:
  - `AssignmentForm` component to create assignments.
  - `StudentTable` now shows each student’s assignments (title + status) and lets you assign an assignment to a student via a dropdown.

**How to approach it during the interview**

1. **State design**: “For assignments I’d like a normalized shape: an `assignments` collection and a `studentAssignments` collection that links students to assignments with a status and date. That makes reporting like ‘how many students passed assignment X on a date’ straightforward.”
2. **Reducer changes**: “I’ll add `ADD_ASSIGNMENT`, `ASSIGN_ASSIGNMENT_TO_STUDENT`, and `GRADE_ASSIGNMENT` to the reducer. Each case returns a new state: append an assignment, append a student-assignment record, or update the status of one record.”
3. **UI slice**: “I’ll implement one vertical slice: a small Assignments form to create assignments, and in the student table an ‘Assign assignment’ flow: click a button, pick an assignment from a select, and dispatch `ASSIGN_ASSIGNMENT_TO_STUDENT`. I’ll also list each student’s assignments and their status.”
4. **Future grading/reporting**: “With `studentAssignments` in place, grading is just toggling status on a record, and reporting is filtering that array by assignment and date. If we had more time I’d add Pass/Fail buttons and a small reporting panel.”

**Files to point to in the code**
- Types, state, actions, and reducer cases: `react/src/school-context.tsx`.
- Assignments UI and wiring:
  - `react/src/components/AssignmentForm.tsx`
  - `react/src/components/StudentTable.tsx` (assignments column and assign flow)
  - `react/src/App.tsx` (assigning state and dispatch call)

The README lists three capabilities:

1. **Assign an assignment to a student**
2. **Grade an assignment Pass/Fail**
3. **Basic reporting on how many students passed an assignment on a given day**

Prepare a simple design you can describe and partially implement.

- **Data model (front-end version) – one reasonable approach**
  - Add an `Assignment` concept and track per-student status:
    - `assignments: { id: string; title: string }[]`
    - `studentAssignments: { id: string; studentId: string; assignmentId: string; status: "assigned" | "pass" | "fail"; date: string }[]`
  - Or, if they want to keep it minimal, you can nest assignments under `Student`:
    - `Student` becomes `{ id; name; assignments: { id; title; status; date }[] }`.
  - Be ready to explain trade‑offs:
    - Separate collections = more normalized, easier reporting.
    - Nested under `Student` = simpler code initially but harder cross‑student queries.

- **Reducer changes you might propose**
  - New action types, for example:
    - `ADD_ASSIGNMENT`
    - `ASSIGN_ASSIGNMENT_TO_STUDENT`
    - `GRADE_ASSIGNMENT`
  - Show you know how to:
    - Extend `InitialState` with new fields.
    - Extend `SchoolActionKind` and `SchoolAction` union.
    - Update `schoolReducer` immutably.

- **UI slice to implement**
  - Aim for **one vertical slice**, e.g.:
    - A small “Assignments” section to create an assignment.
    - In the students table, add a button “Assign assignment” that:
      - Opens a select of assignments.
      - Dispatches `ASSIGN_ASSIGNMENT_TO_STUDENT`.
  - Or focus on grading:
    - Show a list of a student’s assignments with buttons “Pass” / “Fail”.

### 6. Reporting idea (even if you don’t implement fully)

- **Requirement**: “How many students passed an assignment on a given day?”
- If using `studentAssignments` with `status` and `date`:
  - A selector/helper function could:
    - Filter by `assignmentId` and `date`.
    - Count how many have `status === "pass"`.
  - In the UI, a simple reporting panel could:
    - Let you select an assignment and date (or use today).
    - Display: `X students passed / Y students assigned`.

Even if you don’t code this, be ready to walk through how you’d do it.

### 7. Testing strategy (Vitest)

- **Existing test**: `school-reducer.test.ts` verifies `ADD_TEACHER`.
- How to extend:
  - Add tests for:
    - `ADD_STUDENT` (length increases, correct data).
    - `UPDATE_STUDENT` (only one student’s name changes).
    - `ASSIGN_STUDENT_TO_TEACHER` (teacher gains the student ID, no mutation of initial arrays).
  - If you add new actions, write tests **first** or at least alongside changes.

Talking points:

- You value reducers because they are easy to unit test in isolation.
- You like to guard complex state updates with focused tests.

### 8. How to approach the session

- **First 5–10 minutes**
  - Skim `App.tsx` and `school-context.tsx`, describe current design out loud.
  - Call out one or two refactor targets and explain *why* they’d help future work.

- **Next 30–40 minutes**
  - Implement a small refactor (e.g. improve how teacher’s students are rendered).
  - Add or update at least one reducer test.
  - Add a small part of an assignment/grading feature (data model + one UI interaction).

- **Final minutes**
  - Reflect: what you’d do next (more tests, deeper refactors, error handling, accessibility).
  - Emphasize you think in terms of maintainability, correctness, and user experience.

If you rehearse explaining these points and can comfortably modify the reducer and UI, you’ll be well prepared for the exercise.

