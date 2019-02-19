const teacher = require('./teacher');

module.exports = (() => {
  let instance;

  const createInstance = () => {
    let teachers = {};
    return {
      addTeacher: (teacher) => {
        teachers[teacher.id] = teacher;
      },
      getTeachers: () => {
        return Object.values(teachers);
      },
      getTeacherById: (teacherId) => {
        return teacher(teachers[teacherId]);
      },
      clear: () => {
        teachers = {};
      },
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