const chai = require('chai'),
  request = require('supertest');

const expect = chai.expect;

module.exports.createTestStudent = async (app) => {
  const testStudent = { id: '1', name: 'Student' };

  const postResult = await request(app)
    .post("/students")
    .send(testStudent)
    .set('Content-Type', 'application/json');


  expect(postResult.statusCode).to.equal(201);
  return testStudent;
};

module.exports.addStudentToTeacher = async (app, studentId, teacherId) => {
  const putResult = await request(app)
    .put(`/teachers/${teacherId}`)
    .send({ studentId })
    .set('Content-Type', 'application/json');

  expect(putResult.statusCode).to.equal(200);
};

module.exports.createTestTeacher = async (app) => {
  const testTeacher = { id: '1', name: 'Teacher' };

  const postResult = await request(app)
    .post("/teachers")
    .send(testTeacher)
    .set('Content-Type', 'application/json');


  expect(postResult.statusCode).to.equal(201);
  return testTeacher;
};