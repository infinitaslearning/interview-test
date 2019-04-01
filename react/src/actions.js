export function addTeacher(payload) {
  return { type: "ADD_TEACHER", payload }
}
export function addStudent(payload) {
  return { type: "ADD_STUDENT", payload }
}
export function updateStudent(payload) {
  return { type: "UPDATE_STUDENT", payload }
}
export function assignStudentToTeacher(payload) {
  return { type: "ASSIGN_STUDENT_TO_TEACHER", payload }
}
