using System;
using System.Collections.Generic;
using System.Linq;

namespace InterviewTest
{
    public class TeacherCollection
    {

        private static TeacherCollection instance;
        private Dictionary<string, Teacher> teachers;

        public static TeacherCollection GetInstance()
        {
            if (instance == null)
            {
                instance = new TeacherCollection();
                return instance;
            }
            return instance;
        }

        private TeacherCollection()
        {
            this.teachers = new Dictionary<string, Teacher>();
        }

        internal void AddTeacher(Teacher teacher)
        {
            this.teachers.Add(teacher.id, teacher);
        }

        internal List<Teacher> GetTeachers() {
            return this.teachers.Values.ToList();
        }
    }
}