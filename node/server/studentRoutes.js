const studentCollection = require('./studentCollection');
const teacherCollection = require('./teacherCollection');

module.exports = (app) => {

  const studentList = studentCollection.getInstance();
  const teacherList = teacherCollection.getInstance();

  app.route('/students')
    .get((req, res) => {
      const teacherId = req.query.teacherId;

      teacherId ?
        res.json(teacherList.getTeacherById(teacherId).students) :
        res.json(studentList.getStudents());
    });

  app.route('/students')
    .post((req, res) => {
      studentList.addStudent(req.body);
      res.sendStatus(201);
    });

  app.route('/students/:studentId')
    .put((req, res) => {
      const studentToUpdate = studentList.getStudentById(req.params.studentId);
      studentList.update(studentToUpdate, req.body);
      res.json(studentToUpdate);
    });
};