using System.Collections.Generic;

namespace InterviewTest
{
    public class Teacher : Person
    {
        // required for serialization
        // ReSharper disable once UnusedMember.Global
        public Teacher()
        {
        }

        public List<Student> Students { get; set; }

        public Teacher(string id, string name) : base(id, name)
        {
            Students = new List<Student>();
        }

        public void AddStudent(Student studentToAdd)
        {
            if (Students == null)
            {
                Students = new List<Student>();
            }

            Students.Add(studentToAdd);
        }
    }
}