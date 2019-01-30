namespace InterviewTest
{
    using Nancy;
    using Nancy.ModelBinding;

    public sealed class StudentModule : NancyModule
    {
        public class StudentRequestParams
        {
            public StudentRequestParams()
            {
            }

            public string TeacherId { get; set; }
        }

        public class PutParams
        {
            public PutParams()
            {
            }

            public string Name { get; set; }
        }

        public StudentModule() : base("/students")
        {
            var studentList = StudentCollection.GetInstance();
            var teacherList = TeacherCollection.GetInstance();

            Get("/", args =>
            {
                var studentRequestParams = this.Bind<StudentRequestParams>();
                var teacherId = studentRequestParams.TeacherId;
                return teacherId != null
                    ? Response.AsJson(teacherList.GetTeacherById(teacherId).Students)
                    : Response.AsJson(studentList.GetStudents());
            });
            Post("/", _ =>
            {
                var student = this.Bind<Student>();
                studentList.AddStudent(student);
                return HttpStatusCode.Created;
            });
            Put("/{studentId}", args =>
            {
                var updates = this.Bind<PutParams>();
                string studentId = args.studentId;
                var studentToUpdate = studentList.GetStudentById(studentId);
                studentList.Update(studentToUpdate, updates);
                return Response.AsJson(studentToUpdate);
            });
        }
    }
}