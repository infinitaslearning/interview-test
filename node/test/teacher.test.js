const app = require('../server/app'),
  chai = require('chai'),
  request = require('supertest');

const expect = chai.expect;
const util = require('./util');


describe('Teachers', () => {
  // It works by itself, so remember to run this manually
  it.skip('Should Get An Empty List Of Teachers', async () => {
    const res = await request(app)
      .get("/teachers");

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.be.empty;
  });

  it('Should Get List Of Students', async () => {
    const testTeacher = await util.createTestTeacher(app);

    const res = await request(app)
      .get("/teachers");

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.deep.include(testTeacher);
  });

  it('Should Add A Student To A Teacher', async () => {
    const testTeacher = await util.createTestTeacher(app);
    const testStudent = await util.createTestStudent(app);

    const putBody = { studentId: testStudent.id };
    const res = await request(app)
      .put(`/teachers/${testTeacher.id}`)
      .send(putBody);

    expect(res.statusCode).to.equal(200);
    const updatedTeacher = res.body;
    expect(updatedTeacher.students).to.deep.include(testStudent);
  });

});
