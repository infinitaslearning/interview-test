module.exports = (() => {
  let instance;

  const createInstance = () => {
    let students = {};
    return {
      addStudent: (student) => {
        students[student.id] = student;
      },
      getStudents: () => {
        return Object.values(students);
      },
      getStudentById: (studentId) => {
        return students[studentId];
      },
      clear: () => {
        students = {};
      },
      update: (studentToUpdate, updates) => {
        students[studentToUpdate.id].name = updates.name;
      }
    }
  };

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();