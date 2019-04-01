import React, { Component } from 'react';
import './App.css';
import { connect } from "react-redux";
import { addStudent, addTeacher, assignStudentToTeacher, updateStudent } from './actions';
import uuidv1 from "uuid";

const mapStateToProps = state => {
  return {
    teachers: state.teachers,
    students: state.students,
  };
};

const mapDispatchToProps = dispatch => ({
  addTeacher: teacher => dispatch(addTeacher(teacher)),
  addStudent: student => dispatch(addStudent(student)),
  updateStudent: updates => dispatch(updateStudent(updates)),
  assignStudentToTeacher: (teacherId, studentId) => dispatch(assignStudentToTeacher({ teacherId, studentId }))
});

class ConnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTeacherName: '',
      newStudentName: '',
      updateStudentName: '',
      updatingStudent: null,
      assignStudentTo: null,
    };
    this.handleNewTeacher = this.handleNewTeacher.bind(this);
    this.handleNewStudent = this.handleNewStudent.bind(this);
    this.handleAssignStudent = this.handleAssignStudent.bind(this);
  }

  handleNewTeacher(event) {
    event.preventDefault();
    const { newTeacherName } = this.state;
    const id = uuidv1();
    this.props.addTeacher({ name: newTeacherName, id, students: [] });
    this.setState({ newTeacherName: "" });
  }

  handleNewStudent(event) {
    event.preventDefault();
    const { newStudentName } = this.state;
    const id = uuidv1();
    this.props.addStudent({ name: newStudentName, id });
    this.setState({ newStudentName: "" });
  }

  handleUpdateStudent(s, name) {
    const isUpdating = this.state.updatingStudent === s.id;
    if (isUpdating) {
      this.props.updateStudent({ name, id: s.id });
      this.setState({ updatingStudent: null, updateStudentName: '' });
      return;
    }

    this.setState({ updatingStudent: s.id, updateStudentName: s.name });
  }

  handleAssignStudent(teacherId, studentId) {
    this.props.assignStudentToTeacher(teacherId, studentId);
    this.setState({ assignStudentTo: null });
  }

  render() {
    let teachers = this.props.teachers;
    let students = this.props.students;

    return (
      <div className="App">
        <div className="teachers">
          <h1>Teachers</h1>
          <table>
            <tbody>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Students</td>
            </tr>
            {teachers.map(t => <tr>
              <td>{t.id}</td>
              <td>{t.name}</td>
              <td>
                <ul>
                  {t.students.map(s => <li>{students.map(s1 => s === s1.id ? s1.name : '')}</li>)}
                  {this.state.assignStudentTo === t.id ?
                    <select onChange={e => this.handleAssignStudent(t.id, e.target.value)}>
                      <option selected="selected"></option>
                      {students.map(s => <option value={s.id}>{s.name}</option>)}
                    </select>
                    : null}
                  <button type="button" className="btn"
                          onClick={() => this.setState({ assignStudentTo: t.id })}>
                    Assign Student
                  </button>
                </ul>
              </td>
            </tr>)}
            </tbody>
          </table>
          <form onSubmit={this.handleNewTeacher}>
            <div>
              <label>New Teacher</label>
              <input type="text" value={this.state.newTeacherName}
                     onChange={e => this.setState({ newTeacherName: e.target.value })}/>
              <button type="submit" className="btn">
                Add Teacher
              </button>
            </div>
          </form>
        </div>
        <div className="students">
          <h1>Students</h1>
          <table>
            <tbody>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td></td>
            </tr>
            {students.map(s => <tr>
              <td>{s.id}</td>
              <td>{this.state.updatingStudent === s.id ? <input type="text" value={this.state.updateStudentName}
                                                                onChange={e => this.setState({ updateStudentName: e.target.value })}/> : s.name}</td>
              <td>
                <button type="button" className="btn"
                        onClick={e => this.handleUpdateStudent(s, this.state.updateStudentName)}>
                  {this.state.updatingStudent !== s.id ? "Update Student" : "Done"}
                </button>
              </td>
            </tr>)}
            </tbody>
          </table>
          <form onSubmit={this.handleNewStudent}>
            <div>
              <label>New Student</label>
              <input type="text" value={this.state.newStudentName}
                     onChange={e => this.setState({ newStudentName: e.target.value })}/>
              <button type="submit" className="btn">
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;
