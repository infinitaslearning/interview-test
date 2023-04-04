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

export type InitialState = {
  teachers: Teacher[];
  students: Student[];
};

export enum TestActionKind {
  ADD_TEACHER = "ADD_TEACHER",
  ADD_STUDENT = "ADD_STUDENT",
  UPDATE_STUDENT = "UPDATE_STUDENT",
  ASSIGN_STUDENT_TO_TEACHER = "ASSIGN_STUDENT_TO_TEACHER",
}

export type SchoolAction =
  | {
      type: TestActionKind.ADD_TEACHER;
      payload: Teacher;
    }
  | {
      type: TestActionKind.ADD_STUDENT;
      payload: Student;
    }
  | {
      type: TestActionKind.UPDATE_STUDENT;
      payload: Student;
    }
  | {
      type: TestActionKind.ASSIGN_STUDENT_TO_TEACHER;
      payload: {
        teacherId: string;
        studentId: string;
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

function schoolReducer(
  state: InitialState,
  action: SchoolAction
): InitialState {
  switch (action.type) {
    case TestActionKind.ADD_TEACHER:
      return { ...state, teachers: [...state.teachers, action.payload] };
    case TestActionKind.ADD_STUDENT:
      return { ...state, students: [...state.students, action.payload] };
    case TestActionKind.UPDATE_STUDENT:
      const newStudents = [];
      for (let s of state.students) {
        if (s.id === action.payload.id) {
          newStudents.push(action.payload);
        } else {
          newStudents.push(s);
        }
      }
      return { ...state, students: newStudents };
    default:
      return state;
  }
  // if (action.type === "ASSIGN_STUDENT_TO_TEACHER") {
  //   for (let t in state.teachers) {
  //     if (state.teachers[t].id === action.payload.teacherId) {
  //       state.teachers[t].students.push(action.payload.studentId)
  //     }
  //   }
  // }
  return state;
}

const initialState: InitialState = {
  teachers: [],
  students: [],
};
