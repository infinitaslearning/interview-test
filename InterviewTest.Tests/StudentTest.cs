using System;
using Nancy;
using Nancy.Testing;
using Xunit;

namespace InterviewTest.Tests
{
    public class StudentTest
    {
        [Fact]
        async public void Should_GetAnEmptyListOfStudents()
        {
            var bootstrapper = new DefaultNancyBootstrapper();
            var browser = new Browser(bootstrapper);

            var result = await browser.Get("/students", with => with.HttpRequest());

            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
            Assert.Equal("[]", result.Body.AsString());
        }

        [Fact]
        async public void Should_GetListOfStudents()
        {
            var bootstrapper = new DefaultNancyBootstrapper();
            var browser = new Browser(bootstrapper);
            var testStudent = new Student("1", "Student");

            var postResult = await browser.Post("/students", with =>
            {
                with.HttpRequest();
                with.JsonBody(testStudent);
            });

            Assert.Equal(HttpStatusCode.Created, postResult.StatusCode);

            var result = await browser.Get("/students", with => with.HttpRequest());

            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
            var studentList = result.Body.DeserializeJson<Student[]>();
            Assert.Single(studentList, testStudent);
        }

    }
}
