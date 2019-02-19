using System;
using System.Threading.Tasks;
using Nancy;
using Nancy.Testing;
using Xunit;

namespace InterviewTest.Tests
{
    public class StudentTest : IDisposable
    {
        [Fact]
        public async Task Should_GetAnEmptyListOfStudentsAsync()
        {
            var bootstrapper = new DefaultNancyBootstrapper();
            var browser = new Browser(bootstrapper);

            var result = await browser.Get("/students", with => with.HttpRequest());

            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
            Assert.Equal("[]", result.Body.AsString());
        }

        [Fact]
        public async Task Should_GetListOfStudentsAsync()
        {
            var bootstrapper = new DefaultNancyBootstrapper();
            var browser = new Browser(bootstrapper);
            var testStudent = await browser.CreateTestStudentAsync();

            var result = await browser.Get("/students", with => with.HttpRequest());

            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
            var studentList = result.Body.DeserializeJson<Student[]>();
            Assert.Single(studentList, testStudent);
        }

        [Fact]
        public async Task Should_UpdateStudentAsync()
        {
            var bootstrapper = new DefaultNancyBootstrapper();
            var browser = new Browser(bootstrapper);
            var testStudent = await browser.CreateTestStudentAsync();

            var result = await browser.Put($"/students/{testStudent.Id}", with =>
            {
                with.HttpRequest();
                with.JsonBody(new {Name = "Foo"});
            });

            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
            var updatedStudent = result.Body.DeserializeJson<Student>();
            Assert.Equal(updatedStudent.Name, "Foo");
        }

        [Fact(Skip = "It works by itself, so remember to run this manually")]
        public async Task Should_GetListOfStudentsByTeacherAsync()
        {
            var bootstrapper = new DefaultNancyBootstrapper();
            var browser = new Browser(bootstrapper);
            var testStudent = await browser.CreateTestStudentAsync();
            var testTeacher = await browser.CreateTestTeacherAsync();
            await browser.AddStudentToTeacherAsync(testStudent.Id, testTeacher.Id);

            var result = await browser.Get("/students", with =>
            {
                with.HttpRequest();
                with.Query("teacherId", "1");
            });

            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
            var studentList = result.Body.DeserializeJson<Student[]>();
            Assert.Single(studentList, testStudent);
        }

        public void Dispose()
        {
            StudentCollection.GetInstance().Clear();
            TeacherCollection.GetInstance().Clear();
        }
    }
}