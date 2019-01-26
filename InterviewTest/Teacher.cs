using System.Collections.Generic;

namespace InterviewTest
{
    public class Teacher : Person
    {
        public Dictionary<string, Student> students;
        public Teacher(string id, string name) : base(id, name)
        {
            this.students = new Dictionary<string, Student>();
        }

        public Teacher() : base() { }
    }
}