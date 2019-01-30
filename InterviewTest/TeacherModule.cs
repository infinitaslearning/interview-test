using System;

namespace InterviewTest
{
    using Nancy;
    using Nancy.ModelBinding;

    public sealed class TeacherModule : NancyModule
    {
        protected class PutBody
        {
            public PutBody()
            {
            }

            public string StudentId { get; set; }
        }

        public TeacherModule()
        {
            var teacherList = TeacherCollection.GetInstance();
            var studentList = StudentCollection.GetInstance();

            Get("/teachers", args => Response.AsJson(teacherList.GetTeachers()));
            Post("/teachers", _ =>
            {
                Console.WriteLine(1);
                var teacher = this.Bind<Teacher>();
                teacherList.AddTeacher(teacher);
                return HttpStatusCode.Created;
            });
            Put("/{teacherId}", args =>
            {
                var putBody = this.Bind<PutBody>();
                string teacherId = args.teacherId;
                var teacherToUpdate = teacherList.GetTeacherById(teacherId);
                var studentToAdd = studentList.GetStudentById(putBody.StudentId);
                teacherToUpdate.AddStudent(studentToAdd);
                return Response.AsJson(teacherToUpdate);
            });
        }
    }
}