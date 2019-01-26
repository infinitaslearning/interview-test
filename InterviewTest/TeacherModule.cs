namespace InterviewTest
{
    using Nancy;
    using Nancy.ModelBinding;

    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            TeacherCollection teacherList = TeacherCollection.GetInstance();

            Get("/teachers", args => {
                return Response.AsJson(teacherList.GetTeachers());
            });
            Post("/teachers", _ => {
                var teacher = this.Bind<Teacher>();
                teacherList.AddTeacher(teacher);
                return HttpStatusCode.Created;
            });
        }
    }
}
