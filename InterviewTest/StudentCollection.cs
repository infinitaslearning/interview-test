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
            if (instance != null) return instance;
            instance = new StudentCollection();
            return instance;
        }

        private StudentCollection()
        {
            students = new Dictionary<string, Student>();
        }

        internal void AddStudent(Student student)
        {
            students[student.Id] = student;
        }

        internal List<Student> GetStudents()
        {
            return students.Values.ToList();
        }

        public Student GetStudentById(string studentId)
        {
            return students[studentId];
        }

        public void Clear()
        {
            students = new Dictionary<string, Student>();
        }

        public void Update(Student studentToUpdate, StudentModule.PutParams updates)
        {
            students[studentToUpdate.Id].Name = updates.Name;
        }
    }
}