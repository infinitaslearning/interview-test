using System;
using System.Collections.Generic;
using System.Linq;

namespace InterviewTest
{
    public class StudentCollection
    {

        private static StudentCollection instance;
        private Dictionary<string, Student> students;

        public static StudentCollection GetInstance()
        {
            if (instance == null)
            {
                instance = new StudentCollection();
                return instance;
            }
            return instance;
        }

        private StudentCollection()
        {
            this.students = new Dictionary<string, Student>();
        }

        internal void AddStudent(Student student)
        {
            this.students.Add(student.id, student);
        }

        internal List<Student> GetStudents() {
            return this.students.Values.ToList();
        }
    }
}