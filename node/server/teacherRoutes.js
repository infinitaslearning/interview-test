const studentCollection = require('./studentCollection');
const teacherCollection = require('./teacherCollection');

module.exports = (app) => {

  const studentList = studentCollection.getInstance();
  const teacherList = teacherCollection.getInstance();

  app.route('/teachers')
    .get((req, res) => {
      res.json(teacherList.getTeachers());
    });

  app.route('/teachers')
    .post((req, res) => {
      console.log("I am here");
      const teacher = req.body;
      teacherList.addTeacher(teacher);
      res.sendStatus(201);
    });

  app.route('/teachers/:teacherId')
    .put((req, res) => {
      const putBody = req.body;
      const teacherId = req.params.teacherId;
      const teacherToUpdate = teacherList.getTeacherById(teacherId);
      const studentToAdd = studentList.getStudentById(putBody.studentId);
      teacherToUpdate.addStudent(studentToAdd);
      res.json(teacherToUpdate);
    });
};
