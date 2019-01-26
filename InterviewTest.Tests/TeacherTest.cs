using System;
using System.Collections.Generic;
using Nancy;
using Nancy.Testing;
using Xunit;

namespace InterviewTest.Tests
{
    public class TeacherTest
    {
        [Fact]
        async public void Should_GetAnEmptyListOfTeachers()
        {
            var bootstrapper = new DefaultNancyBootstrapper();
            var browser = new Browser(bootstrapper);

            var result = await browser.Get("/teachers", with => with.HttpRequest());

            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
            Assert.Equal("[]", result.Body.AsString());
        }

        [Fact]
        async public void Should_GetListOfTeachers()
        {
            var bootstrapper = new DefaultNancyBootstrapper();
            var browser = new Browser(bootstrapper);
            var testTeacher = new Teacher("1", "Teacher");
            var postResult = await browser.Post("/teachers", with =>
            {
                with.HttpRequest();
                with.JsonBody(testTeacher);
            });

            Assert.Equal(HttpStatusCode.Created, postResult.StatusCode);

            var result = await browser.Get("/teachers", with => with.HttpRequest());

            Assert.Equal(HttpStatusCode.OK, result.StatusCode);
            var teacherList = result.Body.DeserializeJson<Teacher[]>();
            Assert.Single(teacherList, testTeacher);
        }

    }
}
