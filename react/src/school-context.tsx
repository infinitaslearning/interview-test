import { createContext, useContext, useReducer } from "react";

export type Student = {
  id: string;
  name: string;
};

export type Teacher = {
  id: string;
  name: string;
  students: string[];
};

export type Assignment = {
  id: string;
  title: string;
};

export type StudentAssignmentStatus = "assigned" | "pass" | "fail";

export type StudentAssignment = {
  id: string;
  studentId: string;
  assignmentId: string;
  status: StudentAssignmentStatus;
  /**
   * ISO string date-time for when the assignment was assigned or graded.
   * Reporting groups by calendar day (YYYY-MM-DD).
   */
  date: string;
};

export type InitialState = {
  teachers: Teacher[];
  students: Student[];
  assignments: Assignment[];
  studentAssignments: StudentAssignment[];
};

export enum SchoolActionKind {
  ADD_TEACHER = "ADD_TEACHER",
  ADD_STUDENT = "ADD_STUDENT",
  UPDATE_STUDENT = "UPDATE_STUDENT",
  ASSIGN_STUDENT_TO_TEACHER = "ASSIGN_STUDENT_TO_TEACHER",
  ADD_ASSIGNMENT = "ADD_ASSIGNMENT",
  ASSIGN_ASSIGNMENT_TO_STUDENT = "ASSIGN_ASSIGNMENT_TO_STUDENT",
  GRADE_STUDENT_ASSIGNMENT = "GRADE_STUDENT_ASSIGNMENT",
}

export type SchoolAction =
  | {
      type: SchoolActionKind.ADD_TEACHER;
      payload: Teacher;
    }
  | {
      type: SchoolActionKind.ADD_STUDENT;
      payload: Student;
    }
  | {
      type: SchoolActionKind.UPDATE_STUDENT;
      payload: Student;
    }
  | {
      type: SchoolActionKind.ASSIGN_STUDENT_TO_TEACHER;
      payload: {
        teacherId: string;
        studentId: string;
      };
    }
  | {
      type: SchoolActionKind.ADD_ASSIGNMENT;
      payload: Assignment;
    }
  | {
      type: SchoolActionKind.ASSIGN_ASSIGNMENT_TO_STUDENT;
      payload: StudentAssignment;
    }
  | {
      type: SchoolActionKind.GRADE_STUDENT_ASSIGNMENT;
      payload: {
        id: string;
        status: Exclude<StudentAssignmentStatus, "assigned">;
      };
    };

const SchoolContext = createContext<InitialState | null>(null);
const SchoolDispatchContext =
  createContext<React.Dispatch<SchoolAction> | null>(null);

export function SchoolProvider({ children }: { children?: React.ReactNode }) {
  const [school, dispatch] = useReducer(schoolReducer, initialState);

  return (
    <SchoolContext.Provider value={school}>
      <SchoolDispatchContext.Provider value={dispatch}>
        {children}
      </SchoolDispatchContext.Provider>
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  return useContext(SchoolContext);
}

export function useSchoolDispatch() {
  return useContext(SchoolDispatchContext);
}

export function schoolReducer(
  state: InitialState,
  action: SchoolAction
): InitialState {
  switch (action.type) {
    case SchoolActionKind.ADD_TEACHER:
      return { ...state, teachers: [...state.teachers, action.payload] };
    case SchoolActionKind.ADD_STUDENT:
      return { ...state, students: [...state.students, action.payload] };
    case SchoolActionKind.UPDATE_STUDENT:
      const updatedStudents: Student[] = [];
      for (let s of state.students) {
        if (s.id === action.payload.id) {
          updatedStudents.push(action.payload);
        } else {
          updatedStudents.push(s);
        }
      }
      return { ...state, students: updatedStudents };
    case SchoolActionKind.ASSIGN_STUDENT_TO_TEACHER: {
      const updatedTeachers: Teacher[] = [];
      for (const t of state.teachers) {
        if (t.id === action.payload.teacherId) {
          updatedTeachers.push({
            ...t,
            students: [...t.students, action.payload.studentId],
          });
        } else {
          updatedTeachers.push(t);
        }
      }
      return { ...state, teachers: updatedTeachers };
    }
    case SchoolActionKind.ADD_ASSIGNMENT:
      return {
        ...state,
        assignments: [...state.assignments, action.payload],
      };
    case SchoolActionKind.ASSIGN_ASSIGNMENT_TO_STUDENT:
      return {
        ...state,
        studentAssignments: [...state.studentAssignments, action.payload],
      };
    case SchoolActionKind.GRADE_STUDENT_ASSIGNMENT: {
      const updatedStudentAssignments: StudentAssignment[] = [];
      for (const sa of state.studentAssignments) {
        if (sa.id === action.payload.id) {
          updatedStudentAssignments.push({
            ...sa,
            status: action.payload.status,
          });
        } else {
          updatedStudentAssignments.push(sa);
        }
      }
      return { ...state, studentAssignments: updatedStudentAssignments };
    }
    default:
      return state;
  }
}

const initialState: InitialState = {
  teachers: [],
  students: [],
  assignments: [],
  studentAssignments: [],
};
