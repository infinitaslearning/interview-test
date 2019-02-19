const app = require('../server/app'),
  chai = require('chai'),
  request = require('supertest');

const expect = chai.expect;
const util = require('./util');


describe('Students', () => {
  it('Should Get An Empty List Of Students', async () => {
    const res = await request(app)
      .get("/students");

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.be.empty;
  });

  it('Should Get List Of Students', async () => {
    const testStudent = await util.createTestStudent(app);

    const res = await request(app)
      .get("/students");

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.deep.include(testStudent);
  });

  it('Should Update Student', async () => {
    const testStudent = await util.createTestStudent(app);

    const res = await request(app)
      .put(`/students/${testStudent.id}`)
      .send({ name: 'Foo' });

    expect(res.statusCode).to.equal(200);
    expect(res.body.name).to.equal('Foo');
  });

  it('Should Get List Of Students By Teacher', async () => {
    const testStudent = await util.createTestStudent(app);
    const testTeacher = await util.createTestTeacher(app);
    await util.addStudentToTeacher(app, testStudent.id, testTeacher.id);

    const res = await request(app)
        .get(`/students`);

    expect(res.statusCode).to.equal(200);
    const studentList = res.body;
    expect(studentList).to.deep.include(testStudent);
  });

});
