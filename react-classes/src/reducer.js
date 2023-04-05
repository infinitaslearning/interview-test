const initialState = {
  teachers: [],
  students: [],
};

function rootReducer(state = initialState, action) {
  if (action.type === "ADD_TEACHER") {
    state.teachers.push(action.payload);
  }
  if (action.type === "ADD_STUDENT") {
    state.students.push(action.payload);
  }
  if (action.type === "UPDATE_STUDENT") {
    for (let s in state.students) {
      if (state.students[s].id === action.payload.id) {
        state.students[s] = action.payload;
      }
    }
  }
  if (action.type === "ASSIGN_STUDENT_TO_TEACHER") {
    for (let t in state.teachers) {
      if (state.teachers[t].id === action.payload.teacherId) {
        state.teachers[t].students.push(action.payload.studentId)
      }
    }
  }
  return state;
}

export default rootReducer;