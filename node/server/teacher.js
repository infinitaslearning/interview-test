module.exports = (name, id) => {

  const students = [];

  return ({
    name,
    id,
    students,
    addStudent: (student) => {
      students.push(student);
    }
  });
};