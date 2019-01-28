using System;
using System.Threading.Tasks;
using Nancy;
using Nancy.Testing;
using Xunit;

namespace InterviewTest.Tests
{
    public static class Utils
    {
        public static async Task<Student> CreateTestStudentAsync(this Browser browser)
        {
            var testStudent = new Student("1", "Student");

            var postResult = await browser.Post("/students", with =>
            {
                with.HttpRequest();
                with.JsonBody(testStudent);
            });

            Assert.Equal(HttpStatusCode.Created, postResult.StatusCode);
            return testStudent;
        }

        public static async Task<Teacher> CreateTestTeacherAsync(this Browser browser)
        {
            var testTeacher = new Teacher("1", "Teacher");

            var postResult = await browser.Post("/teachers", with =>
            {
                with.HttpRequest();
                with.JsonBody(testTeacher);
            });
            
            Assert.Equal(HttpStatusCode.Created, postResult.StatusCode);
            return testTeacher;
        }

        public static async Task AddStudentToTeacherAsync(this Browser browser, string studentId, string teacherId)
        {
            var putBody = new {studentId};
            var postResult = await browser.Put($"/teachers/{teacherId}", with =>
            {
                with.HttpRequest();
                with.JsonBody(putBody);
            });

            Assert.Equal(HttpStatusCode.OK, postResult.StatusCode);
        }
    }
}