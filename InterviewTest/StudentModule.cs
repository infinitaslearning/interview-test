namespace InterviewTest
{
    using Nancy;
    using Nancy.ModelBinding;

    public class StudentModule : NancyModule
    {
        public StudentModule()
        {
            StudentCollection studentList = StudentCollection.GetInstance();

            Get("/students", args =>
            {
                return Response.AsJson(studentList.GetStudents());
            });
            Post("/students", _ =>
            {
                var student = this.Bind<Student>();
                studentList.AddStudent(student);
                return HttpStatusCode.Created;
            });
        }
    }
}
