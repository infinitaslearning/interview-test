using System;
using Microsoft.Extensions.Logging;

namespace InterviewTest
{
    using Nancy;
    using Nancy.ModelBinding;

    public sealed class HomeModule : NancyModule
    {
        protected class PutBody
        {
            public PutBody()
            {
            }

            public string StudentId { get; set; }
        }

        public HomeModule()
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
            Put("/teachers/{teacherId}", args =>
            {
                try
                {
                    var putBody = this.Bind<PutBody>();
                    string teacherId = args.teacherId;
                    var teacherToUpdate = teacherList.GetTeacherById(teacherId);
                    var studentToAdd = studentList.GetStudentById(putBody.StudentId);
                    teacherToUpdate.AddStudent(studentToAdd);
                    return Response.AsJson(teacherToUpdate);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    return HttpStatusCode.InternalServerError;
                }
            });
        }
    }
}